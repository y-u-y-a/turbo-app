import { Container } from "@mantine/core"
import type { Metadata } from "next/types"
import { CreateInvoiceForm } from "./CreateInvoiceForm"

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
}

export default function Page() {
  return (
    <Container size="sm" py={20}>
      <CreateInvoiceForm />
    </Container>
  )
}
