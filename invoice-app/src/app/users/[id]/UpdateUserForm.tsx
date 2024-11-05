"use client"

import { updateUserAction } from "@/features/user/actions"
import type { User } from "@/features/user/types"
import { type UpdateUserFormInput, updateUserFormSchema } from "@/features/user/userSchema"
import { Button, Flex, Paper, type PaperProps, Stack, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useTransition } from "react"

interface Props extends PaperProps {
  user: User
}

export const UpdateUserForm = ({ user, ...props }: Props) => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<UpdateUserFormInput>({
    validate: zodResolver(updateUserFormSchema),
    initialValues: {
      name: user.name,
      email: user.email,
    },
  })

  const handleSubmit = async (input: UpdateUserFormInput) => {
    startTransition(async () => {
      try {
        const newUser = await updateUserAction(user, input)
        notifications.show({ title: "Success!", message: `Name:${newUser.name},Email:${newUser.email}`, color: "green" })
      } catch (error) {
        console.error({ error })
        notifications.show({ title: "Failed!", message: "failed update user.", color: "pink" })
      }
    })
  }

  return (
    <>
      <Paper mb={60} p={40} bg="gray.2" radius={0} {...props}>
        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Stack gap={20}>
            <TextInput {...form.getInputProps("name")} label="Name" error={form.errors.name} />
            <TextInput {...form.getInputProps("email")} label="Email" error={form.errors.email} />
          </Stack>
          <Flex mt={40} gap="md" justify="center">
            <Button variant="filled" type="submit" children="Update" disabled={isPending} />
          </Flex>
        </form>
      </Paper>
    </>
  )
}
