import {
  TriggerEnabledInfiniteLoopingInterceptor
} from './shared/interceptors/trigger-enabled-inifinite-loading.interceptor';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';
import { NgProgressModule, NgProgressService } from 'ngx-progressbar';
import { InterceptorService } from 'x-ng4-http-interceptor-dontuse';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { FilteredMoviesResolver } from './shared/filtered-users.resolver';
import { InterceptorPlaygroundComponent } from './interceptor-playground/interceptor-playground.component';
import { InMemHeroService } from './shared/in-memory.service';
import { ErrorMockResponseGenerator } from './shared/interceptors/error-mock-response-generator.interceptor';
import { LoadingBarHttpInterceptor } from './shared/interceptors/loading-bar-http.interceptor';
import { InterceptorPlaygroundService } from './shared/interceptor-playground.service';
import { ShortCircuitMockResponseGenerator } from './shared/interceptors/short-circuit-mock-response-generator.interceptor';
import { ShortCircuitTriggerHttpInterceptor } from './shared/interceptors/short-circuit-trigger.interceptor';
import { ProgressBarService } from './shared/progress-bar.service';
import { RequestRetryingRealResponseTransformer } from './shared/request-retrying-real-response-transformer.service';
import { RouteChangeComponent } from './route-change/route-change.component';
import { RoutingWithResolveComponent } from './routing-with-resolve/routing-with-resolve.component';

export function interceptorFactory(xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  loadingBarHttpInterceptor: LoadingBarHttpInterceptor) {
  const service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(loadingBarHttpInterceptor);
  service.addInterceptor(new ErrorMockResponseGenerator());
  service.addInterceptor(new ShortCircuitMockResponseGenerator());
  service.addInterceptor(new ShortCircuitTriggerHttpInterceptor());
  service.addInterceptor(new TriggerEnabledInfiniteLoopingInterceptor());
  service.realResponseObservableTransformer = new RequestRetryingRealResponseTransformer();
  return service;
}

@NgModule({
  declarations: [
    AppComponent,
    InterceptorPlaygroundComponent,
    RouteChangeComponent,
    RoutingWithResolveComponent
  ],
  imports: [
    BrowserModule,
    NgProgressModule,
    HttpModule,
    AppRouting,
    InMemoryWebApiModule.forRoot(InMemHeroService, { delay: 1500 }),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    ProgressBarService,
    {
      provide: NgProgressService,
      useExisting: ProgressBarService
    },
    LoadingBarHttpInterceptor,
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, LoadingBarHttpInterceptor]
    },
    {
      provide: Http,
      useExisting: InterceptorService
    },
    InterceptorPlaygroundService,
    FilteredMoviesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
