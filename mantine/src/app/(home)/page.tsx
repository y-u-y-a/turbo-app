import { Container } from "@mantine/core"
import type { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
}

export default function RootPage() {
  return <Container py={40}>Home</Container>
}
