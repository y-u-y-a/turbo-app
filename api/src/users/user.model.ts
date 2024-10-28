import { components } from "src/api"

export type User = components["schemas"]["User"]

type GetUsersResponse = components["responses"]["GetUsersResponse"]["content"]["application/json"]
type GetUserResponse = components["responses"]["GetUserResponse"]["content"]["application/json"]
type UpdateUserResponse = components["responses"]["UpdateUserResponse"]["content"]["application/json"]

export interface IUsersController {
  paging(curentPage: string, email: string): Promise<GetUsersResponse>
  find(userid: string): Promise<GetUserResponse>
  update(userid: string, name: string, email: string): Promise<UpdateUserResponse>
  create(name: string, email: string): Promise<GetUserResponse>
}
