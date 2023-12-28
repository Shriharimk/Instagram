import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadComponent } from '../lazy-load.component';
import { ActualpageComponent } from 'src/app/actualpage/actualpage.component';
import { ProfileComponent } from 'src/app/profile/profile.component';

const routes: Routes = [{ path: '', component: LazyLoadComponent ,
children:[
  { path:'',component: ActualpageComponent,data: { animation: 'Profile' }},
  { path: 'profiles/:userId', component: ProfileComponent, data: { animation: 'Profile' } },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyLoadRoutingModule { }
