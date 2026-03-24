# data-size-parser

A tiny, practical parser for human-readable data sizes.

This package converts values like `10MB`, `2gb`, `512 KiB`, and `1.5 TiB` into bytes. It is designed to be small, predictable, and easy to use in scripts, CLIs, data tooling, and storage-related workflows.

It can be used as both a practical utility and a lightweight reference for normalizing storage size inputs.

## Why this project exists

Human-readable data sizes appear everywhere.

Configuration files, CLI flags, dashboards, logs, APIs, and documentation often represent storage sizes as strings. Those strings are easy for people to read, but they are not immediately useful for systems that need exact byte values.

A parser solves that boundary problem.

Instead of writing ad hoc conversion logic in every project, `data-size-parser` provides a single, explicit way to interpret common decimal and binary size units.

## What it supports

The parser supports:

- bytes: `B`, `byte`, `bytes`
- decimal units: `KB`, `MB`, `GB`, `TB`, `PB`
- binary units: `KiB`, `MiB`, `GiB`, `TiB`, `PiB`
- uppercase and lowercase input
- optional spaces between value and unit
- integer and decimal values

Examples:

- `10MB` → `10000000`
- `2gb` → `2000000000`
- `512 KiB` → `524288`
- `1.5 TiB` → `1649267441664`

## Install

```bash
npm install data-size-parser
```

## Example

```js
import { parseDataSize } from "data-size-parser";

parseDataSize("10MB");
// 10000000

parseDataSize("2gb");
// 2000000000

parseDataSize("512 KiB");
// 524288

parseDataSize("1.5 TiB");
// 1649267441664
```

## API

### `parseDataSize(input)`

Parses a human-readable data size string and returns the size in bytes as an integer.

```js
import { parseDataSize } from "data-size-parser";

const bytes = parseDataSize("256MB");
// 256000000
```

### `tryParseDataSize(input)`

Attempts to parse a human-readable data size string and returns `null` instead of throwing when parsing fails.

```js
import { tryParseDataSize } from "data-size-parser";

tryParseDataSize("64GiB");
// 68719476736

tryParseDataSize("not-a-size");
// null
```

### `formatSupportedUnits()`

Returns a list of supported unit labels.

```js
import { formatSupportedUnits } from "data-size-parser";

formatSupportedUnits();
// ["B", "KB", "MB", "GB", "TB", "PB", "KiB", "MiB", "GiB", "TiB", "PiB"]
```

## Design Principles

This project is intentionally minimal.

It focuses on one job: turning human-readable data size strings into byte values without introducing unnecessary complexity.

The design emphasizes:

- Simplicity over abstraction
- Predictability over magic
- Clear unit handling over ambiguous shortcuts
- Small utilities that are easy to reuse

## Non-Goals

This project does not attempt to:

- format bytes back into display strings.
- infer units from context beyond the provided input.
- handle bit-based units such as `Mbps` or `Kibit`.
- act as a general-purpose measurement parser.

It is focused only on parsing storage size strings into bytes.

## Edge Cases

- `parseDataSize("100")` is treated as bytes.
- leading and trailing whitespace is ignored.
- decimal values are allowed for all supported units.
- invalid or unknown units throw a descriptive error.
- negative values are rejected.

## Roadmap

Future extensions may include:

- stricter parsing modes.
- optional bigint support for very large values.
- formatter companion package.
- ESM + TypeScript declaration support.

## Repository

GitHub: https://github.com/brandonhimpfen/data-size-parser

## License

MIT
