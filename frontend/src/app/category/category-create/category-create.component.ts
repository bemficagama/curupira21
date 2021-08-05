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
  mainCategories: Category[] = new Array<Category>()
  public mainCategory: number = 0

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    activeRoute: ActivatedRoute,
    protected alertService: AlertService) {

    this.categoryService.getMains().subscribe(data => {
      this.mainCategories = data!
    })

  }

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

  onMainChange($event: any) {
    this.mainCategory = Number($event.value)
    this.category.parentId = this.mainCategory
  }
}
