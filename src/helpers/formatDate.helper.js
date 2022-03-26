export function timeFormat(value) {
  const date = new Date(value);
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export function dateFormat(value) {
  const date = new Date(value);
  const ret = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} `;
  return ret + timeFormat(value);
};