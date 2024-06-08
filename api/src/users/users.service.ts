import { Injectable } from "@nestjs/common"
import type { User } from "./user.model"

@Injectable()
export class UsersService {
  findAll(): User[] {
    return []
  }
}
