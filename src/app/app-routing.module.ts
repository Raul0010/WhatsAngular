import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const approutes: Routes = [
  {path: 'customers', loadChildren: './customers/customers.module#CustomersModule'},
  {path: 'home', loadChildren: './Home/home.module#HomeModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
