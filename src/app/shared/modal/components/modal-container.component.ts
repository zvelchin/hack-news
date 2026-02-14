// modal-host.component.ts
import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalRef } from './modal.ref';
import { ModalRequest, ModalService } from '../services/modal.service';

@Component({
  selector: 'modal-container',
  templateUrl: './modal-container.component.html',
  styles: [
    `
      dialog.host::backdrop {
        background: rgba(0, 0, 0, 0.5);
      }
      dialog.host {
        border: none;
        padding: 16px;
        border-radius: 8px;
      }
    `,
  ],
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  @ViewChild('vc', { read: ViewContainerRef, static: true })
  vc!: ViewContainerRef;
  @ViewChild('dialogEl', { static: true })
  dialogEl!: ElementRef<any>;

  private _currentCompRef: any = null;
  private readonly _destroy$ = new Subject<void>();

  constructor(private modal: ModalService, private injector: Injector) {}

  public ngOnInit(): void {
    this.modal.requests$
      .pipe(takeUntil(this._destroy$))
      .subscribe((req) => this.handleRequest(req));
    document.addEventListener('keydown', this.onKeyDown);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    document.removeEventListener('keydown', this.onKeyDown);
  }

  private handleRequest(req: ModalRequest | null): void {
    // закрыть
    if (!req) {
      this.doClose();
      return;
    }

    // очистить предыдущий
    this.vc.clear();

    const modalRef = req.modalRef;

    // создаём инжектор, который предоставляет ModalRef через DI
    const childInjector = Injector.create({
      providers: [{ provide: ModalRef, useValue: modalRef }],
      parent: this.injector,
    });

    // создаём компонент с этим инжектором
    const compRef = this.vc.createComponent(req.component, {
      injector: childInjector,
    });

    // назначаем остальные inputs (если есть)
    if (req.inputs) {
      Object.assign(compRef.instance, req.inputs);
    }

    // если компонент эмитит close EventEmitter, свяжем его с modalRef
    if (compRef.instance.close && compRef.instance.close.subscribe) {
      compRef.instance.close
        .pipe(takeUntil(this._destroy$))
        .subscribe((res: any) => modalRef.close(res));
    }

    // связываем внутреннюю функцию закрытия ModalRef с логикой хоста
    modalRef._closeFn = (result?: any) => {
      // уведомляем подписчиков компонента
      modalRef._notifyClosed(result);
      // очищаем запрос в сервисе (это вызовет handleRequest(null))
      this.modal.close();
    };

    this._currentCompRef = compRef;

    // показать dialog (с fallback)
    try {
      this.dialogEl.nativeElement.showModal();
    } catch {
      this.dialogEl.nativeElement.setAttribute('open', '');
    }
  }

  private doClose() {
    if (this._currentCompRef) {
      this._currentCompRef.destroy();
      this._currentCompRef = null;
    }
    try {
      this.dialogEl.nativeElement.close();
    } catch {
      this.dialogEl.nativeElement.removeAttribute('open');
    }
  }

  onDialogClick(evt: MouseEvent) {
    if (evt.target === this.dialogEl.nativeElement) {
      this.modal.close();
    }
  }

  private onKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      this.modal.close();
    }
  };
}
