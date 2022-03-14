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
