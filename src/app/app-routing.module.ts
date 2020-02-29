import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate: [LoginGuard]
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule),  canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule),  canActivate: [AuthGuard]
  },
  {
    path: 'apartment',
    loadChildren: () => import('./pages/apartment/apartment.module').then( m => m.ApartmentPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'geo',
    loadChildren: () => import('./pages/geo/geo.module').then( m => m.GeoPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'epldetails',
    loadChildren: () => import('./pages/epldetails/epldetails.module').then( m => m.EpldetailsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'epldetails/:id',
    loadChildren: () => import('./pages/epldetails/epldetails.module').then( m => m.EpldetailsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'geomaps',
    loadChildren: () => import('./pages/geomaps/geomaps.module').then( m => m.GeomapsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'galery',
    loadChildren: () => import('./pages/galery/galery.module').then( m => m.GaleryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
