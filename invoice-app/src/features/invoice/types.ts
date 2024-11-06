export type User = {
  /** ユーザーID */
  id: string
  /** メールアドレス */
  email: string
  /** ユーザー名 */
  name: string
}

export type Company = {
  /** 企業ID */
  id: string
  /** 企業名 */
  name: string
  /** 郵便番号 */
  zipcode: string
  /** 住所 */
  address: string
  /** 電話番号 */
  phoneNumber: string
  /** 担当者名 */
  managerName: string
}

/** 銀行口座情報 */
export type BankAccount = {
  /** 口座ID */
  id: string
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
}

/** 請求書情報 */
export type Invoice = {
  /** 請求書ID */
  id: string
  /** ユーザーID */
  userId: string
  /** 請求日 */
  billingDate: Date
  /** 振込期限 */
  dueDate: Date
  /** 請求種別（時間単価 or 数量単価） */
  isHourly: boolean
  /** 請求詳細項目 */
  details: {
    /** 項目ID */
    id: string
    /** 項目名 */
    unitName: string
    /** 単価 */
    unitPrice: number
    /** 数量 */
    quantity: number
  }[]
  /** 消費税率 */
  taxRate: number
  /** 備考 */
  notes: string
  /** 作成日時 */
  createdAt: Date
  /** 更新日時 */
  updatedAt: Date
}
