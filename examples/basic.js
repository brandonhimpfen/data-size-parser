import { parseDataSize, tryParseDataSize, formatSupportedUnits } from "../src/index.js";

console.log(parseDataSize("10MB"));
console.log(parseDataSize("2gb"));
console.log(parseDataSize("512 KiB"));
console.log(parseDataSize("1.5 TiB"));
console.log(tryParseDataSize("unknown"));
console.log(formatSupportedUnits());
