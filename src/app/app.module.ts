import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CountBoxComponent } from "./Components/countBox/countBox.component";
import { HomeComponent } from "./Components/home/home.component";
import { LoginComponent } from "./Components/login/login.component";
import { RegisterComponent } from "./Components/register/register.component";
import { TablaComponent } from "./Components/tabla/tabla.component";
import { UserFormComponent } from "./Components/userForm/userForm.component";
import { HttpClientModule } from "@angular/common/http";
import { UsersComponent } from "./Components/users/users.component";
import { ReportsComponent } from "./Components/reports/reports.component";
import { NewUserComponent } from "./Components/newUser/newUser.component";
import { NotFoundComponent } from "./Components/not-found/not-found.component";
import { UserReportsComponent } from "./Components/userReports/userReports.component";

import { ReportDetailComponent } from "./Components/reportDetail/reportDetail.component";
import { TiendasComponent } from "./Components/tiendas/tiendas.component";
import { CategoriesComponent } from "./Components/categories/categories.component";
import { MallComponent } from "./Components/mall/mall.component";
import { OrdersComponent } from "./Components/orders/orders.component";
import { ProductsComponent } from "./Components/products/products.component";
import { NewStoreComponent } from './Components/new-store/new-store.component';
import { NewMallComponent } from './Components/new-mall/new-mall.component';
import { NewProductComponent } from './Components/new-product/new-product.component';
import { EditMallComponent } from './Components/edit-mall/edit-mall.component';
import { EditTiendaComponent } from './Components/edit-tienda/edit-tienda.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
@NgModule({
  declarations: [
    AppComponent,
    TiendasComponent,
    LoginComponent,
    RegisterComponent,
    TablaComponent,
    CountBoxComponent,
    UserFormComponent,
    HomeComponent,
    UsersComponent,
    CategoriesComponent,
    ReportsComponent,
    NewUserComponent,
    NotFoundComponent,
    UserReportsComponent,
    ReportDetailComponent,
    CategoriesComponent,
    MallComponent,
    OrdersComponent,
    ProductsComponent,
    NewStoreComponent,
    NewMallComponent,
    NewProductComponent,
    EditMallComponent,
    EditTiendaComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
