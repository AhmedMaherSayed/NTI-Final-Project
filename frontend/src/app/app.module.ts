import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { ProductsComponent } from './pages/products/products.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddCategoryAdminComponent } from './components/add-category-admin/add-category-admin.component';
import { ShowCategoriesAdminComponent } from './components/show-categories-admin/show-categories-admin.component';
import { ShowProductsAdminComponent } from './components/show-products-admin/show-products-admin.component';
import { ShowUsersAdminComponent } from './components/show-users-admin/show-users-admin.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { SingleUserComponent } from './pages/single-user/single-user.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ProductsComponent,
    SingleProductComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EditUserComponent,
    AddProductComponent,
    AddCategoryAdminComponent,
    ShowCategoriesAdminComponent,
    ShowProductsAdminComponent,
    ShowUsersAdminComponent,
    AddUserComponent,
    SingleUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
