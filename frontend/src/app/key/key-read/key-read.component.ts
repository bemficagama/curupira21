import { Component, OnInit } from '@angular/core';

import { Key } from '../shared/key';
import { KeyService } from '../shared/key.service';
import { AlertService } from 'src/app/_alert';
import { Category } from 'src/app/category/shared/category';

@Component({
  selector: 'app-key-read',
  templateUrl: './key-read.component.html',
  providers: [KeyService],
  styleUrls: ['./key-read.component.css']
})
export class KeyReadComponent implements OnInit {

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  private locator = (c: Key, id: number) => c.id == id;

  keys: Key[] = new Array<Key>()
  categories: Category[] = new Array<Category>()
  quantityPages: number = 0
  groupIndex: number = 0
  groups: number[][] = []
  

  public quantityPerPage = 4;
  public selectedPage = 1;
  public firstPage = 1;
  public lastPage = 1;
  public category = 0
  public search: string = ''

  constructor(
    private keyService: KeyService,
    protected alertService: AlertService
  ) {}

  ngOnInit() {
    this.getKey()
    this.getCategories()
  }

  getKey(): void {
    let count: number = 0;
    this.keyService.getKeys(this.selectedPage, this.quantityPerPage, this.category, this.search)
      .subscribe(data => {
        this.keys = data!.data
        count = data!.count
        this.quantityPages = Math.ceil(count / this.quantityPerPage)
        this.groups = this.separar(this.pages, 5)
      })
  }

  getCategories(): void {
    this.keyService.getCategories()
      .subscribe(data => this.categories = data!)
  }

  delete(key: Key) {
    this.keyService.deleteKey(key.id!).subscribe(() => {
      let index = this.keys.findIndex(c => this.locator(c, key.id!));
      if (index > -1) {
        this.keys.splice(index, 1);
      }
      this.alertService.success('Sucesso: Categoria Excluída!', this.options)
    });
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
    this.getKey()
  }

  onChangeSize() {
    this.groupIndex = 0
    this.changePage(1);
  }

  onCategoryChange() {
    this.groupIndex = 0
    this.changePage(1);
  }

  onEnter() {
    this.changePage(1)
    this.getKey()
  }

  onEscape() {
    this.search = ''
    this.changePage(1)
    this.getKey()
  }
}
