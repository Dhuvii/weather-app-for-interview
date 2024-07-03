import { z } from "zod";

export const GeoDataSchema = z.object({
  address: z
    .string({ required_error: "Address is required" })
    .min(1, { message: "Address is required" }),
});

export type geoDataInput = z.infer<typeof GeoDataSchema>;
