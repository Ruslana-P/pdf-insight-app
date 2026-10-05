import { z } from 'zod';

export const documentTypeSchema = z.enum([
  'faktura',
  'umowa',
  'oferta',
  'raport',
  'inne',
]);

export const insightSchema = z.object({
  document: z.object({
    fileName: z.string().min(1),
    pages: z.number().int().positive(),
    language: z.string().min(1),
    type: documentTypeSchema,
    title: z.string().nullable(),
    date: z.string().nullable(),
  }),
  summary: z.string().min(1),
  keyPoints: z.array(z.string()),
  entities: z.object({
    organizations: z.array(z.string()),
    people: z.array(z.string()),
  }),
  amounts: z.array(
    z.object({
      value: z.number(),
      currency: z.string(),
      context: z.string(),
    }),
  ),
  dates: z.array(
    z.object({
      date: z.string(),
      context: z.string(),
    }),
  ),
  keywords: z.array(z.string()),
});

export type DocumentInsight = z.infer<typeof insightSchema>;
