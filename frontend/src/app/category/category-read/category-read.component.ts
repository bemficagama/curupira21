import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { CategoryRequest, Link} from '../shared/categoryRequest';
import { CategoryService } from '../shared/category.service';
import { AlertService } from 'src/app/_alert';
import { Router, ActivatedRoute } from '@angular/router';

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

  categories: CategoryRequest = {data: new Array<Category>(), total: 0, per_page: 0,
    current_page: 0, last_page: 0, first_page_url: '', last_page_url: '',
    next_page_url: '', prev_page_url: '', path: '', from: 0, to: 0, 
    links: new Array<Link>()
  }
  mainCategories: Category[] = new Array<Category>()
  editCategory: Category | undefined; // the Entity currently being edited
  quantityPages: number = 0
  groupIndex: number = 0
  groups: number[][] = []


  public quantityPerPage = 4;
  public selectedPage = 1;
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
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedPage = params['page'];
    })
  }

  ngOnInit() {
    this.getCategory()
    this.getMains()
  }

  getCategory(): void {
    let count: number = 0;
    this.categoryService.getCategories(this.selectedPage, this.quantityPerPage, this.mainCategory, this.search, '' ) //window.location.href
      .subscribe(data => {
        this.categories = data!
        count = data!.total
        this.quantityPages = Math.ceil(count / this.quantityPerPage)
        this.groups = this.separar(this.pages, 5)
        console.log(data!.first_page_url)
      })
  }

  getMains(): void {
    this.categoryService.getMains()
      .subscribe(data => this.mainCategories = data!)
  }

  delete(category: Category) {
    this.categoryService.deleteCategory(category.id!).subscribe(() => {
      let index = this.categories.data.findIndex(c => this.locator(c, category.id!));
      if (index > -1) {
        this.categories.data.splice(index, 1);
      }
      this.alertService.success('Sucesso: Categoria Excluída!', this.options)
    });
  }

  /* add(name: string): void {
    this.editCategory = undefined;
    name = name.trim();
    if (!name) {
      return;
    }

    // The server will generate the id for this new hero
    const newHero: Hero = { name } as Hero;
    this.heroesService
      .addHero(newHero)
      .subscribe(hero => this.heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroesService
      .deleteHero(hero.id)
      .subscribe();
    //
    // oops ... subscribe() is missing so nothing happens
    //this.heroesService.deleteHero(hero.id);
    //
  }

  

  search(searchTerm: string) {
    this.editHero = undefined;
    if (searchTerm) {
      this.heroesService
        .searchHeroes(searchTerm)
        .subscribe(heroes => (this.heroes = heroes));
    }
  }

  update() {
    if (this.editHero) {
      this.heroesService
        .updateHero(this.editHero)
        .subscribe(hero => {
        // replace the hero in the heroes list with update from server
        const ix = hero ? this.heroes.findIndex(h => h.id === hero.id) : -1;
        if (ix > -1) {
          this.heroes[ix] = hero;
        }
      });
      this.editHero = undefined;
    }
  } */

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
      this.changePage(this.groups[this.groupIndex][0])
    }
  }

  groupNext() {
    if (this.groupIndex < this.groups.length - 1) {
      this.groupIndex++
      this.changePage(this.groups[this.groupIndex][0])
    }

  }

  changePage(newPage: number) {
    this.selectedPage = newPage
    this.getCategory()
  }

  onChangeSize() {
    this.groupIndex = 0
    this.changePage(1);
  }

  onMainChange() {
    this.groupIndex = 0
    this.changePage(1);
  }

  onEnter() {
    this.changePage(1)
    this.getCategory()
  }

  onEscape() {
    this.search = ''
    this.changePage(1)
    this.getCategory()
  }

  fistPage() {

  }
}
