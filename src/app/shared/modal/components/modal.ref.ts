// modal-ref.ts
import { Subject, Observable } from 'rxjs';

export class ModalRef<T = any> {
  private closed$ = new Subject<T | undefined>();
  public closed: Observable<T | undefined> = this.closed$.asObservable();

  /** internal: будет заменено хостом */
  public _closeFn: (result?: T) => void = () => {};

  public close(result?: T) {
    this._closeFn(result);
  }

  /** internal: хост вызывает, чтобы уведомить подписчиков */
  public _notifyClosed(result?: T): void {
    this.closed$.next(result);
    this.closed$.complete();
  }
}
