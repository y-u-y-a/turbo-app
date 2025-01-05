"use client"

import { Button, type ButtonProps, LoadingOverlay } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useRouter } from "next/navigation"

interface Props extends ButtonProps {
  children: React.ReactNode
  href: string
  unLoading?: boolean
}

/**
 * @description
 * router.pushによる遷移のためハードナビゲーションします
 * nextjs13.4以降、初回のrouter.pushのみハードナビゲーションします
 * 2回目以降はLinkと同様にソフトナビゲーションします
 */
export function PagingButton({ children, href, unLoading, ...props }: Props) {
  const router = useRouter()
  const [isLoading, loading] = useDisclosure(false)

  const onClick = () => {
    if (!unLoading) loading.open()
    router.push(href)
  }

  return (
    <>
      <LoadingOverlay visible={isLoading} pos="fixed" />
      <Button onClick={onClick} {...props}>
        {children}
      </Button>
    </>
  )
}
