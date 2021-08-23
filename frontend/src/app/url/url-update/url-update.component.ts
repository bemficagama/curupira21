import { Url } from "../shared/url";
import { Router, ActivatedRoute } from "@angular/router";
import { UrlService } from "../shared/url.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';
import { Category } from "src/app/category/shared/category";

@Component({
  selector: "app-url-update",
  templateUrl: "./url-update.component.html",
  styleUrls: ["./url-update.component.css"],
})
export class UrlUpdateComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  url: Url = {};
  categories: Category[] = new Array<Category>()

  constructor(
    private urlService: UrlService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    protected alertService: AlertService) {
    activeRoute.params.subscribe(params => {
      const id = params["id"];
      if (id != null) {
        this.urlService.getCategories().subscribe(categories => {
          this.urlService.readById(id).subscribe(url => {
            this.url = url!
            this.categories = categories!
          });
        })

      }
    })
  }

  ngOnInit(): void {
  }

  save(): void {
    this.urlService.update(this.url).subscribe(() => {
      this.router.navigate(["/url"]);
      this.alertService.success('Sucesso: Categoria Atualizada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/url"]);
  }
}
