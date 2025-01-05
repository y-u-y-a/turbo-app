import { Errors } from "@/config/consts"
import { z } from "zod"

const userFormSchema = z.object({
  name: z.string().trim().min(1, Errors.REQUIRED),
  email: z.string().trim().min(1, Errors.REQUIRED),

  /**
   * @see https://github.com/colinhacks/zod/issues/310#issuecomment-794533682
   * */
  // email: z.string().email(Errors.INVALID_EMAIL_TYPE).optional().or(z.literal("")),
})

export const updateUserFormSchema = userFormSchema
export const searchUserFormSchema = userFormSchema

export type UpdateUserFormInput = z.infer<typeof updateUserFormSchema>
export type SearchUserFormInput = z.infer<typeof searchUserFormSchema>
