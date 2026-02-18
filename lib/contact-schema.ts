import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  company: z.string().trim().max(100, "Company name is too long").optional().or(z.literal("")),
  budget: z
    .enum(["under-1500", "1500-3000", "3000-7000", "7000-plus"], {
      required_error: "Please select a budget range",
      invalid_type_error: "Please select a budget range"
    })
    .default("under-1500"),
  timeline: z
    .enum(["asap", "2-4-weeks", "1-2-months", "flexible"], {
      required_error: "Please select a timeline",
      invalid_type_error: "Please select a timeline"
    })
    .default("2-4-weeks"),
  message: z.string().trim().min(20, "Please share a bit more detail (min 20 characters)").max(5000),
  website: z.string().max(0).optional().or(z.literal(""))
});

export type ContactPayload = z.infer<typeof contactSchema>;
