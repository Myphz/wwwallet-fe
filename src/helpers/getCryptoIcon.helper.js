import { GATEIO_ICON_URL } from "@/config/config.js";

export default function(crypto) {
  return `${GATEIO_ICON_URL}${crypto.toLowerCase()}.png`;
}