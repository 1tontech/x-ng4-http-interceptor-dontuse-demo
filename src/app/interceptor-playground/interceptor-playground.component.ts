import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';

import { InterceptorPlaygroundService } from '../shared/interceptor-playground.service';
import { Movie } from '../shared/movie.model';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

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
  unsubscribeFlow: boolean;

  error: any;
  unsubscribeSimulationInprogress = false;
  private pendingSubscription: Subscription;

  constructor(private service: InterceptorPlaygroundService, private snackBar: MdSnackBar) { }

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

  switchToUnsubscribe() {
    this.reset();
    this.unsubscribeFlow = true;
  }

  onSimulateLongRequest() {
    this.unsubscribeSimulationInprogress = true;
    this.pendingSubscription = this.service.simulateLongRequest()
      .subscribe(_ => {
        throw new Error('Should not be called');
      },
      err => {
        throw new Error('Should not be called');
      },
      () => {
        throw new Error('Should not be called');
      });
  }

  onCancelRequest() {
    let config = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open('Progress bar should have been stopped', null, config);
    this.pendingSubscription.unsubscribe();
    this.unsubscribeSimulationInprogress = false;
  }

  reset(): void {
    this.movies = undefined;
    this.showAllMovies = undefined;
    this.retryFailure = undefined;
    this.shortCircuitedNoResponse = undefined;
    this.shortCircuitedWithMockResponse = undefined;
    this.errorUnhandled = undefined;
    this.errorHandledWithMockResponse = undefined;
    this.unsubscribeFlow = undefined;
    this.error = undefined;
  }

}
