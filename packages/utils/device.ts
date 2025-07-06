// 自定义 Navigator 接口，处理标准接口中可能不存在的属性
interface CustomNavigator {
    userAgent: string;
    language: string;
    platform: string;
    plugins: PluginArray;
    hardwareConcurrency?: number;
    deviceMemory?: number;
    maxTouchPoints?: number;
    msMaxTouchPoints?: number;
}

// WebGL 调试渲染器信息接口
interface WEBGLDebugRendererInfo {
    readonly UNMASKED_VENDOR_WEBGL: number;
    readonly UNMASKED_RENDERER_WEBGL: number;
}

// 设备信息接口
interface DeviceInfo {
    userAgent: string;
    language: string;
    screen: string;
    timezone: string;
    hardwareConcurrency: string | number;
    deviceMemory: string | number;
}

/**
 * 获取用户设备基本信息
 * @returns 包含用户设备信息的对象
 */
export const get_user_device = (): DeviceInfo => {
    const nav = navigator as unknown as CustomNavigator;

    try {
        return {
            userAgent: nav.userAgent,
            language: nav.language,
            screen: `${window.screen.width}x${window.screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            hardwareConcurrency: nav.hardwareConcurrency ?? 'unknown',
            deviceMemory: nav.deviceMemory ?? 'unknown'
        };
    } catch (error) {
        console.error('Error getting device info:', error);
        return {
            userAgent: 'unknown',
            language: 'unknown',
            screen: 'unknown',
            timezone: 'unknown',
            hardwareConcurrency: 'unknown',
            deviceMemory: 'unknown'
        };
    }
};

/**
 * 生成浏览器指纹
 * @returns 浏览器指纹哈希字符串
 */
export const getBrowserFingerprint = (): string => {
    const hashString = (str: string): string => {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString(16);
    };

    const nav = navigator as unknown as CustomNavigator;

    /**
     * 获取WebGL渲染器信息
     * @returns WebGL信息字符串
     */
    const getWebGLInfo = (): string => {
        try {
            const canvas = document.createElement('canvas');
            // 明确指定为 WebGLRenderingContext 类型
            const gl = canvas.getContext('webgl') as WebGLRenderingContext | null ||
                canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;

            if (!gl) return 'webgl-unsupported';

            // 使用类型断言获取调试扩展
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info') as WEBGLDebugRendererInfo | null;
            if (!debugInfo) return 'webgl-no-debug-info';

            // 使用类型断言访问调试参数
            const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string;
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;

            return `${vendor}|${renderer}`;
        } catch (error) {
            console.error('Error getting WebGL info:', error);
            return 'webgl-error';
        }
    };

    /**
     * 获取Canvas指纹
     * @returns Canvas指纹哈希字符串
     */
    const getCanvasFingerprint = (): string => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return 'canvas-unsupported';

            // 绘制Canvas内容
            ctx.textBaseline = 'top';
            ctx.font = "16px 'Arial'";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText("BrowserFingerprint", 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText("BrowserFingerprint", 4, 17);

            return hashString(canvas.toDataURL());
        } catch (error) {
            console.error('Error getting Canvas fingerprint:', error);
            return 'canvas-error';
        }
    };

    try {
        const components = [
            nav.userAgent,
            nav.language,
            nav.platform,
            nav.plugins ? Array.from(nav.plugins).map(p => `${p.name}:${p.description}`).join(';') : 'no-plugins',
            getCanvasFingerprint(),
            getWebGLInfo(),
            Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
            `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`,
            `cores:${nav.hardwareConcurrency ?? 'unknown'}`,
            `memory:${nav.deviceMemory ?? 'unknown'}`,
            `maxTouchPoints:${nav.maxTouchPoints !== undefined ? nav.maxTouchPoints :
                nav.msMaxTouchPoints !== undefined ? nav.msMaxTouchPoints : 0
            },touchEvent:${'ontouchstart' in window}`
        ].join('###');

        const fingerprint = hashString(components);

        try {
            window.localStorage.setItem('DeviceHash', fingerprint);
        } catch (storageError) {
            console.error('Error storing fingerprint:', storageError);
        }

        return fingerprint;
    } catch (error) {
        console.error('Error generating browser fingerprint:', error);
        return 'fingerprint-error';
    }
};