const DECIMAL_UNITS = {
  b: 1,
  byte: 1,
  bytes: 1,
  kb: 1_000,
  mb: 1_000_000,
  gb: 1_000_000_000,
  tb: 1_000_000_000_000,
  pb: 1_000_000_000_000_000
};

const BINARY_UNITS = {
  kib: 1024,
  mib: 1024 ** 2,
  gib: 1024 ** 3,
  tib: 1024 ** 4,
  pib: 1024 ** 5
};

const UNIT_MAP = {
  ...DECIMAL_UNITS,
  ...BINARY_UNITS
};

const SUPPORTED_UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "KiB", "MiB", "GiB", "TiB", "PiB"];

function normalizeUnit(unit) {
  if (!unit) {
    return "b";
  }

  return String(unit).trim().toLowerCase();
}

function parseParts(input) {
  if (typeof input !== "string") {
    throw new TypeError("Expected input to be a string.");
  }

  const value = input.trim();

  if (!value) {
    throw new Error("Input cannot be empty.");
  }

  const match = value.match(/^([+-]?(?:\d+\.?\d*|\.\d+))(?:\s*([a-zA-Z]+))?$/);

  if (!match) {
    throw new Error(`Invalid data size: ${input}`);
  }

  const amount = Number(match[1]);
  const unit = normalizeUnit(match[2]);

  if (!Number.isFinite(amount)) {
    throw new Error(`Invalid numeric value in data size: ${input}`);
  }

  if (amount < 0) {
    throw new Error("Negative data sizes are not supported.");
  }

  return { amount, unit };
}

export function parseDataSize(input) {
  const { amount, unit } = parseParts(input);
  const multiplier = UNIT_MAP[unit];

  if (multiplier == null) {
    throw new Error(`Unsupported unit: ${unit || "(none)"}. Supported units: ${SUPPORTED_UNITS.join(", ")}`);
  }

  return Math.round(amount * multiplier);
}

export function tryParseDataSize(input) {
  try {
    return parseDataSize(input);
  } catch {
    return null;
  }
}

export function formatSupportedUnits() {
  return [...SUPPORTED_UNITS];
}
