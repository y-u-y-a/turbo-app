"use client"

import { type SearchUserFormInput, searchUserFormSchema } from "@/features/user/userSchema"
import { useChangeQueryParams } from "@/hooks/useChangeQueryParams"
import { Button, Group, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"

export const SearchUserForm = () => {
  const { overwriteQueryParams } = useChangeQueryParams()

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
    <form onSubmit={form.onSubmit(search)} noValidate>
      <Group align="flex-end">
        <TextInput maw={200} {...form.getInputProps("name")} label="Name" />
        <TextInput maw={200} {...form.getInputProps("email")} label="Email" />
        <Button children="Search" variant="filled" type="submit" disabled={!form.values.name && !form.values.email} />
      </Group>
    </form>
  )
}
