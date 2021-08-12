import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { CategoryService } from '../shared/category.service';
import { AlertService } from 'src/app/_alert';
import { Router, ActivatedRoute } from '@angular/router';
import { Link, Parameter } from '../shared/category-request'

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
  editCategory: Category | undefined; // the Entity currently being edited
  quantityPages: number = 0
  groupIndex: number = 0
  groups: number[][] = []
  page: number = 1
  perPage: number = 4
  links: Link[] = new Array<Link>()
  from: number = 0
  total: number = 1


  public firstPage = 1;
  public lastPage = 1;
  public mainCategory = 0
  public search: string = ''

  constructor(
    private categoryService: CategoryService,
    protected alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.categoryService.getCategories(this.page, this.perPage, this.mainCategory, this.search, '') //window.location.href
      .subscribe(data => {
        this.categories = data!.data
        this.page = data!.current_page
        this.perPage = data!.per_page
        this.links = data!.links
        this.from = data!.from
        this.total = data!.total
        //count = data!.total
        //this.quantityPages = Math.ceil(count / this.quantityPerPage)
        //this.groups = this.separar(this.pages, 5)
      })



  }

  ngOnInit() {
    //this.getCategory()
    //this.getMains()
  }

  getCategory(): void {
    let count: number = 0;
    this.categoryService.getCategories(this.page, this.perPage, this.mainCategory, this.search, '') //window.location.href
      .subscribe(data => {

        this.categories = data!.data
        this.page = data!.current_page
        this.perPage = data!.per_page
        this.links = data!.links
        this.from = data!.from
        this.total = data!.total

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

  private separar(itens: any[], maximo: number): number[][] {
    return itens.reduce((acumulador: any[], item: number, indice: number) => {
      const grupo = Math.floor(indice / maximo);
      acumulador[grupo] = [...(acumulador[grupo] || []), item];
      return acumulador;
    }, []);
  };

  get pages() {
    let aPages = new Array()
    for (let i = 0; i < this.quantityPages; i++) {
      aPages[i] = i + 1
    }
    return aPages
  }

  get group(): number[] {
    //this.groups = this.separar(this.pages, 5)
    return this.groups[this.groupIndex]
  }

  groupPrior() {
    if (this.groupIndex > 0) {
      this.groupIndex--
      //this.changePage(this.groups[this.groupIndex][0])
    }
  }

  groupNext() {
    if (this.groupIndex < this.groups.length - 1) {
      this.groupIndex++
      //this.changePage(this.groups[this.groupIndex][0])
    }

  }

  changePage(link: Link) {
    if (Number(link.label)) {
      this.page = Number(link.label)
    } else if (link.label == '...') {
      this.page = this.from
    }
    this.getCategory()
  }

  onMainChange() {
    this.groupIndex = 0
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

  fistPage() {

  }
}
