"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

/**
 * クエリパラメータを変更するhooks
 * */
export const useChangeQueryParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /** "page="のみを変更する */
  const paginateQueryParams = (newPage: string | number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.replace(`${pathname}?${params.toString()}`)
  }

  /** 特定のクエリのみを変更する */
  const changeQueryParams = (newQueryParam: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(newQueryParam, value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  /**
   * @summary 既存のクエリパラメータを全て上書きする
   * @description 検索処理などクエリを最新化する際に使用する
   * */
  const overwriteQueryParams = (QueryParams: `${string}=${string}`[]) => {
    router.replace(`${pathname}?${QueryParams.join("&")}`)
  }

  /**
   * @summary 既存のクエリパラメータを全て削除する
   * */
  const clearQueryParams = () => {
    router.replace(pathname)
  }

  return { paginateQueryParams, changeQueryParams, overwriteQueryParams, clearQueryParams }
}
