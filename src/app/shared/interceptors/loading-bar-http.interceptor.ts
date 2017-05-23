import { TriggerEnabledInfiniteLoopingInterceptor } from './trigger-enabled-inifinite-loading.interceptor';
import { Request, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import {
  Interceptor,
  InterceptorRequest,
  InterceptorRequestOptionsArgs,
  InterceptorResponseWrapper
} from 'x-ng4-http-interceptor-dontuse';

import { ProgressBarService } from '../progress-bar.service';

@Injectable()
export class LoadingBarHttpInterceptor implements Interceptor {

  constructor(private progressBarService: ProgressBarService) {
  }

  beforeRequest(request: InterceptorRequest, interceptorStep: number): void {
    console.log('Requesting to start progress bar');
    this.progressBarService.start();
  }

  onResponse(responseWrapper: InterceptorResponseWrapper, interceptorStep: number): void {
    console.log('Requesting to stop progress bar on response');
    this.progressBarService.done();
  }

  onShortCircuit(responseWrapper: InterceptorResponseWrapper, interceptorStep: number): void {
    console.log('Requesting to stop progress bar on shortcircuit');
    this.progressBarService.done();
  }

  onErr(responseWrapper: InterceptorResponseWrapper, interceptorStep: number): void {
    console.log('Requesting to stop progress bar on err');
    this.progressBarService.done();
  }

  onForceCompleteOrForceReturn(response: InterceptorResponseWrapper, interceptorStep: number): void {
    console.log('Requesting to stop progress bar on force completion');
    this.progressBarService.done();
  }

  onUnsubscribe(interceptorStep: number, url: string | Request, options?: RequestOptionsArgs | InterceptorRequestOptionsArgs) {
    console.log('Requesting to stop progress bar on unsubscribe');
    this.progressBarService.done();
    TriggerEnabledInfiniteLoopingInterceptor.complete = true;
  }

}
