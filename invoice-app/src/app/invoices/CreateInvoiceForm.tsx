"use client"

import { dummyCompany } from "@/features/company/types"
import { CreateInvoiceFormInput, createInvoiceFormSchema } from "@/features/invoice/schema"
import { dummyBankAccount } from "@/features/user/types"
import { Box, Button, Flex, Group, NumberInput, Paper, Table, Text, Textarea, Title } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm, zodResolver } from "@mantine/form"
import { IconDownload } from "@tabler/icons-react"
import dayjs from "dayjs"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useEffect, useState } from "react"

export const CreateInvoiceForm = () => {
  const [enabledEditor, setEnabledEditor] = useState(true)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "e") {
        e.preventDefault()
        setEnabledEditor((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const form = useForm<CreateInvoiceFormInput>({
    validate: zodResolver(createInvoiceFormSchema),
    initialValues: {
      dueDate: new Date("2024-06-30"),
      isHourly: true,
      details: [{ id: "1", unitName: "システム開発支援", unitPrice: 4300, quantity: 62 }],
      taxRate: 0.1,
      notes: "注文番号：1234567890",
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
      {!enabledEditor && (
        <Group justify="flex-end">
          <Button my={20} onClick={handleDownload} rightSection={<IconDownload size={18} />} children="PDF" disabled={!form.isValid()} />
        </Group>
      )}
      <Paper shadow="xs" radius="md" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Box id="pdf-target" px={60} py={40}>
            <Title fz={28} fw="bold" ta="center" lts={6} children="御請求書" />
            <Flex mt={48} align="flex-end" justify="space-between">
              <Text fz={20} fw="bold" ta="left" children={`${dummyCompany.name} 御中`} />
              <Text fz={12} children={`作成日：${dayjs(form.values.dueDate).subtract(2, "month").endOf("month").format("YYYY年MM月DD日")}`} />
            </Flex>
            <Group mt={40} justify="flex-end">
              <Box>
                <Text fz={12} children={`〒${dummyCompany.zipcode}`} />
                <Text fz={12} children={dummyCompany.address} />
                <Text fz={12} children={`TEL${dummyCompany.phoneNumber}`} />
                <Text fz={12} children={dummyCompany.managerName} />
              </Box>
            </Group>
            <Text my={32} fz={16} fw="bold" ta="left" children="下記の通り御請求申し上げます。" />
            <Box>
              <Text fz={14} children={`金融機関 ： ${dummyBankAccount.bankName}`} />
              <Text fz={14} children={`口座番号 ： ${dummyBankAccount.accountNumber}`} />
              <Text fz={14} children={`支店名　 ： ${dummyBankAccount.branchName}`} />
              <Text fz={14} children={`口座名義 ： ${dummyBankAccount.accountHolder}`} />
            </Box>
            <Table mt={40} w="60%" withTableBorder withColumnBorders withRowBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w="170px" ta="center" bg="gray.1" children="振込期限" />
                  {enabledEditor ? (
                    <Table.Th children={<DateInput {...form.getInputProps("dueDate")} />} />
                  ) : (
                    <Table.Th ta="center" children={dayjs(form.values.dueDate).format("YYYY年MM月DD日")} />
                  )}
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
                {form.values.details.map((unit, i) => (
                  <Table.Tr key={unit.id}>
                    <Table.Th children={unit.unitName} />
                    <Table.Th ta="right" children={`¥${unit.unitPrice.toLocaleString()}`} />
                    {enabledEditor ? (
                      <Table.Th children={<NumberInput {...form.getInputProps(`details.${i}.quantity`)} />} />
                    ) : (
                      <Table.Th ta="center" children={unit.quantity} />
                    )}

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
              <Textarea
                styles={{ input: { minHeight: 80, color: enabledEditor ? "red" : "black" } }}
                {...form.getInputProps("notes")}
                placeholder="備考"
                disabled={!enabledEditor}
              />
            </Box>
          </Box>
        </form>
      </Paper>
    </>
  )
}
