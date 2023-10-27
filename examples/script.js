import { OtpSet } from '../dist/index.js';

const otpSet = new OtpSet({
  container: document.getElementById('c3po'),
  fields: 4,
  submit: true,
})

const output = document.getElementById('r2d2');

otpSet.on('otp-input', (otp) => {
  output.innerHTML = otp;
});

otpSet.on('otp-submit', (otp) => {
  output.innerHTML = otp;
});