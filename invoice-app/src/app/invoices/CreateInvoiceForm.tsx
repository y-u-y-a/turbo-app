"use client"

import { CreateInvoiceFormInput, createInvoiceFormSchema } from "@/features/invoice/schema"
import { BankAccount, Company } from "@/features/invoice/types"
import { Box, Button, Flex, Group, NumberInput, Paper, Table, Text, Textarea, Title } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm, zodResolver } from "@mantine/form"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const company: Company = {
  id: "1234",
  name: "株式会社サンプル",
  zipcode: "123-4567",
  address: "東京都千代田区サンプル町1-2-3",
  phoneNumber: "03-1234-5678",
  managerName: "テスト太郎",
}

const bankAccount: BankAccount = {
  id: "9999",
  bankName: "三井住友銀行",
  branchName: "東京支店",
  accountType: "ordinary",
  accountNumber: "1234567",
  accountHolder: "テストタロウ",
  isDefault: true,
}

export const CreateInvoiceForm = () => {
  const form = useForm<CreateInvoiceFormInput>({
    validate: zodResolver(createInvoiceFormSchema),
    initialValues: {
      id: "1",
      userId: "1",
      billingDate: new Date("2024-05-31"),
      dueDate: new Date("2024-06-30"),
      isHourly: true,
      details: [{ id: "1", unitName: "システム開発支援", unitPrice: 4300, quantity: 62 }],
      taxRate: 0.1,
      notes: "注文番号：1234567890",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
  })

  const handleSubmit = async (input: CreateInvoiceFormInput) => {
    console.log(input)
  }

  const handleDownload = async () => {
    const el = document.getElementById("pdf-target")
    if (!el) return

    const canvas = await html2canvas(el, { scale: 2, useCORS: true })
    const pdf = new jsPDF("p", "mm", "a4")
    const imgWidth = 210 // A4サイズの幅
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save("invoice.pdf")
  }

  /** 小計 */
  const calculateSubtotal = () => {
    return form.values.details.reduce((sum, detail) => sum + detail.unitPrice * detail.quantity, 0)
  }

  return (
    <>
      <Paper pos="relative" shadow="md" radius="md" withBorder>
        <Box id="pdf-target" px={60} py={40}>
          <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
            <Title fz={28} fw="bold" ta="center" lts={6} children="御請求書" />
            <Flex mt={48} align="flex-end" justify="space-between">
              <Text fz={20} fw="bold" ta="left" children={`${company.name} 御中`} />
              <Group gap={0}>
                <Text fz={12} children="作成日：" />
                <DateInput
                  styles={{ input: { width: 100, textAlign: "right", fontSize: 12, cursor: "pointer" } }}
                  {...form.getInputProps("billingDate")}
                />
              </Group>
            </Flex>
            <Group mt={40} justify="flex-end">
              <Box>
                <Text fz={12} children={`〒${company.zipcode}`} />
                <Text fz={12} children={company.address} />
                <Text fz={12} children={`TEL${company.phoneNumber}`} />
                <Text fz={12} children={company.managerName} />
              </Box>
            </Group>
            <Text my={32} fz={16} fw="bold" ta="left" children="下記の通り御請求申し上げます。" />
            <Box>
              <Text fz={14} children={`金融機関 ： ${bankAccount.bankName}`} />
              <Text fz={14} children={`口座番号 ： ${bankAccount.accountNumber}`} />
              <Text fz={14} children={`支店名　 ： ${bankAccount.branchName}`} />
              <Text fz={14} children={`口座名義 ： ${bankAccount.accountHolder}`} />
            </Box>
            <Table mt={60} w="60%" withTableBorder withColumnBorders withRowBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th ta="center" bg="gray.1" children="振込期限" />
                  <Table.Th p={0}>
                    <DateInput {...form.getInputProps("dueDate")} />
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Th ta="center" bg="gray.1" children="御請求金額（税込）" />
                  <Table.Th ta="center" children={`¥${(calculateSubtotal() * form.values.taxRate + calculateSubtotal()).toLocaleString()}`} />
                </Table.Tr>
              </Table.Tbody>
            </Table>
            <Table mt={20} withTableBorder withColumnBorders withRowBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w="45%" bg="gray.1" ta="center" children="内容" />
                  <Table.Th w="15%" bg="gray.1" ta="center" children="単価" />
                  <Table.Th w="15%" bg="gray.1" ta="center" children={form.values.isHourly ? "時間" : "数量"} />
                  <Table.Th w="25%" bg="gray.1" ta="center" children="金額" />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {form.values.details.map((unit, index) => (
                  <Table.Tr key={unit.id}>
                    <Table.Th children={unit.unitName} />
                    <Table.Th ta="right" children={`¥${unit.unitPrice.toLocaleString()}`} />
                    <Table.Th p={0}>
                      <NumberInput {...form.getInputProps(`details.${index}.quantity`)} />
                    </Table.Th>
                    <Table.Th ta="right" children={`¥${(unit.unitPrice * unit.quantity).toLocaleString()}`} />
                  </Table.Tr>
                ))}
                <Table.Tr>
                  <Table.Th />
                  <Table.Th colSpan={2} bg="gray.1" ta="center" children="小計" />
                  <Table.Th ta="right" children={`¥${calculateSubtotal().toLocaleString()}`} />
                </Table.Tr>
                <Table.Tr>
                  <Table.Th />
                  <Table.Th colSpan={2} bg="gray.1" ta="center" children="消費税（10%）" />
                  <Table.Th ta="right" children={`¥${(calculateSubtotal() * form.values.taxRate).toLocaleString()}`} />
                </Table.Tr>
                <Table.Tr>
                  <Table.Th />
                  <Table.Th colSpan={2} bg="gray.1" ta="center" children="合計" />
                  <Table.Th ta="right" children={`¥${(calculateSubtotal() * form.values.taxRate + calculateSubtotal()).toLocaleString()}`} />
                </Table.Tr>
              </Table.Tbody>
            </Table>
            <Box mt={12}>
              <Textarea radius={0} {...form.getInputProps("notes")} placeholder="備考" />
            </Box>
          </form>
        </Box>
        <Button pos="absolute" right={-160} top={0} onClick={handleDownload} children="PDFダウンロード" />
      </Paper>
    </>
  )
}
