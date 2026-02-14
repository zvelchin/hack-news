// my-modal.component.ts
import { Component } from '@angular/core';
import { BaseModalComponent } from '@shared/modal/components/base-modal.component';
import { ModalRef } from '@shared/modal/components/modal.ref';

@Component({
  selector: 'detail-news-modal',
  templateUrl: './detail-news-modal.component.html',
})
export class DetailNewsModal extends BaseModalComponent<string> {
  author = 'Заголовок';
  text = 'Текст';

  constructor(modalRef: ModalRef<string>) {
    super(modalRef);
  }

  onClose() {
    this.close(); // использует BaseModalComponent.close()
  }

  confirm() {
    this.close('confirmed'); // можно вернуть результат
  }
}
