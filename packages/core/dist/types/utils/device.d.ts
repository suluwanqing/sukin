interface DeviceInfo {
    userAgent: string;
    language: string;
    screen: string;
    timezone: string;
    hardwareConcurrency: string | number;
    deviceMemory: string | number;
}
export declare const get_user_device: () => DeviceInfo;
export declare const getBrowserFingerprint: () => string;
export {};
