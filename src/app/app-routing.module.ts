import { NgModule } from '@angular/core';
import { MainComponent } from './page/main/main.component';
import { LandingComponent } from './components/landing/landing.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main' , component: MainComponent },
  { path: 'user' , component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
