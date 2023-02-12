export function nameValidator(name) {
  if (!name) return "Name can't be empty."
  if (isAlphabet(name)) return "Name must only contain alphabet"
  return ''
}

function isAlphabet (str) {
  return str.match(/^[a-zA-Z]+$/) === null;
}
