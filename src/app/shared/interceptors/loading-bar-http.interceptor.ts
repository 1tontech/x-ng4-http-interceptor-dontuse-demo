import { Injectable } from '@angular/core';
import { Interceptor, InterceptorRequest, InterceptorResponseWrapper } from 'x-ng4-http-interceptor-dontuse';

import { ProgressBarService } from '../progress-bar.service';

@Injectable()
export class LoadingBarHttpInterceptor implements Interceptor {

  constructor(private progressBarService: ProgressBarService) {
  }

  beforeRequest(request: InterceptorRequest, interceptorStep: number): void {
    this.progressBarService.start();
  }

  onResponse(responseWrapper: InterceptorResponseWrapper, interceptorStep: number): void {
    this.progressBarService.done();
  }

  onShortCircuit(responseWrapper: InterceptorResponseWrapper, interceptorStep: number): void {
    this.progressBarService.done();
  }

  onErr(responseWrapper: InterceptorResponseWrapper, interceptorStep: number): void {
    this.progressBarService.done();
  }

  onForceCompleteOrForceReturn(response: InterceptorResponseWrapper, interceptorStep: number): void {
    this.progressBarService.done();
  }

}
