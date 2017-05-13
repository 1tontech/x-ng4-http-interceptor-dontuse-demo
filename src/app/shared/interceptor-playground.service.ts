import { Component, Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { InterceptorRequestOptionsArgs, InterceptorService } from 'x-ng4-http-interceptor-dontuse';

import { Movie } from './movie.model';


@Injectable()
export class InterceptorPlaygroundService {

  constructor(private interceptorService: InterceptorService) { }

  load(): Observable<Movie[]> {
    return this.interceptorService.get('/app/movies')
      .map(response => response.json().data as Movie[]);
  }

  retryAndFail(): Observable<Movie[]> {
    const options = {
      sharedData: {
        'retry-once': true
      }
    } as InterceptorRequestOptionsArgs;
    return this.interceptorService.get('/app/non-existant-retry', options)
      .map(response => response.json().data as Movie[]);
  }

  shortCircuitWithNoResponse(): Observable<Movie[]> {
    const options = {
      sharedData: {
        'short-circuit': true,
        'complete': true
      }
    } as InterceptorRequestOptionsArgs;
    return this.interceptorService.get('/app/users', options)
      .map(response => response.json().data as Movie[]);
  }

  shortCircuitAndGetMockResponse(): Observable<Movie[]> {
    const options = {
      sharedData: {
        'short-circuit': true,
        'complete': false
      }
    } as InterceptorRequestOptionsArgs;
    return this.interceptorService.get('/app/users', options)
      .map(response => response.json().data as Movie[]);
  }

  simulateError(): Observable<Movie[]> {
    const options = {
      sharedData: {
        'error': true,
        'cascade': true
      }
    } as InterceptorRequestOptionsArgs;
    return this.interceptorService.get('/app/non-existant', options)
      .map(response => response.json().data as Movie[]);
  }

  simulateErrorAndGetMockResponse(): Observable<Movie[]> {
    const options = {
      sharedData: {
        'error': true,
        'cascade': false
      }
    } as InterceptorRequestOptionsArgs;
    return this.interceptorService.get('/app/non-existant', options)
      .map(response => response.json().data as Movie[]);
  }

}
