export interface IAxiosResponse<T = unknown> {
  success: boolean
  metadata: IMeta
  data: T
}

export interface IMeta {
  timestamp: string
  requestId: string | null
}

export interface IPaginationMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface IPageParams {
  page: number
  limit: number
}

export interface FormatNumberOptions {
  symbol?: string // Currency or other symbol
  decimals?: number // Number of decimal places for large number formatting
  useBigNumberFormat?: boolean // Enable big number formatting (e.g., K, M, B, T)
}
