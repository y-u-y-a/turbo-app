export type User = {
  /** ユーザーID */
  id: string
  /** メールアドレス */
  email: string
  /** ユーザー名 */
  name: string
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

export const dummyBankAccount: BankAccount = {
  id: "9999",
  bankName: "三井住友銀行",
  branchName: "東京支店",
  accountType: "ordinary",
  accountNumber: "1234567",
  accountHolder: "テストタロウ",
  isDefault: true,
}
