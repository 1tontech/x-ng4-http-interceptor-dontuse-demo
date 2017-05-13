import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Movie } from '../shared/movie.model';

@Component({
  selector: 'app-routing-with-resolve',
  templateUrl: './routing-with-resolve.component.html',
  styleUrls: ['./routing-with-resolve.component.scss']
})
export class RoutingWithResolveComponent implements OnInit {

  movies: Movie[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.movies = data['movies'];
    });
  }

}
