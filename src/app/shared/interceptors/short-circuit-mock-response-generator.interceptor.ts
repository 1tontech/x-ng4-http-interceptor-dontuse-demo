import { Response, ResponseOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  Interceptor,
  InterceptorResponseWrapper,
  InterceptorResponseWrapperBuilder
} from 'x-ng4-http-interceptor-dontuse';

@Injectable()
export class ShortCircuitMockResponseGenerator implements Interceptor {

  onShortCircuit(responseWrapper: InterceptorResponseWrapper, interceptorStep: number): Observable<InterceptorResponseWrapper> {
    const builder = InterceptorResponseWrapperBuilder.new(responseWrapper);
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
    builder.response(response);
    return Observable.of(builder.build());
  }

}
