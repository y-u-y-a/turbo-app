import type { Pokemon } from "@/features/pokemon/types"
import { BaseService, type Pagination } from "./baseService"

interface GetPokemonsResponse {
  results: {
    name: string
    url: string
  }[]
}

interface GetPokemonResponse {
  id: number
  name: string
  weight: number
  sprites: {
    front_default: string
    front_shiny: string
  }
}

interface GetPokemonSpeciesResponse {
  names: {
    name: string
    language: {
      name: string
    }
  }[]
}

class PokemonService extends BaseService {
  /**
   * ページネーションによるデータ取得をする
   * 総データ数から、limitで分割した場合のtotalPageを取得する必要
   * */
  async getByPaging(currentPage: number): Promise<Pagination<Pokemon>> {
    const paginate = 24 // ページあたり件数
    const total = 1025 // ダミー件数
    const offset = (currentPage - 1) * paginate // pokeAPIの仕様でoffset=0が初期値のため
    const totalPages = total / paginate // ポケモン総数から算出する必要

    const items = await this.getAll(offset, paginate)
    return { total, paginate, currentPage, totalPages, items }
  }
  /**
   * ポケモン情報一覧を取得する
   * @param offset 何件目のデータから取得したいか
   * @param limit offsetから何件取得するか
   * */
  private async getAll(offset: number, limit: number): Promise<Pokemon[]> {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    const data: GetPokemonsResponse = await (await fetch(url)).json()
    const pokemons = await Promise.all(data.results.map(async (pokemon) => await this.getDetail(pokemon.url)))
    return pokemons
  }

  /** ポケモン詳細情報を取得する */
  private async getDetail(url: string): Promise<Pokemon> {
    const data: GetPokemonResponse = await (await fetch(url)).json()

    return {
      id: data.id,
      name: await this.toJapaneseName(data.name),
      weight: data.weight,
      image: data.sprites.front_default,
      shinyImage: data.sprites.front_shiny,
    }
  }

  /** ポケモン名を日本語に変換する */
  private async toJapaneseName(enName: string): Promise<string> {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${enName.toLowerCase()}`
    const { names }: GetPokemonSpeciesResponse = await (await fetch(url)).json()
    const japaneseName = names.find((nameInfo) => nameInfo.language.name === "ja-Hrkt")?.name || "？？？"
    return japaneseName
  }
}

export const pokemonService = new PokemonService()
