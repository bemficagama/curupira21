import { Key } from "../shared/key";
import { Router, ActivatedRoute } from "@angular/router";
import { KeyService } from "../shared/key.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';
import { Category } from "src/app/category/shared/category";

@Component({
  selector: "app-key-create",
  templateUrl: "./key-create.component.html",
  styleUrls: ["./key-create.component.css"],
})
export class KeyCreateComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  key: Key = {}
  categories: Category[] = new Array<Category>()
  constructor(
    private keyService: KeyService,
    private router: Router,
    activeRoute: ActivatedRoute,
    protected alertService: AlertService) {

    this.keyService.getCategories().subscribe(data => {
      this.categories = data!
    })

  }

  ngOnInit(): void {
  }

  save(): void {
    this.keyService.save(this.key).subscribe(() => {
      this.router.navigate(["/key"]);
      this.alertService.success('Sucesso: Chave Criada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/key"]);
  }
}
