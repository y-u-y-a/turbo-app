import createClient from "openapi-fetch"
import type { paths } from "./api"

export type Pagination<T> = {
  total: number // 総アイテム数
  currentPage: number // 現在のページ
  totalPages: number // 総ページ数
  paginate: number // ページあたりのアイテム数
  items: T[] // 現在ページのアイテム情報
}

export class BaseService {
  protected api

  constructor() {
    this.api = createClient<paths>({
      baseUrl: global.process.env.API_URL,
      // headers: {
      //   Authorization: `Bearer ${process.env.API_TOKEN || ""}`,
      // },
    })
  }

  /**
   * @description 本来サーバー処理したいがないのでここに実装
   * @param items 分割対象の全てのアイテム情報
   * @param currentPage 取得したいページ
   * @param paginate ページあたりのアイテム数
   * */
  protected paging<T>(items: T[], currentPage: number, paginate = 4): Pagination<T> {
    // ページネーション分割
    const newItemsList = Array.from({ length: Math.ceil(items.length / paginate) }, (_, i) => items.slice(i * paginate, i * paginate + paginate))
    // 現在のアイテム一覧
    const currentItems = newItemsList[currentPage - 1] || []

    return {
      paginate,
      currentPage,
      totalPages: newItemsList.length,
      total: items.length,
      items: currentItems,
    }
  }
}
