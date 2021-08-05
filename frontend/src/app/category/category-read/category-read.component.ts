import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category';
import { CategoryService } from '../shared/category.service';
import { AlertService } from 'src/app/_alert';

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

  categories: Category[] = new Array<Category>();
  mainCategories: Category[] = new Array<Category>()
  editCategory: Category | undefined; // the Entity currently being edited
  quantityPages: number = 0;
  groupIndex: number = 0;
  groups: number[][] = []

  public quantityPerPage = 4;
  public selectedPage = 1;
  public firstPage = 1;
  public lastPage = 1;
  public mainCategory = 0

  constructor(
    private categoryService: CategoryService,
    protected alertService: AlertService
  ) {}

  ngOnInit() {
    this.getCategory()
    this.getMains()
  }

  getCategory(): void {
    let count: number = 0;
    this.categoryService.getCategories(this.selectedPage, this.quantityPerPage, this.mainCategory)
      .subscribe(data => {
        this.categories = data!.data
        count = data!.count
        this.quantityPages = Math.ceil(count / this.quantityPerPage)
        this.groups = this.separar(this.pages, 5)
      })
  }

  getMains(): void {
    this.categoryService.getMains()
      .subscribe(data => this.mainCategories = data!)
  }

  delete(category: Category) {
    this.categoryService.deleteCategory(category.id!).subscribe(() => {
      let index = this.categories.findIndex(c => this.locator(c, category.id!));
      if (index > -1) {
        this.categories.splice(index, 1);
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

  changePageSize(newSize: number) {
    this.quantityPerPage = Number(newSize);
    this.groupIndex = 0
    this.changePage(1);
  }

  get pageCount(): number {
    return 1
  }

  onChangeSize($event: any) {
    const size: number = $event.value
    this.changePageSize(size)
  }

  onMainChange($event: any) {
    this.mainCategory = Number($event.value)
    this.groupIndex = 0
    this.changePage(1);
  }
}
