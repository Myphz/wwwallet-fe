export function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export function validatePassword(password) {
  // Min 6 characters long
  if (password.length < 6) return false;
  // Min 1 uppercase letter
  if (!/[A-Z]/.test(password)) return false;
  // Min 1 number
  if (!/\d/.test(password)) return false;
  return true;
};

export function isPositiveFloat(value) {
  const regex = /^[0-9]+(\.)?[0-9]*$/
  return regex.test(value);
}