import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { ShopComponent } from './components/shop/shop.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ListProduitComponent } from './components/produit/list-produit/list-produit.component';
import { CreateProductComponent } from './components/produit/create-product/create-product.component';
import { DashboardLayoutComponent } from './components/produit/dashboard-layout/dashboard-layout.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'item', component: ItemComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'produits', component: ListProduitComponent },
      { path: 'addproduit', component: CreateProductComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
