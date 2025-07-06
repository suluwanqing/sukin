export declare const bem: {
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: (name: string, state: boolean | undefined) => string;
};
export declare const EVENT_SUBMIT = "submit";
export declare const EVENT_CLOSE = "close";
