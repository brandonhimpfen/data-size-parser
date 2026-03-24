import test from "node:test";
import assert from "node:assert/strict";
import { parseDataSize, tryParseDataSize, formatSupportedUnits } from "../src/index.js";

test("parses decimal units", () => {
  assert.equal(parseDataSize("10MB"), 10_000_000);
  assert.equal(parseDataSize("2gb"), 2_000_000_000);
  assert.equal(parseDataSize("1.5 KB"), 1_500);
});

test("parses binary units", () => {
  assert.equal(parseDataSize("512 KiB"), 524_288);
  assert.equal(parseDataSize("1 MiB"), 1_048_576);
  assert.equal(parseDataSize("1.5 TiB"), 1_649_267_441_664);
});

test("treats missing unit as bytes", () => {
  assert.equal(parseDataSize("100"), 100);
});

test("supports byte aliases", () => {
  assert.equal(parseDataSize("1B"), 1);
  assert.equal(parseDataSize("3 bytes"), 3);
  assert.equal(parseDataSize("4 byte"), 4);
});

test("rejects invalid values", () => {
  assert.throws(() => parseDataSize("abc"), /Invalid data size/);
  assert.throws(() => parseDataSize("-1MB"), /Negative data sizes/);
  assert.throws(() => parseDataSize("5XB"), /Unsupported unit/);
});

test("tryParseDataSize returns null for invalid inputs", () => {
  assert.equal(tryParseDataSize("not-a-size"), null);
  assert.equal(tryParseDataSize("20MB"), 20_000_000);
});

test("formatSupportedUnits returns supported labels", () => {
  assert.deepEqual(formatSupportedUnits(), ["B", "KB", "MB", "GB", "TB", "PB", "KiB", "MiB", "GiB", "TiB", "PiB"]);
});
