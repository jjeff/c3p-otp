export class OtpSet {
    constructor(options) {
        this.listeners = new Set();
        this.container = options.container;
        this.fields = options.fields;
        this.callback = options.callback || (() => { });
        this.submit = options.submit || false;
        this.submitText = options.submitText || 'Submit';
        this.submitClass = options.submitClass || 'otp-submit';
        this.container.classList.add('otp-container');
        this.css = options.css || '';
        this.init();
    }
    init() {
        this.container.innerHTML = '';
        const inputsDiv = document.createElement('div');
        inputsDiv.classList.add('otp-inputs');
        this.container.appendChild(inputsDiv);
        for (let i = 0; i < this.fields; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.addEventListener('keyup', (e) => {
                const target = e.target;
                if (target.value.length === 1) {
                    const next = target.nextElementSibling;
                    if (next) {
                        next.focus();
                    }
                    else {
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
        const firstInput = this.container.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
        this.container.addEventListener('keyup', () => {
            const otp = this.getOtp();
            this.emit('otp-input', otp);
        });
        this.container.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            this.pasteOtp(text);
        });
        this.container.addEventListener('keydown', (e) => {
            const target = e.target;
            if (e.key === 'Backspace' && target.value.length === 0) {
                const prev = target.previousElementSibling;
                if (prev) {
                    prev.focus();
                }
            }
        });
        this.container.addEventListener('keyup', (e) => {
            const target = e.target;
            if (e.key === 'Delete' && target.value.length === 1) {
                const next = target.nextElementSibling;
                if (next) {
                    next.focus();
                }
            }
        });
        this.container.addEventListener('keydown', (e) => {
            const target = e.target;
            if (e.key === 'ArrowLeft') {
                const prev = target.previousElementSibling;
                if (prev) {
                    prev.focus();
                }
            }
            if (e.key === 'ArrowRight') {
                const next = target.nextElementSibling;
                if (next) {
                    next.focus();
                }
            }
        });
        this.container.addEventListener('keydown', (e) => {
            const target = e.target;
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    const prev = target.previousElementSibling;
                    if (prev) {
                        prev.focus();
                    }
                }
                else {
                    const next = target.nextElementSibling;
                    if (next) {
                        next.focus();
                    }
                }
            }
        });
        this.container.addEventListener('keydown', (e) => {
            const target = e.target;
            if (e.key === 'Enter') {
                target.blur();
                if (this.submit) {
                    this.submitForm();
                }
            }
        });
    }
    pasteOtp(otp) {
        const inputs = this.container.querySelectorAll('input');
        otp.split('').forEach((char, index) => {
            const input = inputs[index];
            if (!input) {
                return;
            }
            input.value = char;
        });
    }
    submitForm() {
        const otp = this.getOtp();
        this.callback(otp);
        this.emit('otp-complete', otp);
    }
    getOtp() {
        const inputs = this.container.querySelectorAll('input');
        let otp = '';
        inputs.forEach((input) => {
            otp += input.value;
        });
        return otp;
    }
    on(event, callback) {
        this.listeners.add(callback);
    }
    off(event, callback) {
        this.listeners.delete(callback);
    }
    emit(event, otp) {
        this.listeners.forEach((listener) => {
            listener(otp);
        });
    }
    reset() {
        this.init();
    }
    destroy() {
        this.container.innerHTML = '';
    }
}
//# sourceMappingURL=index.js.map