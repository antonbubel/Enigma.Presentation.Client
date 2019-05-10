import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '@components/home/home.component';
import { HowItWorksComponent } from '@components/how-it-works/how-it-works.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'home', component: HomeComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
  ])],
  exports: [RouterModule]
})
export class RoutingModule { }
