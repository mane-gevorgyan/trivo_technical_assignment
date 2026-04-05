import { z } from "zod";

export const accountSummarySchema = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1),
});

export const sidebarAccountsSchema = z.array(accountSummarySchema);
