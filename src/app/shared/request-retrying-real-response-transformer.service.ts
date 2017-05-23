import { Injectable } from '@angular/core';
import { Headers, Request, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

import {
  HttpDirect,
  Interceptor,
  InterceptorRequest,
  InterceptorResponseWrapper,
  InterceptorResponseWrapperBuilder,
  InterceptorService,
  RealResponseObservableTransformer
} from 'x-ng4-http-interceptor-dontuse';

@Injectable()
export class RequestRetryingRealResponseTransformer implements RealResponseObservableTransformer {

  transform(response$: Observable<Response>, request: InterceptorRequest,
    http: HttpDirect, interceptorService: InterceptorService): Observable<Response> {
    return response$.catch(response => {
      const url: string = request.url instanceof Request ? (request.url as Request).url : request.url as string;
      if (response.status === 404 && request.sharedData['retry-once']) {
        console.log('Will be retied once and fail again');
        return response$;
      }
      return Observable.throw(response);
    });
  }

}
