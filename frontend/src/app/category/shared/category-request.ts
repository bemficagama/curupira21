import { Category } from "./category";

export interface Link {
  url: string
  label: string
  active: boolean
}

export interface Parameter {
  page: number
  perPage: number
}

export interface CategoryRequest {
  data: Category[]
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: string
  prev_page_url: string
  path: string
  from: number
  to: number
  links: Link[]
}
