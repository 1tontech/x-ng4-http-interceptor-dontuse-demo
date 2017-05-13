import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, NavigationCancel, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { ProgressBarService } from './shared/progress-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  private routerEventSubscription: Subscription;

  tabs = [{
    url: '/home',
    name: 'Home'
  }, {
    url: '/route-change',
    name: 'Route change'
  }, {
    url: '/routing-with-resolve',
    name: 'Routing with resolve'
  }];

  constructor(private router: Router,
    private progressBarService: ProgressBarService) {
  }

  ngOnInit(): void {
    // subscribe to routing events
    this.routerEventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progressBarService.start();
      } else if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.progressBarService.done();
      }
    }, error => {
      this.progressBarService.done();
    });
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }

}
