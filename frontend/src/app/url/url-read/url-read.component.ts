import { Component, OnInit } from '@angular/core';

import { Url } from '../shared/url';
import { UrlService } from '../shared/url.service';
import { AlertService } from 'src/app/_alert';
import { Category } from 'src/app/category/shared/category';

@Component({
  selector: 'app-url-read',
  templateUrl: './url-read.component.html',
  providers: [UrlService],
  styleUrls: ['./url-read.component.css']
})
export class UrlReadComponent implements OnInit {

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  private locator = (c: Url, id: number) => c.id == id;

  urls: Url[] = new Array<Url>()
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
    private urlService: UrlService,
    protected alertService: AlertService
  ) {}

  ngOnInit() {
    this.getUrl()
    this.getCategories()
  }

  getUrl(): void {
    let count: number = 0;
    this.urlService.getUrls(this.selectedPage, this.quantityPerPage, this.category, this.search)
      .subscribe(data => {
        this.urls = data!.data
        count = data!.count
        this.quantityPages = Math.ceil(count / this.quantityPerPage)
        this.groups = this.separar(this.pages, 5)
      })
  }

  getCategories(): void {
    this.urlService.getCategories()
      .subscribe(data => this.categories = data!)
  }

  delete(url: Url) {
    this.urlService.deleteUrl(url.id!).subscribe(() => {
      let index = this.urls.findIndex(c => this.locator(c, url.id!));
      if (index > -1) {
        this.urls.splice(index, 1);
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
    this.getUrl()
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
    this.getUrl()
  }

  onEscape() {
    this.search = ''
    this.changePage(1)
    this.getUrl()
  }
}
