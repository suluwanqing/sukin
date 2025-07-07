function _bem(
    prefixName: string,
    blockSuffix: string = '',
    element: string = '',
    modifier: string = ''
) {
    let className = prefixName;

    if (blockSuffix) {
        className += `-${blockSuffix}`;
    }

    if (element) {
        className += `__${element}`;
    }

    if (modifier) {
        className += `--${modifier}`;
    }

    return className;
}

function createBEM(prefixName: string) {
    const b = (blockSuffix: string = '') => _bem(prefixName, blockSuffix);

    const e = (element: string = '') =>
        element ? _bem(prefixName, '', element) : '';

    const m = (modifier: string = '') =>
        modifier ? _bem(prefixName, '', '', modifier) : '';

    const be = (blockSuffix: string = '', element: string = '') =>
        blockSuffix && element ? _bem(prefixName, blockSuffix, element) : '';

    const bm = (blockSuffix: string = '', modifier: string = '') =>
        blockSuffix && modifier ? _bem(prefixName, blockSuffix, '', modifier) : '';

    const em = (element: string = '', modifier: string = '') =>
        element && modifier ? _bem(prefixName, '', element, modifier) : '';
    
    const bem = (blockSuffix: string = '', element: string = '', modifier: string = '') =>
        blockSuffix && element && modifier ? _bem(prefixName, blockSuffix, element, modifier) : '';

    const is = (name: string, state: boolean = false) =>
        state ? `is-${name}` : '';

    return { b, e, m, be, bm, em, bem, is };
}

function createNamespace(name: string) {
    const prefixName = `su-${name}`;
    return createBEM(prefixName);
}

/**
 * BEM 类名生成示例
 * 
 * const bem = createNamespace('button');
 * 
 * bem.b();               // 'su-button'
 * bem.b('primary');      // 'su-button-primary'
 * 
 * bem.e('icon');         // 'su-button__icon'
 * bem.e('text');         // 'su-button__text'
 * 
 * bem.m('disabled');     // 'su-button--disabled'
 * bem.m('round');        // 'su-button--round'
 * 
 * bem.be('primary', 'icon');     // 'su-button-primary__icon'
 * bem.bm('primary', 'disabled'); // 'su-button-primary--disabled'
 * bem.em('icon', 'large');       // 'su-button__icon--large'
 * 
 * bem.is('active', true);        // 'is-active'
 */
export { createNamespace };