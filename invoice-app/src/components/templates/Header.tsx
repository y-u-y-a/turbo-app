"use client"

import { APP_TITLE, Paths } from "@/config/consts"
import { Anchor, Box, type BoxProps, Burger, Container, Drawer, Flex, Group, Stack, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Link from "next/link"

export const Header = (props: BoxProps) => {
  const [showMenu, { toggle: toggleMenu }] = useDisclosure()

  return (
    <Box style={{ zIndex: 99, backdropFilter: "blur(20px)", borderBottom: "1px solid", borderColor: "#ced4da" }} {...props}>
      <Container py={20}>
        <Flex justify="space-between">
          <Anchor c="primary" underline="never" component={Link} href={Paths.HOME}>
            <Title children={APP_TITLE} size="h2" />
          </Anchor>
          <Group gap="md">
            <Group visibleFrom="md" gap="lg">
              <Anchor mt={3} c="primary" fw="bold" underline="never" component={Link} href={Paths.INVOICES} children="請求書作成" />
            </Group>

            <Box hiddenFrom="md">
              <Burger color="primary" opened={showMenu} onClick={toggleMenu} />
              <Drawer position="right" opened={showMenu} onClose={toggleMenu}>
                <Stack gap="lg">
                  <Anchor underline="never" href={Paths.INVOICES} fw="bold" children="請求書作成" />
                </Stack>
              </Drawer>
            </Box>
          </Group>
        </Flex>
      </Container>
    </Box>
  )
}
