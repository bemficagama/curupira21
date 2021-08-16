import { Link } from "./Link";

export class Pagination {

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

  constructor() {
    this.total = 0
    this.per_page = 4,
    this.current_page = 1,
    this.last_page = 0,
    this.first_page_url = '',
    this.last_page_url = '',
    this.next_page_url = '',
    this.prev_page_url = '',
    this.path = '',
    this.from = 0,
    this.to = 0,
    this.links = new Array<Link>()
  }
}
