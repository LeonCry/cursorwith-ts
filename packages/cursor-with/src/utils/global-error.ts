export function throwError(message: string): never {
  throw new Error(`cursor-with:[Error]:${message}`);
}
