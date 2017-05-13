import { NgModule } from '@angular/core';
import { componentModuleUrl } from '@angular/compiler';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FilteredMoviesResolver } from './shared/filtered-users.resolver';
import { InterceptorPlaygroundComponent } from './interceptor-playground/interceptor-playground.component';
import { RouteChangeComponent } from './route-change/route-change.component';
import { RoutingWithResolveComponent } from './routing-with-resolve/routing-with-resolve.component';

const routes: Routes = [
  {
    path: 'home',
    component: InterceptorPlaygroundComponent
  },
  {
    path: 'route-change',
    component: RouteChangeComponent
  }, {
    path: 'routing-with-resolve',
    component: RoutingWithResolveComponent,
    resolve: {
      movies: FilteredMoviesResolver
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRouting {
}
