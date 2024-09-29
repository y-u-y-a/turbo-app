"use client"

import { useChangeQueryParams } from "@/hooks/useChangeQueryParams"
import { Group, type GroupProps, Pagination } from "@mantine/core"

interface Props extends GroupProps {
  currentPage: number // 選択中のページ位置(1〜)
  totalPage: number // 総ページ数
}

export const PaginationGroup = ({ currentPage, totalPage, ...props }: Props) => {
  const { paginateQueryParams } = useChangeQueryParams()

  return (
    <Group justify="flex-end" {...props}>
      <Pagination color="primary" total={totalPage} value={currentPage} onChange={paginateQueryParams} />
    </Group>
  )
}
