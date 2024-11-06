import { z } from "zod"

const invoiceDetailSchema = z.object({
  /** 項目ID */
  id: z.string(),
  /** 項目名 */
  unitName: z.string(),
  /** 単価 */
  unitPrice: z.number(),
  /** 数量 */
  quantity: z.number(),
})

export const createInvoiceFormSchema = z.object({
  /** 請求書ID */
  id: z.string(),
  /** ユーザーID */
  userId: z.string(),
  /** 請求日 */
  billingDate: z.date(),
  /** 振込期限 */
  dueDate: z.date(),
  /** 請求種別（時間単価 or 数量単価） */
  isHourly: z.boolean(),
  /** 請求詳細項目 */
  details: z.array(invoiceDetailSchema),
  /** 消費税率 */
  taxRate: z.number(),
  /** 備考 */
  notes: z.string(),
  /** 作成日時 */
  createdAt: z.date(),
  /** 更新日時 */
  updatedAt: z.date(),
})

export type CreateInvoiceFormInput = z.infer<typeof createInvoiceFormSchema>
