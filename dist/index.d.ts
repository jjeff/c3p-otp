export declare type OtpSetOptions = {
    container: HTMLElement;
    fields: number;
    callback?: (otp: string) => void;
    submit?: boolean;
    submitText?: string;
    submitClass?: string;
    css?: string;
};
export declare class OtpSet {
    private container;
    private fields;
    private callback;
    private submit;
    private submitText;
    private submitClass;
    private css;
    constructor(options: OtpSetOptions);
    private init;
    pasteOtp(otp: string): void;
    private submitForm;
    private getOtp;
    listeners: Set<(otp: string) => void>;
    on(event: 'otp-input' | 'otp-complete', callback: (otp: string) => void): void;
    off(event: 'otp-input' | 'otp-complete', callback: (otp: string) => void): void;
    emit(event: 'otp-input' | 'otp-complete', otp: string): void;
    reset(): void;
    destroy(): void;
}
//# sourceMappingURL=index.d.ts.map