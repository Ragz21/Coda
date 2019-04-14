import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ListDataComponent } from './list-data/list-data.component';

const routes: Routes = [
  { path : '', component : IndexComponent},
  { path : 'uses', component : ListDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
