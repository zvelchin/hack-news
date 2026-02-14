import { ModalRef } from './modal.ref';

export abstract class BaseModalComponent<R = any> {
  protected constructor(protected modalRef: ModalRef<R>) {}

  protected close(result?: R) {
    this.modalRef.close(result);
  }
}
