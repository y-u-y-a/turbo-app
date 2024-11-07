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

export const dummyCompany: Company = {
  id: "1234",
  name: "株式会社サンプル",
  zipcode: "123-4567",
  address: "東京都千代田区サンプル町1-2-3",
  phoneNumber: "03-1234-5678",
  managerName: "テスト太郎",
}
