import { Category } from "../shared/category";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from "../shared/category.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';

@Component({
  selector: "app-category-update",
  templateUrl: "./category-update.component.html",
  styleUrls: ["./category-update.component.css"],
})
export class CategoryUpdateComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  category: Category = {};

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    protected alertService: AlertService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id")!;
    this.categoryService.readById(id).subscribe(category => {
      this.category = category!
    });
  }

  save(): void {
    this.categoryService.update(this.category).subscribe(() => {
      this.router.navigate(["/category"]);
      this.alertService.success('Sucesso: Categoria Atualizada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/category"]);
  }
}
