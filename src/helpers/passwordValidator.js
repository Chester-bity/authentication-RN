export function passwordValidator(password) {
  if (!password) return "Password can't be empty."
  if (password.length < 6) return 'Password must be at least 6 characters long.'
  if (isAlphanumeric(password)) return 'Password must alphanumeric.'
  return ''
}

function isAlphanumeric(str) {
  return str.match(/^[a-zA-Z0-9]+$/) === null;
}