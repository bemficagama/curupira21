import { Category } from "../shared/category";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from "../shared/category.service";
import { Component, OnInit} from "@angular/core";

@Component({
  selector: "app-category-update",
  templateUrl: "./category-update.component.html",
  styleUrls: ["./category-update.component.css"],
})
export class CategoryUpdateComponent implements OnInit {
  category: Category = {id: 9999, name: "andre", description: "tetetetete" };

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id")!;
    this.categoryService.readById(id).subscribe(category => {
      this.category = category!
    });
  }

  updateCategory(): void {
    this.categoryService.update(this.category).subscribe(() => {
      //this.categoryService.showMessage("Produto atualizado com sucesso!");
      this.router.navigate(["/category"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/category"]);
  }
}
