import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common"
import { sql } from "@vercel/postgres"
import { User } from "./user.model"

type Paging = {
  total: number // 総アイテム数
  currentPage: number // 現在のページ
  totalPages: number // 総ページ数
  paginate: number // ページあたりのアイテム数
}

@Controller("users")
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}

  @Get()
  async getByPaging(@Query("currentPage") page: string, @Query("email") email: string): Promise<{ users: User[]; paging: Paging }> {
    const currentPage = Number(page)
    const limit = 4
    const offset = limit * (currentPage - 1)
    const { rows } = await sql<{ count: number }>`SELECT COUNT(*) FROM users WHERE email LIKE ${`%${email}%`};`
    const { rows: users } = await sql<User>`SELECT * FROM users WHERE email LIKE ${`%${email}%`} ORDER BY id ASC LIMIT ${limit} OFFSET ${offset};`

    return {
      users,
      paging: {
        currentPage,
        paginate: limit,
        total: Number(rows[0].count),
        totalPages: Math.ceil(rows[0].count / limit),
      },
    }
  }

  @Get("/:userId")
  async find(@Param("userId") userId: string): Promise<User> {
    const { rows } = await sql<User>`SELECT * FROM users WHERE id = ${userId} LIMIT 1;`
    return rows[0]
  }

  @Post("/:userId/update")
  async update(@Param("userId") userId: string, @Body("name") name: string, @Body("email") email: string): Promise<User> {
    const { rows } = await sql<User>`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${userId} RETURNING *;`
    return rows[0]
  }
}
