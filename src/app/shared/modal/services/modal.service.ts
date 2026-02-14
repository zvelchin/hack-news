// modal.service.ts
import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalRef } from '../components/modal.ref';

export interface ModalRequest {
  component: Type<any>;
  inputs?: Record<string, any>;
  modalRef: ModalRef;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private req$ = new BehaviorSubject<ModalRequest | null>(null);
  public requests$ = this.req$.asObservable();

  public open(component: Type<any>, inputs?: Record<string, any>): ModalRef {
    const modalRef = new ModalRef();
    this.req$.next({ component, inputs: inputs ?? {}, modalRef });
    return modalRef;
  }

  // закрыть текущую (хост обработает очистку)
  public close(): void {
    this.req$.next(null);
  }
}
