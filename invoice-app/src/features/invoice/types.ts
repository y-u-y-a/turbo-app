/** 請求書情報 */
export type Invoice = {
  /** 請求書ID */
  id: string
  /** ユーザーID */
  userId: string
  /** 振込期限 */
  dueDate: Date
  /** 請求種別（時間単価 or 数量単価） */
  isHourly: boolean
  /** 請求詳細項目 */
  details: InvoiceDetail[]
  /** 消費税率 */
  taxRate: number
  /** 備考 */
  notes: string
  /** 作成日時 */
  createdAt: Date
  /** 更新日時 */
  updatedAt: Date
}

type InvoiceDetail = {
  id: string
  billingType: string
  unitPrice: number
  quantity: number
}
