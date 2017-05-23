import { Response, ResponseOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import {
  Interceptor,
  InterceptorResponseWrapper,
  InterceptorResponseWrapperBuilder
} from 'x-ng4-http-interceptor-dontuse';

@Injectable()
export class ErrorMockResponseGenerator implements Interceptor {

  onErr(responseWrapper: InterceptorResponseWrapper, interceptorStep: number): InterceptorResponseWrapper | void {
    if (responseWrapper.sharedData['error'] &&
      responseWrapper.sharedData['cascade'] !== undefined &&
      !responseWrapper.sharedData['cascade']) {
      console.log('Handling error', responseWrapper.sharedData['error']);
      const response = new Response(new ResponseOptions({
        body: JSON.stringify({
          data: [{
            id: 1,
            name: 'Mock movie',
            year: 3000,
            documentary: false
          }]
        })
      }));
      return InterceptorResponseWrapperBuilder.new(response).build();
    }
  }

}
