export type User = {
  /** ユーザーID */
  id: string
  /** メールアドレス */
  email: string
  /** ユーザー名 */
  name: string
  /** プロフィール画像URL（任意） */
  image?: string
  /** 作成日時 */
  createdAt: Date
  /** 更新日時 */
  updatedAt: Date
}

export type Company = {
  /** 企業ID */
  id: string
  /** 所有ユーザーID */
  userId: string
  /** 企業名 */
  name: string
  /** 請求先住所 */
  billingAddress: string
  /** 請求先担当者名 */
  billingContact?: string
  /** 作成日時 */
  createdAt: Date
  /** 更新日時 */
  updatedAt: Date
}

export type Invoice = {
  /** 請求書ID */
  id: string
  /** 所有ユーザーID */
  userId: string
  /** 請求先企業ID */
  companyId: string
  /** 振込先口座ID */
  bankAccountId: string
  /** 請求書番号 */
  invoiceNumber: string
  /** 請求日 */
  billingDate: Date
  /** 支払期限日 */
  dueDate: Date
  /** 請求種別（時間単価 or 日単価） */
  billingType: "hourly" | "daily"
  /** 単価 */
  unitPrice: number
  /** 備考 */
  notes?: string
  /** 作成日時 */
  createdAt: Date
  /** 更新日時 */
  updatedAt: Date
}

export type InvoiceDetail = {
  /** 明細ID */
  id: string
  /** 紐づく請求書ID */
  invoiceId: string
  /** 作業時間 */
  workingHours: number
  /** 金額 */
  amount: number
  /** 作成日時 */
  createdAt: Date
  /** 更新日時 */
  updatedAt: Date
}

/** 銀行口座情報の型定義 */
export type BankAccount = {
  /** 口座ID */
  id: string
  /** 所有ユーザーID */
  userId: string
  /** 銀行名 */
  bankName: string
  /** 支店名 */
  branchName: string
  /** 口座種別（普通預金 or 当座預金） */
  accountType: "ordinary" | "current"
  /** 口座番号 */
  accountNumber: string
  /** 口座名義 */
  accountHolder: string
  /** デフォルト口座フラグ */
  isDefault: boolean
  /** 作成日時 */
  createdAt: Date
  /** 更新日時 */
  updatedAt: Date
}
