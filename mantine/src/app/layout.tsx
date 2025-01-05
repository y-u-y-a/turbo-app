import { APP_TITLE } from "@/config/consts"
import { MantineUIProvider } from "@/config/mantine"
import { Box, Stack } from "@mantine/core"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { default: APP_TITLE, template: `%s | ${APP_TITLE}` },
  description: `${APP_TITLE}の公式サイトです。`,
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja" style={{ scrollBehavior: "smooth" }}>
      <head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </head>
      <body>
        <MantineUIProvider>
          <Stack gap={0} mih="100vh">
            {/* <Header pos="sticky" top={0} /> */}
            <Box style={{ flexGrow: 1 }} children={children} />
            {/* <Footer /> */}
          </Stack>
        </MantineUIProvider>
      </body>
    </html>
  )
}
