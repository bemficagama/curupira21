import { Category } from "../shared/category";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from "../shared/category.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';

@Component({
  selector: "app-category-create",
  templateUrl: "./category-create.component.html",
  styleUrls: ["./category-create.component.css"],
})
export class CategoryCreateComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  category: Category = {}

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    protected alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    this.categoryService.save(this.category).subscribe(() => {
      this.router.navigate(["/category"]);
      this.alertService.success('Sucesso: Categoria Criada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/category"]);
  }
}
