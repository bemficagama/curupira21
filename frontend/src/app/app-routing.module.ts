import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from "./shared/home/home.component";
import { CategoryReadComponent } from "./category/category-read/category-read.component";
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { KeyReadComponent } from './key/key-read/key-read.component';
import { KeyUpdateComponent } from './key/key-update/key-update.component';
import { KeyCreateComponent } from './key/key-create/key-create.component';
import { BemvindoComponent } from "./shared/home/bemvindo/bemvindo.component";
import { AuthenticationComponent } from './shared/authentication/authentication.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AuthGuard } from './account/shared/auth.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UrlReadComponent } from './url/url-read/url-read.component';
import { UrlCreateComponent } from './url/url-create/url-create.component';
import { UrlUpdateComponent } from './url/url-update/url-update.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: BemvindoComponent },
      { path: 'category', component: CategoryReadComponent },
      { path: 'category/category-update/:id', component: CategoryUpdateComponent },
      { path: 'category/category-create', component: CategoryCreateComponent },
      { path: 'key', component: KeyReadComponent },
      { path: 'key/key-update/:id', component: KeyUpdateComponent },
      { path: 'key/key-create', component: KeyCreateComponent },
      { path: 'url', component: UrlReadComponent },
      { path: 'url/url-update/:id', component: UrlUpdateComponent },
      { path: 'url/url-create', component: UrlCreateComponent },
    ],
    canActivate: [AuthGuard]
  },

  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404' }
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
export class AppRoutingModule { }
