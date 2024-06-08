import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService], // DIコンテナとするため
  // exports: [UsersService], // 外部のモジュールで使用する場合
})
export class UsersModule {}
