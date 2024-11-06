import { Errors } from "@/config/consts"
import { z } from "zod"

export const createInvoiceFormSchema = z.object({
  name: z.string().trim().min(1, Errors.REQUIRED),
  email: z.string().trim().min(1, Errors.REQUIRED),
})

export type CreateInvoiceFormInput = z.infer<typeof createInvoiceFormSchema>
