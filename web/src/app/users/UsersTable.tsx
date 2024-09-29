import { PaginationGroup } from "@/components/elements/PaginationGroup"
import { userService } from "@/services/userService"
import { Anchor, Flex, Table, TableScrollContainer, TableTbody, TableTd, TableTh, TableThead, TableTr } from "@mantine/core"
import Link from "next/link"
import { SearchUserForm } from "./SearchUserForm"

interface Props {
  currentPage: number
  email: string
}

export const UsersTable = async ({ currentPage, email }: Props) => {
  const { items: users, totalPages } = await userService.getByPaging(currentPage, email)

  return (
    <>
      <Flex mb={20} justify="space-between" align="flex-end">
        <SearchUserForm />
        <PaginationGroup currentPage={currentPage} totalPage={totalPages} />
      </Flex>
      <TableScrollContainer minWidth="1060px">
        <Table withTableBorder withColumnBorders>
          <TableThead>
            <TableTr>
              <TableTh colSpan={4} ta="center" fw="bold" bg="gray.2" children="ID" />
              <TableTh colSpan={4} ta="center" fw="bold" bg="gray.2" children="Name" />
              <TableTh colSpan={4} ta="center" fw="bold" bg="gray.2" children="Email" />
            </TableTr>
          </TableThead>
          <TableTbody>
            {users.map((user) => (
              <TableTr key={user.id}>
                <TableTd colSpan={4} ta="center">
                  <Anchor href={`/users/${user.id}`} component={Link} children={user.id} />
                </TableTd>
                <TableTd colSpan={4} children={user.name} />
                <TableTd colSpan={4} children={user.email} />
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </TableScrollContainer>
    </>
  )
}
