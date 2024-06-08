import { z } from "zod"

const userFormSchema = z.object({
  name: z.string(),
  email: z.string(),

  /**
   * @see https://github.com/colinhacks/zod/issues/310#issuecomment-794533682
   * */
  // email: z.string().email(Errors.INVALID_EMAIL_TYPE).optional().or(z.literal("")),
})

export const updateUserFormSchema = userFormSchema
export const searchUserFormSchema = userFormSchema

export type UpdateUserFormInput = z.infer<typeof updateUserFormSchema>
export type SearchUserFormInput = z.infer<typeof searchUserFormSchema>
