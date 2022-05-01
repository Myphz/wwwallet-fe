import big from "big.js";
import toFormat from "toformat";

// Import & export Big with the added toFormat utility, correctly configured for the current locale
function getLocaleSeparators() {
  const n = 1000.1;
  const formats = Intl.NumberFormat().formatToParts(n);
  return { decimal: formats.find(part => part.type === "decimal").value, group: formats.find(part => part.type === "group").value }
}

const Big = toFormat(big);
const { decimal, group } = getLocaleSeparators();
Big.format.decimalSeparator = decimal;
Big.format.groupSeparator = group;

export default Big;