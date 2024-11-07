import { Container } from "@mantine/core"
import type { Metadata } from "next/types"
import { CreateInvoiceForm } from "./CreateInvoiceForm"

export const metadata: Metadata = {
  title: "請求書作成",
  description: "請求書作成",
}

export default async function Page() {
  return (
    <Container size="sm" py={20}>
      <CreateInvoiceForm />
    </Container>
  )
}
