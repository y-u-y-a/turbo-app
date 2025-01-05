"use server"

import { Paths } from "@/config/consts"
import { userService } from "@/services/userService"
import { revalidatePath } from "next/cache"
import type { User } from "./types"
import type { UpdateUserFormInput } from "./userSchema"

export const updateUserAction = async (user: User, input: UpdateUserFormInput): Promise<User> => {
  const newUser = await userService.update(user.id, input)
  revalidatePath(Paths.USERS)
  return newUser
}
