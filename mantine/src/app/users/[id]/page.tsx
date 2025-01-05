import { userService } from "@/services/userService"
import { Container } from "@mantine/core"
import type { Metadata } from "next/types"
import { UpdateUserForm } from "./UpdateUserForm"

export const revalidate = 0

export const metadata: Metadata = {
  title: "ユーザー一覧",
  description: "ユーザー一覧",
}

interface Props {
  params: { id: string }
}

export default async function UsersPage({ params }: Props) {
  const user = await userService.find(params.id)
  return (
    <Container py={40}>
      <UpdateUserForm mt={40} mx="auto" maw={600} user={user} />
    </Container>
  )
}
