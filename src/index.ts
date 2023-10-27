// Implement OTP set from README.md

export type OtpSetOptions = {
  container: HTMLElement,
  fields: number,
  callback?: (otp: string) => void,
  submit?: boolean,
  submitText?: string,
  submitClass?: string,
  css?: string,
}
export class OtpSet {
  private container: HTMLElement;
  private fields: number;
  private callback: (otp: string) => void;
  private submit: boolean;
  private submitText: string;
  private submitClass: string;
  private css: string;

  constructor(options: OtpSetOptions) {
    this.container = options.container;
    this.fields = options.fields;
    this.callback = options.callback || (() => {});
    this.submit = options.submit || false;
    this.submitText = options.submitText || 'Submit';
    this.submitClass = options.submitClass || 'otp-submit';
    this.container.classList.add('otp-container');
    this.css = options.css || '';
    
    this.init();
  }

  /**
   * Initialize OTP set
   */
  private init() {
    this.container.innerHTML = '';
    const inputsDiv = document.createElement('div');
    inputsDiv.classList.add('otp-inputs');
    this.container.appendChild(inputsDiv);
    for (let i = 0; i < this.fields; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.addEventListener('keyup', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.value.length === 1) {
          const next = target.nextElementSibling as HTMLInputElement;
          if (next) {
            next.focus();
          } else {
            target.blur();
            if (this.submit) {
              this.submitForm();
            }
          }
        }
      });
      inputsDiv.appendChild(input);
    }
    if (this.submit) {
      const button = document.createElement('button');
      button.type = 'button';
      button.innerText = this.submitText;
      button.classList.add(this.submitClass);
      button.addEventListener('click', () => {
        this.submitForm();
      });
      this.container.appendChild(button);
    }

    const style = document.createElement('style');
    style.innerHTML = `
      .otp-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .otp-inputs {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .otp-inputs input {
        width: 40px;
        height: 40px;
        margin: 0 5px;
        text-align: center;
        font-size: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .otp-inputs input:focus {
        outline: none;
        border-color: #000;
      }
      .otp-submit {
        margin-top: 10px;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;
        cursor: pointer;
      }
      ${this.css}
    `;
    this.container.appendChild(style);
  }

  /**
   * Submit form
   */
  private submitForm() {
    const otp = this.getOtp();
    this.callback(otp);
    this.emit('otp-complete', otp);
  }

  /**
   * Get OTP string from input fields 
   * @returns OTP string
   */
  private getOtp(): string {
    const inputs = this.container.querySelectorAll('input');
    let otp = '';
    inputs.forEach((input) => {
      otp += input.value;
    });
    return otp;
  }

  listeners = new Set<(otp: string) => void>();

  on(event: 'otp-input' | 'otp-complete', callback: (otp: string) => void) {
    this.listeners.add(callback);
  }

  off(event: 'otp-input' | 'otp-complete', callback: (otp: string) => void) {
    this.listeners.delete(callback);
  }

  emit(event: 'otp-input' | 'otp-complete', otp: string) {
    this.listeners.forEach((listener) => {
      listener(otp);
    });
  }

  /**
   * Reset OTP set
   */
  reset() {
    this.init();
  }

  destroy() {
    this.container.innerHTML = '';
  }
}
