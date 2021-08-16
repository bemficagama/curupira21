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
  mainCategories: Category[] = new Array<Category>()
  public mainCategory: number = 0

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    protected alertService: AlertService) {
    activeRoute.params.subscribe(params => {
      let id = params["id"];
      if (id != null) {
        this.categoryService.getMains().subscribe(data => {
          this.mainCategories = data!
          this.categoryService.readById(id).subscribe(category => {
            this.category = category!
            this.mainCategory = Number(category.parent_id)
          });
        })

      }
    })
  }

  ngOnInit(): void { }

  save(): void {
    if (JSON.stringify(this.category.parent_id) == "") this.category.parent_id = null
    console.log(JSON.stringify(this.category.parent_id))

    this.categoryService.update(this.category).subscribe(() => {
      this.router.navigate(["/category"]);
      this.alertService.success('Sucesso: Categoria Atualizada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/category"]);
  }

  onMainChange($event: any) {
    this.mainCategory = Number($event.value)
    this.category.parent_id = this.mainCategory
  }
}
