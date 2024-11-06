"use client"

import { CreateInvoiceFormInput, createInvoiceFormSchema } from "@/features/invoice/schema"
import { Box, Flex, Group, Paper, Table, Text, Title } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"

export const CreateInvoiceForm = () => {
  const form = useForm<CreateInvoiceFormInput>({
    validate: zodResolver(createInvoiceFormSchema),
    initialValues: {
      name: "",
      email: "",
    },
  })

  const handleSubmit = async (input: CreateInvoiceFormInput) => {
    console.log(input)
  }

  return (
    <Paper px={60} py={40} h="100%" shadow="md" radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Title fz={24} fw="bold" ta="center" lts={6} children="御請求書" />
        <Flex mt={28} justify="space-between" align="center">
          <Text fz={18} fw="bold" ta="left" children="株式会社サンプル 御中" />
          <Text fz={12} children="作成日 2024年6月30日" />
        </Flex>
        <Group mt={28} justify="flex-end">
          <Box>
            <Text fz={12} children="〒123-4567" />
            <Text fz={12} children="東京都千代田区サンプル町1-2-3" />
            <Text fz={12} children="TEL 03-1234-5678" />
            <Text fz={12} children="テスト太郎" />
          </Box>
        </Group>
        <Text my={20} fz={16} fw="bold" ta="left" children="下記の通り御請求申し上げます。" />
        <Box>
          <Text fz={14} children="金融機関 ： 三井住友銀行" />
          <Text fz={14} children="口座番号 ： 1234567" />
          <Text fz={14} children="支店名　 ： テスト支店" />
          <Text fz={14} children="口座名義 ： テスト太郎" />
        </Box>
        <Table mt={40} w="60%" withTableBorder withColumnBorders withRowBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta="center" bg="gray.1" children="振込期限" />
              <Table.Th ta="center" children="2024年6月30日" />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th ta="center" bg="gray.1" children="御請求金額（税込）" />
              <Table.Th ta="center" children="¥715,000" />
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Table mt={20} withTableBorder withColumnBorders withRowBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th bg="gray.1" ta="center" children="内容" />
              <Table.Th bg="gray.1" ta="center" children="単価" />
              <Table.Th bg="gray.1" ta="center" children="数量" />
              <Table.Th bg="gray.1" ta="center" children="金額" />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th children="システム開発支援" />
              <Table.Th ta="right" children="¥650,000" />
              <Table.Th ta="center" children="1" />
              <Table.Th ta="right" children="¥650,000" />
            </Table.Tr>
            <Table.Tr>
              <Table.Th />
              <Table.Th colSpan={2} bg="gray.1" ta="center" children="小計" />
              <Table.Th ta="right" children="¥650,000" />
            </Table.Tr>
            <Table.Tr>
              <Table.Th />
              <Table.Th colSpan={2} bg="gray.1" ta="center" children="消費税（10%）" />
              <Table.Th ta="right" children="¥65,000" />
            </Table.Tr>
            <Table.Tr>
              <Table.Th />
              <Table.Th colSpan={2} bg="gray.1" ta="center" children="合計" />
              <Table.Th ta="right" children="¥715,000" />
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </form>
    </Paper>
  )
}
