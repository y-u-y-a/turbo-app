import { Header } from "@/components/templates/Header"
import { ActionIcon, AppShell, AppShellHeader, AppShellMain, AppShellNavbar } from "@mantine/core"
import { IconHeart, IconPhoto, IconSettings } from "@tabler/icons-react"

interface Props {
  children: React.ReactNode
}

export default function DashboradLayout({ children }: Props) {
  return (
    <>
      <AppShell header={{ height: 72 }} navbar={{ width: 100, breakpoint: "sm", collapsed: { mobile: true } }}>
        <AppShellHeader>
          <Header />
        </AppShellHeader>
        <AppShellNavbar px={8} py={16}>
          <ActionIcon variant="subtle" size={84} children={<IconPhoto stroke={1.5} />} />
          <ActionIcon variant="subtle" size={84} children={<IconSettings stroke={1.5} />} />
          <ActionIcon variant="subtle" size={84} children={<IconHeart stroke={1.5} />} />
        </AppShellNavbar>
        <AppShellMain children={children} />
      </AppShell>
    </>
  )
}
