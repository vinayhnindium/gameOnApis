/* eslint-disable no-lone-blocks */
/* eslint-disable func-names */
/* eslint-disable no-useless-escape */
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
  if (!email) { return false; }

  if (email.length > 254) { return false; }

  const valid = emailRegex.test(email);
  if (!valid) { return false; }

  // Further checking of some things regex can't handle
  const parts = email.split('@');
  if (parts[0].length > 64) { return false; }

  const domainParts = parts[1].split('.');
  if (domainParts.some((part) => part.length > 15)) { return false; }

  return true;
}
// eslint-disable-next-line import/prefer-default-export
export default isEmailValid;
