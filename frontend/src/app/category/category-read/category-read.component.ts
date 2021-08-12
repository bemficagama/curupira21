import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { CategoryService } from '../shared/category.service';
import { AlertService } from 'src/app/_alert';
import { Link } from 'src/app/shared/Link';
import { Pagination } from 'src/app/shared/Pagination';

@Component({
  selector: 'app-category-read',
  templateUrl: './category-read.component.html',
  providers: [CategoryService],
  styleUrls: ['./category-read.component.css']
})
export class CategoryReadComponent implements OnInit {

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  private locator = (c: Category, id: number) => c.id == id;

  categories: Category[] = new Array<Category>()
  mainCategories: Category[] = new Array<Category>()
  pagination: Pagination = {
    total: 0,
    per_page: 4,
    current_page: 1,
    last_page: 0,
    first_page_url: '',
    last_page_url: '',
    next_page_url: '',
    prev_page_url: '',
    path: '',
    from: 0,
    to: 0,
    links: new Array<Link>()
  }
  
  public mainCategory = 0
  public search: string = ''

  constructor(
    private categoryService: CategoryService,
    protected alertService: AlertService,
  ) {

    this.categoryService.getCategories(this.pagination.current_page | 1, this.pagination.per_page | 4, this.mainCategory, this.search, '') //window.location.href
      .subscribe(data => {
        this.categories = data!.data
        /* this.page = data!.current_page
        this.perPage = data!.per_page
        this.links = data!.links
        this.from = data!.from
        this.total = data!.total */
        this.pagination = {total: data.total, per_page: data.per_page, current_page: data.current_page, 
          last_page: data.last_page, first_page_url: data.first_page_url, last_page_url: data.last_page_url,
          next_page_url: data.next_page_url, prev_page_url:data.prev_page_url, path: data.path, from:data.from,
          to: data.to, links: data.links}
        //count = data!.total
        //this.quantityPages = Math.ceil(count / this.quantityPerPage)
        //this.groups = this.separar(this.pages, 5)
      })
  }

  ngOnInit() {
  }

  getCategory(): void {
    let count: number = 0;
    this.categoryService.getCategories(this.pagination.current_page, this.pagination.per_page, this.mainCategory, this.search, '') //window.location.href
      .subscribe(data => {

        this.categories = data!.data
        /* this.page = data!.current_page
        this.perPage = data!.per_page
        this.links = data!.links
        this.from = data!.from
        this.total = data!.total */
        this.pagination = {total: data.total, per_page: data.per_page, current_page: data.current_page, 
        last_page: data.last_page, first_page_url: data.first_page_url, last_page_url: data.last_page_url,
        next_page_url: data.next_page_url, prev_page_url:data.prev_page_url, path: data.path, from:data.from,
        to: data.to, links: data.links}
        console.log(this.pagination.per_page)
        //count = data!.total
        //this.quantityPages = Math.ceil(count / this.quantityPerPage)
        //this.groups = this.separar(this.pages, 5)

      })
  }

  getMains(): void {
    this.categoryService.getMains()
      .subscribe(data => this.mainCategories = data!)
  }

  delete(category: Category) {
    /* this.categoryService.deleteCategory(category.id!).subscribe(() => {
      let index = this.categories.data.findIndex(c => this.locator(c, category.id!));
      if (index > -1) {
        this.categories.data.splice(index, 1);
      }
      this.alertService.success('Sucesso: Categoria Excluída!', this.options)
    }); */
  }

  onMainChange() {
    //this.groupIndex = 0
    //this.changePage(1);
  }

  onEnter() {
    //this.changePage(1)
    this.getCategory()
  }

  onEscape() {
    this.search = ''
    //this.changePage(1)
    this.getCategory()
  }
}
