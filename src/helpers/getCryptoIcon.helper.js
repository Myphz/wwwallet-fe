import { GATEIO_ICON } from "@/config/config.js";

export default function(crypto, size="64") {
  return `${GATEIO_ICON}${size}/${crypto.toLowerCase()}.png`;
}