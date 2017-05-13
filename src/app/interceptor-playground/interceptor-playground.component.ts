import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';

import { InterceptorPlaygroundService } from '../shared/interceptor-playground.service';
import { Movie } from '../shared/movie.model';

@Component({
  templateUrl: './interceptor-playground.component.html'
})
export class InterceptorPlaygroundComponent {

  movies: Movie[];
  showAllMovies: boolean;
  retryFailure: boolean;
  shortCircuitedNoResponse: boolean;
  shortCircuitedWithMockResponse: boolean;
  errorUnhandled: boolean;
  errorHandledWithMockResponse: boolean;

  error: any;

  constructor(private service: InterceptorPlaygroundService) { }

  load() {
    this.service.load().subscribe(movies => {
      this.reset();
      this.showAllMovies = true;
      this.movies = movies;
    }, err => {
      throw new Error('Should not be called');
    });
  }

  retryAndFail() {
    this.service.retryAndFail().subscribe(movies => {
      throw new Error('Should not be called');
    }, err => {
      this.reset();
      this.retryFailure = true;
      this.error = err;
    });
  }

  shortCircuitWithNoResponse() {
    this.service.shortCircuitWithNoResponse()
      .subscribe(movies => {
        throw new Error('Should not be called');
      },
      err => {
        throw new Error('Should not be called');
      }, () => {
        this.reset();
        this.shortCircuitedNoResponse = true;
      });
  }

  shortCircuitAndGetMockResponse() {
    this.service.shortCircuitAndGetMockResponse()
      .subscribe(movies => {
        this.reset();
        this.shortCircuitedWithMockResponse = true;
        this.movies = movies;
      },
      err => {
        throw new Error('Should not be called');
      });
  }

  simulateError() {
    this.service.simulateError()
      .subscribe(movies => {
        throw new Error('Should not be called');
      },
      err => {
        this.reset();
        this.errorUnhandled = true;
        this.error = err;
      });
  }

  simulateErrorAndGetMockResponse() {
    this.service.simulateErrorAndGetMockResponse()
      .subscribe(movies => {
        this.reset();
        this.errorHandledWithMockResponse = true;
        this.movies = movies;
      },
      err => {
        throw new Error('Should not be called');
      });
  }

  reset(): void {
    this.movies = undefined;
    this.showAllMovies = undefined;
    this.retryFailure = undefined;
    this.shortCircuitedNoResponse = undefined;
    this.shortCircuitedWithMockResponse = undefined;
    this.errorUnhandled = undefined;
    this.errorHandledWithMockResponse = undefined;
    this.error = undefined;
  }

}
