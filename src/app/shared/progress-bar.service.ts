import { NgProgressService } from 'ngx-progressbar';

export class ProgressBarService extends NgProgressService {

  private concurrentlySharedBy = 0;

  start(): void {
    if (this.concurrentlySharedBy === 0) {
      console.log('Starting progress bar');
      super.start();
    }
    this.concurrentlySharedBy++;
  }

  done(): void {
    if (this.concurrentlySharedBy === 1) {
      console.log('Stopping progress bar');
      super.done();
    }
    if (this.concurrentlySharedBy > 0) {
      this.concurrentlySharedBy--;
    }
  }

}
