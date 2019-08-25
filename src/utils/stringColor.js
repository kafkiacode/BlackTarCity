export default function(colorOrNumber) {
  return typeof colorOrNumber === 'number'
    ? `#${colorOrNumber.toString(16).padStart(6, '0')}`
    : colorOrNumber;
}
