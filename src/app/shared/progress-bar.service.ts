import { NgProgressService } from 'ngx-progressbar/service/progress.service';

export class ProgressBarService extends NgProgressService {

  private concurrentlySharedBy = 0;

  start(): void {
    if (this.concurrentlySharedBy === 0) {
      super.start();
    }
    this.concurrentlySharedBy++;
  }

  done(): void {
    if (this.concurrentlySharedBy === 1) {
      super.done();
    }
    this.concurrentlySharedBy--;
  }

}
