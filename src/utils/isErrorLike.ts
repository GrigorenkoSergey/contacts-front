import { z } from 'zod';

const ErrorLike = z.object({ message: z.string(), });
type ErrorLike = z.infer<typeof ErrorLike>;

export function isErrorLike(e: unknown): e is ErrorLike {
  return ErrorLike.safeParse(e).success;
}
