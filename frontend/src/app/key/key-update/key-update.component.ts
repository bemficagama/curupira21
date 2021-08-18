import { Key } from "../shared/key";
import { Router, ActivatedRoute } from "@angular/router";
import { KeyService } from "../shared/key.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';
import { Category } from "src/app/category/shared/category";

@Component({
  selector: "app-key-update",
  templateUrl: "./key-update.component.html",
  styleUrls: ["./key-update.component.css"],
})
export class KeyUpdateComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  key: Key = {};
  categories: Category[] = new Array<Category>()

  constructor(
    private keyService: KeyService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    protected alertService: AlertService) {
    activeRoute.params.subscribe(params => {
      const id = params["id"];
      if (id != null) {
        this.keyService.getCategories().subscribe(categories => {
          this.keyService.readById(id).subscribe(key => {
            this.key = key!
            this.categories = categories!
          });
        })

      }
    })
  }

  ngOnInit(): void {
  }

  save(): void {
    this.keyService.update(this.key).subscribe(() => {
      this.router.navigate(["/key"]);
      this.alertService.success('Sucesso: Categoria Atualizada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/key"]);
  }
}
