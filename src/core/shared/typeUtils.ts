export type Result<T = never, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }
