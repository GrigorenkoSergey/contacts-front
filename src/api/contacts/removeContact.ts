import { z } from 'zod';
import { commonPart, ResponseErrorInfo } from './common';

const Result = z.union([
  z.object({ data: z.literal('success'), }),
  ResponseErrorInfo
]);

export const removeContact = (token: string, id: number) => commonPart({
  funcName: 'removeContact',
  method: 'delete',
  resultZodType: Result,
  token,
  body: { id }
});
