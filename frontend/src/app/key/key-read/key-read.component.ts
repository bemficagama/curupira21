import { Component, OnInit } from '@angular/core';
import { Category } from '../../category/shared/category';
import { Key } from '../shared/key'; 
import { KeyService } from '../shared/key.service';
import { AlertService } from 'src/app/_alert';
import { Pagination } from 'src/app/shared/Pagination';

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

  categories: Key[] = new Array<Key>()
  mainCategories: Category[] = new Array<Category>()
  pagination: Pagination = new Pagination()
  public mainCategory = 0
  public search: string = ''

  constructor(
    private KeyService: KeyService,
    protected alertService: AlertService,
  ) {

    this.KeyService.getAll(this.pagination.current_page | 1, this.pagination.per_page | 4, this.mainCategory, this.search, '') //window.location.href
      .subscribe(data => {
        this.categories = data!.data
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

  getKey(): void {
    let count: number = 0;
    this.KeyService.getAll(this.pagination.current_page, this.pagination.per_page, this.mainCategory, this.search, '') //window.location.href
      .subscribe(data => {

        this.categories = data!.data
        this.pagination = {
          total: data.total, per_page: data.per_page, current_page: data.current_page,
          last_page: data.last_page, first_page_url: data.first_page_url, last_page_url: data.last_page_url,
          next_page_url: data.next_page_url, prev_page_url: data.prev_page_url, path: data.path, from: data.from,
          to: data.to, links: data.links
        }
      })
  }

  getMains(): void {
    this.KeyService.getMains()
      .subscribe(data => this.mainCategories = data!)
  }

  delete(key: Category) {
    if (confirm("Confirma a deleção do registro? " + key.name)) {
      this.KeyService.deleteKey(key.id!).subscribe(() => {
        let index = this.categories.findIndex(c => this.locator(c, key.id!));
        if (index > -1) {
          this.categories.splice(index, 1);
        }
        this.alertService.success('Sucesso: Categoria Excluída!', this.options)
      })
    }
  }

  onEnter() {
    this.getKey()
  }

  onEscape() {
    this.search = ''
    this.getKey()
  }
}
