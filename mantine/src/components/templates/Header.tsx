"use client"

import { APP_TITLE, Paths } from "@/config/consts"
import { Anchor, Box, Burger, Divider, Drawer, Flex, Group, Indicator, Select, Stack, Switch, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconBell } from "@tabler/icons-react"
import Link from "next/link"

export const Header = () => {
  const [showMenu, { toggle: toggleMenu }] = useDisclosure()

  return (
    <>
      <Flex px={24} h="100%" justify="space-between">
        <Group gap={24} align="center">
          <Anchor c="primary" underline="never" component={Link} href={Paths.HOME}>
            <Title children={APP_TITLE} size="h2" />
          </Anchor>
          <Select w={140} data={[{ label: "加盟店取引管理", value: "1" }]} defaultValue="1" variant="unstyled" searchable clearable />
        </Group>
        <Group gap="md">
          <Group visibleFrom="md" gap="lg">
            <Indicator inline label="12" size={16} children={<IconBell />} />
            <Divider orientation="vertical" />
            <Switch label="本番環境" defaultChecked />
            <Divider orientation="vertical" />
            <Select w={92} data={[{ label: "12345", value: "12345" }]} defaultValue="12345" variant="unstyled" searchable clearable />
          </Group>

          <Box hiddenFrom="md">
            <Burger color="primary" opened={showMenu} onClick={toggleMenu} />
            <Drawer position="right" opened={showMenu} onClose={toggleMenu}>
              <Stack gap="lg">
                <Anchor underline="never" href={Paths.USERS} fw="bold" children="Users" />
              </Stack>
            </Drawer>
          </Box>
        </Group>
      </Flex>
    </>
  )
}
