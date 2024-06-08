"use client"

import { type SearchUserFormInput, searchUserFormSchema } from "@/features/user/userSchema"
import { useChangeQueryParams } from "@/hooks/useChangeQueryParams"
import { Button, Flex, Group, Paper, Stack, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"

export const SearchUserForm = () => {
  const { overwriteQueryParams, clearQueryParams } = useChangeQueryParams()

  const form = useForm<SearchUserFormInput>({
    validate: zodResolver(searchUserFormSchema),
    initialValues: {
      name: "",
      email: "",
    },
  })

  /** 検索する */
  const search = async (input: SearchUserFormInput) => {
    overwriteQueryParams([`email=${input.email}`, `name=${input.name}`])
  }

  return (
    <>
      <Paper mb={60} p={40} bg="gray.2" radius="sm">
        <form onSubmit={form.onSubmit(search)} noValidate>
          <Stack gap={24}>
            <Group>
              <TextInput maw={360} {...form.getInputProps("name")} label="Name" />
              <TextInput maw={360} {...form.getInputProps("email")} label="Email" error={!!form.errors.email} />
            </Group>
            <Flex gap="md" align="center">
              <Button children="Clear" variant="outline" onClick={clearQueryParams} />
              <Button children="Search" variant="filled" type="submit" />
            </Flex>
          </Stack>
        </form>
      </Paper>
    </>
  )
}
