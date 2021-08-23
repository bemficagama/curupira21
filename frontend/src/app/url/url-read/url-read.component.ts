import { Component, OnInit } from '@angular/core';
import { Category } from '../../category/shared/category';
import { Url } from '../shared/url';
import { UrlService } from '../shared/url.service';
import { AlertService } from 'src/app/_alert';
import { Pagination } from 'src/app/shared/Pagination';

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
  mainCategories: Category[] = new Array<Category>()
  pagination: Pagination = new Pagination()
  public mainCategory = 0
  public search: string = ''

  constructor(
    private urlService: UrlService,
    protected alertService: AlertService,
  ) {

    this.urlService.getAll(this.pagination.current_page | 1, this.pagination.per_page | 4, this.mainCategory, this.search, '') //window.location.href
      .subscribe(data => {
        console.log(this.search)
        this.urls = data!.data
        this.pagination = {
          total: data.total, per_page: data.per_page, current_page: data.current_page,
          last_page: data.last_page, first_page_url: data.first_page_url, last_page_url: data.last_page_url,
          next_page_url: data.next_page_url, prev_page_url: data.prev_page_url, path: data.path, from: data.from,
          to: data.to, links: data.links
        }
      })

    this.getMains()
  }

  ngOnInit() {
  }

  getUrl(): void {
    let count: number = 0;
    this.urlService.getAll(this.pagination.current_page, this.pagination.per_page, this.mainCategory, this.search, '') //window.location.href
      .subscribe(data => {

        this.urls = data!.data
        this.pagination = {
          total: data.total, per_page: data.per_page, current_page: data.current_page,
          last_page: data.last_page, first_page_url: data.first_page_url, last_page_url: data.last_page_url,
          next_page_url: data.next_page_url, prev_page_url: data.prev_page_url, path: data.path, from: data.from,
          to: data.to, links: data.links
        }
      })
  }

  getMains(): void {
    this.urlService.getMains()
      .subscribe(data => this.mainCategories = data!)
  }

  delete(url: Category) {
    if (confirm("Confirma a deleção do registro? " + url.name)) {
      this.urlService.deleteUrl(url.id!).subscribe(() => {
        let index = this.urls.findIndex(c => this.locator(c, url.id!));
        if (index > -1) {
          this.urls.splice(index, 1);
        }
        this.alertService.success('Sucesso: Categoria Excluída!', this.options)
      })
    }
  }

  onEnter() {
    this.getUrl()
  }

  onEscape() {
    this.search = ''
    this.getUrl()
  }
}
