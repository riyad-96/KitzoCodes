import type { ReactNode } from 'react';
import Modal from './Modal';
import GlossyButton from './GlossyButton';

type DeleteModalPropsType = {
  title: ReactNode;
  description: ReactNode;
  cancelFn: () => void;
  clickFn: () => void;
};

export default function DeleteModal({
  title,
  description,
  cancelFn,
  clickFn,
}: DeleteModalPropsType) {
  return (
    <Modal
      onMouseDown={cancelFn}
      className="bg-code w-full max-w-[450px] rounded-2xl p-4 shadow"
    >
      <div>
        <h4 className="text-code-800 text-xl font-medium">{title}</h4>
        <p className="py-4">{description}</p>
      </div>
      <div className="flex justify-end gap-1">
        <GlossyButton
          content={
            <span className="grid h-7.5 place-items-center px-4 text-sm tracking-wide">
              Cancel
            </span>
          }
          onClick={cancelFn}
        />
        <GlossyButton
          content={
            <span className="grid h-7.5 place-items-center bg-red-200 px-4 text-sm tracking-wide">
              Delete
            </span>
          }
          onClick={clickFn}
        />
      </div>
    </Modal>
  );
}
