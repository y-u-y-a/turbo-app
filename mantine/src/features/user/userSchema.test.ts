import { Errors } from "@/config/consts"
import { describe, expect, test } from "vitest"
import { type SearchUserFormInput, searchUserFormSchema } from "./userSchema"

const correctInput: SearchUserFormInput = {
  name: "テスト太郎",
  email: "test@test.com",
}

describe("ユーザー検索フォームのバリデーションテスト", () => {
  test.skip.each([
    { ...correctInput, email: "failed.sample", expected: Errors.INVALID_EMAIL_TYPE },
    { ...correctInput, email: "failed@sample", expected: Errors.INVALID_EMAIL_TYPE },
  ])("異常系テスト", ({ expected, ...input }) => {
    expect(() => searchUserFormSchema.parse({ ...input })).toThrow(expected)
  })
  test.each([
    { ...correctInput, email: "" },
    { ...correctInput, email: "success@sample.com" },
  ])("正常系テスト", ({ ...input }) => {
    expect(searchUserFormSchema.safeParse({ ...input }).success).toBe(true)
  })
})
