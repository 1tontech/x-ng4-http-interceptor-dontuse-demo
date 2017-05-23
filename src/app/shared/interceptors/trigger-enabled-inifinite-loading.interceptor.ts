import { Scheduler } from 'rxjs/Scheduler';
import { Subscription } from 'rxjs/Rx';
import { Request, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import {
  Interceptor,
  InterceptorRequest,
  InterceptorRequestOptionsArgs,
  InterceptorResponseWrapper
} from 'x-ng4-http-interceptor-dontuse';

import { ProgressBarService } from '../progress-bar.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class TriggerEnabledInfiniteLoopingInterceptor implements Interceptor {

  static complete = false;

  constructor() {
  }

  beforeRequest(request: InterceptorRequest, interceptorStep: number): void | Observable<InterceptorRequest> {
    if (request.sharedData['indefiniteLoad']) {
      TriggerEnabledInfiniteLoopingInterceptor.complete = false;
      return this.loop(request);
    }
  }

  loop(request: InterceptorRequest): Observable<InterceptorRequest> {
    return Observable.create(subscriber => {
      const subscription: Subscription = Observable.of(request).delay(1000000000000000000).subscribe();
      setTimeout(() => {
        console.log('Checking if the request is asked to be completed');
        if (TriggerEnabledInfiniteLoopingInterceptor.complete) {
          console.log('Completing the request');
          subscription.unsubscribe();
        }
      }, 100);
    });
  }

}
