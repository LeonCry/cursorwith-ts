export function throwError(message: string): never {
  throw new Error(`cursorwith-ts:[Error]:${message}`);
}
