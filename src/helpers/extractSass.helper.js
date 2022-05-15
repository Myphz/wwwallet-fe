/* 
  SASS doesn't provide any rules to directly export variables. 
  SCSS does that using ::export rule.
  The ::export rule still works with SASS, but it can't be as easily imported with a single import instruction.
  This function imports the entire SASS file, which returns a string with the exported properties and
  returns the string between a specified value and ';' 
*/

import sass from "@/assets/sass/_export.sass";

export default function(value) {
  // Get the string between 'value:' and ';' (the content of the variable)
  // Split by ; or } if it's the last value
  return sass.split(value + ":")[1].split(/;|}/)[0];
}