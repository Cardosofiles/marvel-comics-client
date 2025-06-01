import { z } from "zod";

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  thumbnail: z.object({
    path: z.string(),
    extension: z.string(),
  }),
});

export const charactersResponseSchema = z.object({
  data: z.object({
    results: z.array(characterSchema),
  }),
});
