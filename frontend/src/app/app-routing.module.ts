import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CategoryReadComponent } from "./category/category-read/category-read.component";
import { KeyComponent } from './key/key.component';
import { UrlComponent } from './url/url.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },

  {
    path: "category",
    component: CategoryReadComponent
  },

  {
    path: "key",
    component: KeyComponent
  },

  {
    path: "url",
    component: UrlComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
