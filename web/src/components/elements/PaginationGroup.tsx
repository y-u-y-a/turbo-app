"use client"

import { useChangeQueryParams } from "@/hooks/useChangeQueryParams"
import { Group, type GroupProps, Pagination } from "@mantine/core"
import { useSearchParams } from "next/navigation"

interface Props extends GroupProps {
  totalPage: number // 総ページ数
}

/** クエリパラメータ"page"を参照してページネーションする */
export const PaginationGroup = ({ totalPage, ...props }: Props) => {
  const searchParams = useSearchParams()
  const { paginateQueryParams } = useChangeQueryParams()

  return (
    <Group justify="flex-end" {...props}>
      <Pagination color="primary" total={totalPage} value={Number(searchParams.get("page") || "1")} onChange={paginateQueryParams} />
    </Group>
  )
}
