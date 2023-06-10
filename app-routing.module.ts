import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
    title: "Sasta.AI | Home",
  },
  {
    path: 'chatE1',
    loadChildren: () => import('./content-page/chat-gpt/chat-gpt.module').then(m => m.ChatGptModule),
    title: "Sasta.AI | Chat.E1",
  },
  {
    path: 'imageE1',
    loadChildren: () => import('./content-page/dell-e/dell-e.module').then(m => m.DellEModule),
    title: "Sasta.AI | Image.E1",
  },
  {
    path: 'latlongE1',
    loadChildren: () => import('./content-page/latlong/latlong.module').then(m => m.LatlongModule),
    title: "Sasta.AI | LatLong.E1",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
