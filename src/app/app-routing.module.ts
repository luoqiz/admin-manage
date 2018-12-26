import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {HomeComponent} from './home/home.component';
import {RoleComponent} from './module/system/role/role.component';
import {DictItemComponent} from './module/system/dictionay/dict-item/dict-item.component';
import {DictCatalogComponent} from './module/system/dictionay/dict-catalog/dict-catalog.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'dictionay/catalog', component: DictCatalogComponent},
      {path: 'dictionay/item', component: DictItemComponent},
      {path: 'role', component: RoleComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
