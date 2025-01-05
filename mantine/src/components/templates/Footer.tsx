import { APP_TITLE } from "@/config/consts"
import { Box, type BoxProps, Container, Group, Text } from "@mantine/core"

export function Footer(props: BoxProps) {
  return (
    <Box {...props}>
      <Container py={8}>
        <Group justify="center">
          <Text fz="xs">
            &copy;&nbsp;{new Date().getFullYear()}&nbsp;{APP_TITLE}&nbsp;All&nbsp;rights&nbsp;reserved.
          </Text>
        </Group>
      </Container>
    </Box>
  )
}
