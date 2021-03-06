import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {HomeComponent} from './home/home.component';
import {BaseInterceptorService} from './shared/interceptor/base-interceptor.service';
import { DictCatalogComponent } from './module/system/dictionay/dict-catalog/dict-catalog.component';
import { DictItemComponent } from './module/system/dictionay/dict-item/dict-item.component';
import { RoleComponent } from './module/system/role/role.component';
import { UserComponent } from './module/system/user/user.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DictCatalogComponent,
    DictItemComponent,
    RoleComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, {provide: HTTP_INTERCEPTORS, useClass: BaseInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
