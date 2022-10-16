import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    component: AuthComponent,
    path: ''
  },
  {
    component: HomeComponent,
    path: 'home',
    canActivate: [AuthGuard]
  },
  {
    component: DetailsComponent,
    path: 'details',
    canActivate: [AuthGuard]
  },
  {
    component: BookmarkComponent,
    path: 'bookmarks',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
