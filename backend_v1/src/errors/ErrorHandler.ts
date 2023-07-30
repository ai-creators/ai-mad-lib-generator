export class ErrroHandler {
  public static ensureError(value: unknown): Error {
    if (value instanceof Error) return value;
    if (value && typeof value === "object" && value.constructor === Object) {
      throw value;
    }
    let stringified;
    try {
      stringified = JSON.stringify(value);
    } catch {
      stringified = "[Unable to stringify the thrown error]";
    }
    const error = new Error(
      `This value was thrown as is, not through an Error: ${stringified}`
    );
    return error;
  }
}
