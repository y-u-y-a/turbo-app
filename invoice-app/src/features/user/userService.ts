import type { User } from "@/features/user/types"
import type { UpdateUserFormInput } from "@/features/user/userSchema"
import { BaseService, type Pagination } from "./baseService"

class UserService extends BaseService {
  /**
   * @summary ユーザー情報一覧を取得する
   * */
  async getByPaging(currentPage: number, email = ""): Promise<Pagination<User>> {
    const { data } = await this.api.GET("/users", { params: { query: { currentPage, email } } })
    if (!data) throw new Error("取得に失敗しました")

    return {
      ...data.paging,
      items: data.users,
    }
  }

  /**
   * @summary ユーザー情報を1件取得する
   * */
  async find(userId: string): Promise<User> {
    const { data: user } = await this.api.GET("/users/{userId}", { params: { path: { userId } } })
    if (!user) throw new Error("取得に失敗しました")
    return user
  }

  /**
   * @summary ユーザー情報を更新する
   * */
  async update(userId: string, body: UpdateUserFormInput): Promise<User> {
    const { data: user } = await this.api.POST("/users/{userId}/update", { params: { path: { userId } }, body })
    if (!user) throw new Error("更新に失敗しました")
    return user
  }
}

export const userService = new UserService()
