import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: 'items', component: ItemsListComponent },{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
