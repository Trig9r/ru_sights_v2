import { PropsWithChildren } from 'react';
import ReactDom from 'react-dom';

import { Button } from '../UI';

import style from './Modal.module.css';

interface ModalProps {
  active: boolean;
  title: string;
  onSubmit: () => void;
  onClose: () => void;
}

export const Modal = ({
  active,
  title,
  onSubmit,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  if (!active) return null;

  const portalElement = document.getElementById('root');

  if (portalElement) {
    return ReactDom.createPortal(
      <div className={style.modal_container} onClick={onClose}>
        <div className={style.modal_content} onClick={(event) => event.stopPropagation()}>
          <header className={style.modal_header}>
            <h3 className={style.modal_title}>{title}</h3>
          </header>
          <div className={style.modal_body}>{children}</div>
          <footer className={style.modal_footer}>
            <Button primary classnames={style.modal_btn} onClick={onSubmit}>
              Подтвердить
            </Button>
            <Button primary classnames={style.modal_btn} onClick={onClose}>
              Отмена
            </Button>
          </footer>
        </div>
      </div>,
      portalElement,
    );
  }
};
