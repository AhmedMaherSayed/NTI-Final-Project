import { SingleUserComponent } from './pages/single-user/single-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { LoginComponent } from './pages/login/login.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { AddProductComponent } from './pages/add-product/add-product.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"products", component:ProductsComponent},
  {path:"singleProduct/:productId", component:SingleProductComponent},
  {path:"register", component:RegisterComponent },
  {path:"login", component:LoginComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"single-user/:userId", component:SingleUserComponent},

  {path:"edit-user", component:EditUserComponent},
  {
    path: 'product',
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'add',
        component: AddProductComponent,
      },
      {
        path: ':id',
        component: SingleProductComponent,
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
