import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { CategoriesComponent } from "./Components/categories/categories.component";
import { HomeComponent } from "./Components/home/home.component";
import { LoginComponent } from "./Components/login/login.component";
import { MallComponent } from "./Components/mall/mall.component";
import { NewMallComponent } from "./Components/new-mall/new-mall.component";
import { NewProductComponent } from "./Components/new-product/new-product.component";
import { NewStoreComponent } from "./Components/new-store/new-store.component";
import { NewUserComponent } from "./Components/newUser/newUser.component";
import { NotFoundComponent } from "./Components/not-found/not-found.component";
import { OrdersComponent } from "./Components/orders/orders.component";
import { ProductsComponent } from "./Components/products/products.component";
import { RegisterComponent } from "./Components/register/register.component";
import { ReportDetailComponent } from "./Components/reportDetail/reportDetail.component";
import { ReportsComponent } from "./Components/reports/reports.component";
import { TiendasComponent } from "./Components/tiendas/tiendas.component";
import { UserReportsComponent } from "./Components/userReports/userReports.component";
import { UsersComponent } from "./Components/users/users.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "users",
    component: UsersComponent,
  },
  {
    path: "reports",
    component: ReportsComponent,
  },
  {
    path: "reportDetail/:id",
    component: ReportDetailComponent,
  },
  {
    path: "addUser",
    component: NewUserComponent,
  },
  {
    path: "userReports/:id",
    component: UserReportsComponent,
  },
  {
    path: "categories",
    component: CategoriesComponent,
  },
  {
    path: "tiendas",
    component: TiendasComponent,
  },
  {
    path: "products",
    component: ProductsComponent,
  },
  {
    path: "orders",
    component: OrdersComponent,
  },
  {
    path: "mall",
    component: MallComponent,
  },
  {
    path: "newStore",
    component: NewStoreComponent,
  },
  {
    path: "newProduct",
    component: NewProductComponent,
  },
  {
    path: "newMall",
    component: NewMallComponent,
  },

  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SweetAlert2Module.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
