import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Movie } from './movie.model';

@Injectable()
export class FilteredMoviesResolver implements Resolve<Movie[]> {

  constructor(private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[]> {
    return this.http.get('/app/movies/?year=^195').map(response => response.json().data as Movie[]);
  }

}
