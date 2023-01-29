import { z } from "zod";

export const AdSchema = z.object({
  gameId: z.bigint(),
  name: z.string().min(2),
  expertise: z.enum(["beginner", "casual", "advanced", "expert"]),
  discord: z.string().min(4),
  weekDays: z.string().optional(),
  hourStart: z.string().optional(),
  hourEnd: z.string().optional(),
  useVoiceChannel: z.boolean().optional(),
});
