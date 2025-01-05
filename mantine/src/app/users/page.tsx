import { PaginationGroup } from "@/components/elements/PaginationGroup"
import { userService } from "@/services/userService"
import { Container, Flex, Paper, Skeleton, Space, TableScrollContainer } from "@mantine/core"
import type { Metadata } from "next/types"
import { Suspense } from "react"
import { SearchUserForm } from "./(components)/SearchUserForm"
import { UsersTable } from "./(components)/UsersTable"

/**
 * デフォルトは静的レンダリングであり、mockサーバーがローカルのみなので動的レンダリングを指定しています
 * APIの実装が完了すれば下記記載は削除できます
 */
// export const dynamic: NextJS["dynamic"] = "force-dynamic"

export const metadata: Metadata = {
  title: "Users",
  description: "Users",
}

interface Props {
  searchParams: {
    page?: string
    email?: string
  }
}

export default async function UsersPage({ searchParams: { page, email } }: Props) {
  const currentPage = Number(page) || 1
  const { items: users, totalPages } = await userService.getByPaging(currentPage, email)

  return (
    <Container>
      <Space py={20} />
      <Paper mb={24} p={40} mx="auto" radius="md">
        <Flex mb={20} justify="space-between" align="flex-end">
          <SearchUserForm />
          <PaginationGroup totalPage={totalPages} />
        </Flex>
        <Suspense fallback={<Skeleton miw="1028px" h="200px" />}>
          <TableScrollContainer minWidth="1028px">
            <UsersTable users={users} />
          </TableScrollContainer>
        </Suspense>
      </Paper>
    </Container>
  )
}
