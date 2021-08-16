import { Category } from "../../category/shared/category";
import { Key } from "../shared/key";
import { Router, ActivatedRoute } from "@angular/router";
import { KeyService } from "../shared/key.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';

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
  mainCategories: Category[] = new Array<Category>()
  public mainCategory: number = 0

  constructor(
    private KeyService: KeyService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    protected alertService: AlertService) {
    activeRoute.params.subscribe(params => {
      let id = params["id"];
      if (id != null) {
        this.KeyService.getMains().subscribe(data => {
          this.mainCategories = data!
          this.KeyService.readById(id).subscribe(key => {
            this.key = key!
            //this.mainCategory = Number(key.parent_id)
          });
        })

      }
    })
  }

  ngOnInit(): void { }

  save(): void {
    //if (JSON.stringify(this.key.parent_id) == "") this.key.parent_id = null
    //console.log(JSON.stringify(this.key.parent_id))

    this.KeyService.update(this.key).subscribe(() => {
      this.router.navigate(["/key"]);
      this.alertService.success('Sucesso: Categoria Atualizada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/key"]);
  }

  onMainChange($event: any) {
    this.mainCategory = Number($event.value)
    //this.key.parent_id = this.mainCategory
  }
}
