import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from "./layout/home/home.component";
import { CategoryReadComponent } from "./category/category-read/category-read.component";
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { BemvindoComponent } from "./layout/home/bemvindo/bemvindo.component";
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AuthGuard } from './account/shared/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: BemvindoComponent },
      { path: 'category', component: CategoryReadComponent},
      { path: 'category/category-update/:id', component: CategoryUpdateComponent},
      { path: 'category/category-create', component: CategoryCreateComponent}
    ],
    canActivate: [AuthGuard]
  },

  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent},
      { path: 'create-account', component: CreateAccountComponent}
    ]
  }
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
