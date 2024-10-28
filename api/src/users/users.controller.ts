import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { IUsersController } from "./user.model"

const prisma = new PrismaClient()

@Controller("users")
export class UsersController implements IUsersController {
  // constructor(private readonly usersService: UsersService) {}

  @Get()
  async paging(@Query("currentPage") currentPage: string, @Query("email") email = "") {
    const page = Number(currentPage) || 1
    const limit = 4

    const totalUsers = await prisma.user.count({ where: { email: { contains: email } } })

    const users = await prisma.user.findMany({
      where: { email: { contains: email } },
      orderBy: { createdAt: "asc" },
      take: limit,
      skip: limit * (page - 1),
    })

    return {
      users,
      paging: {
        currentPage: page,
        paginate: limit,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      },
    }
  }

  @Get("/:userId")
  async find(@Param("userId") userId: string) {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } })
    return user
  }

  @Put("/:userId")
  async update(@Param("userId") userId: string, @Body("name") name: string, @Body("email") email: string) {
    console.log({ userId, name, email })
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    })
    return updatedUser
  }

  @Post("/create")
  async create(@Body("name") name: string, @Body("email") email: string) {
    const createdUser = await prisma.user.create({
      data: { name, email, imageUrl: "" },
    })
    return createdUser
  }
}
