import { z } from "zod"

const invoiceDetailSchema = z.object({
  /** 項目ID */
  id: z.string(),
  /** 項目名 */
  unitName: z.string(),
  /** 単価 */
  unitPrice: z.number().positive(),
  /** 数量 */
  quantity: z.number().positive(),
})

export const createInvoiceFormSchema = z.object({
  /** 振込期限 */
  dueDate: z.date(),
  /** 時間単価 or 人日単価 */
  isHourly: z.boolean(),
  /** 請求詳細項目 */
  details: z.array(invoiceDetailSchema),
  /** 消費税率 */
  taxRate: z.number().positive(),
  /** 備考 */
  notes: z.string(),
})

export type CreateInvoiceFormInput = z.infer<typeof createInvoiceFormSchema>
