import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Pages
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { OpenOrdersComponent } from './pages/openorders/openorders.component';

// Components
import { OrderComponent } from './components/order/order.component';


// Services
import { AuthService } from './services/auth.service';
import { InitAuthGuardService } from './guards/init-auth-guard.service';
import { RequireUserGuardService } from './guards/require-user-guard.service';
import { RequireAnonGuardService } from './guards/require-anon-guard.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';

// Routes
const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [InitAuthGuardService] },
  { path: 'login', component: LoginPageComponent, canActivate: [RequireAnonGuardService] },
  { path: 'signup', component: SignupPageComponent, canActivate: [RequireAnonGuardService] },
  { path: 'suppliers', component: SuppliersComponent, canActivate: [InitAuthGuardService] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [InitAuthGuardService] },
  { path: 'openorders', component: OpenOrdersComponent, canActivate: [RequireUserGuardService] }
  // { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    SuppliersComponent,
    ProductDetailComponent,
    OpenOrdersComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, InitAuthGuardService, RequireUserGuardService, RequireAnonGuardService, ProductService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
