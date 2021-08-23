import { Url } from "../shared/url";
import { Router, ActivatedRoute } from "@angular/router";
import { UrlService } from "../shared/url.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';
import { Category } from "src/app/category/shared/category";

@Component({
  selector: "app-url-create",
  templateUrl: "./url-create.component.html",
  styleUrls: ["./url-create.component.css"],
})
export class UrlCreateComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  url: Url = {}
  categories: Category[] = new Array<Category>()
  constructor(
    private urlService: UrlService,
    private router: Router,
    activeRoute: ActivatedRoute,
    protected alertService: AlertService) {

    this.urlService.getCategories().subscribe(data => {
      this.categories = data!
    })

  }

  ngOnInit(): void {
  }

  save(): void {
    this.urlService.save(this.url).subscribe(() => {
      this.router.navigate(["/url"]);
      this.alertService.success('Sucesso: Chave Criada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/url"]);
  }
}
