import { Category } from "./category";
import { Link } from "src/app/shared/Link";

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