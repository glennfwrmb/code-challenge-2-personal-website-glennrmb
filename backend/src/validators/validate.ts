import { ZodType } from 'zod';
import { AppError } from '../errors/app.error';

export function validate<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => issue.message)
      .join(', ');

    throw new AppError(422, details);
  }

  return result.data;
}
