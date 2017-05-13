import { Injectable } from '@angular/core';

import {
  Interceptor,
  InterceptorRequest,
  InterceptorRequestBuilder
} from 'x-ng4-http-interceptor-dontuse';

@Injectable()
export class ShortCircuitTriggerHttpInterceptor implements Interceptor {

  beforeRequest(request: InterceptorRequest, interceptorStep: number): InterceptorRequest | void {
    if (request.sharedData['short-circuit']) {
      const builder = InterceptorRequestBuilder.new(request)
        .shortCircuitAtCurrentStep(true);
      if (request.sharedData['complete']) {
        builder.alsoForceRequestCompletion(true);
      }
      return builder.build();
    }
  }

}
