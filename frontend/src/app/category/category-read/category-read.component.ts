import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-read',
  templateUrl: './category-read.component.html',
  providers: [CategoryService],
  styleUrls: ['./category-read.component.css']
})
export class CategoryReadComponent implements OnInit {
  categories: Category[] = [];
  editCategory: Category | undefined; // the Entity currently being edited

  public quantityPerPage = 4;
  public selectedPage = 1;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(): void {
    this.categoryService.getCategories(this.selectedPage, this.quantityPerPage)
      .subscribe(data => (this.categories = data));
  }

  navigateToProductCreate(): void {

  }

  edit(category: Category) {
    console.log("editar")
    //vai para CategoryEditComponent
  }

  delete(category: Category): void {
    this.categories = this.categories.filter(c => c !== category);
    this.categoryService
      .deleteCategory(category.id!)
      .subscribe();
    //
    // oops ... subscribe() is missing so nothing happens
    //this.heroesService.deleteHero(hero.id);
    //
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

  changePage(newPage: number) {
    this.selectedPage = newPage
    this.getCategory()
  }

  changePageSize(newSize: number) {
    this.quantityPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return 1
  }

  onChangeSize($event: any) {
    const size: number = $event.value
    this.changePageSize(size)
  }
}
