import sass from "@/assets/sass/_variables.sass";

// Function to extract a value from the sass variables file
export default function(value) {
  // Get the string between 'value:' and ';' (the content of the variable)
  return sass.split(value + ":")[1].split(";")[0];
}