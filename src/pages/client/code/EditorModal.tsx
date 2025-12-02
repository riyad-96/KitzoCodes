import React, { useEffect, useRef, useState } from 'react';
import GlossyButton from '../../../components/ui/GlossyButton';
import Modal from '../../../components/ui/Modal';
import { supportedLanguages } from './utils/editorLanguage';
import Select from 'react-select';
import { supportedThemes } from './utils/editorStyle';

type EditorModalProps = {
  editorState: 'new' | 'update' | null;
  setEditorState: React.Dispatch<React.SetStateAction<'new' | 'update' | null>>;
  actions: {
    addNewCodeBlock: (values: EditorValuesType) => void;
    updateCodeBlock: (values: EditorValuesType) => void;
  };
  isAdding: boolean;
  isUpdating: boolean;
};

export type EditorValuesType = {
  title: string;
  description: string;
  code: string;
  language: string;
  theme: string;
};

export default function EditorModal({
  editorState,
  setEditorState,
  actions,
  isAdding,
  isUpdating,
}: EditorModalProps) {
  const { addNewCodeBlock, updateCodeBlock } = actions;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [values, setValues] = useState<EditorValuesType>({
    title: '',
    description: '',
    code: '',
    language: 'plaintext',
    theme: 'dracula',
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Modal
      onMouseDown={() => setEditorState(null)}
      className="bg-code w-full max-w-[700px] space-y-2 rounded-2xl p-4 shadow-md"
    >
      <div className="grid gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Block title"
          value={values.title}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, title: e.target.value }))
          }
          className="border-code-150 bg-code focus:ring-code-300 focus:border-code-300 rounded-md border px-3 py-1.5 ring-2 ring-transparent transition-shadow outline-none"
        />
        <textarea
          value={values.description}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, description: e.target.value }))
          }
          className="border-code-150 bg-code focus:ring-code-300 focus:border-code-300 max-h-[150px] min-h-[38px] rounded-md border px-3 py-1.5 ring-2 ring-transparent transition-shadow outline-none"
          placeholder="Block description"
        />
      </div>

      <div className="relative grid gap-2">
        <div className="grid gap-2 sm:flex sm:items-center sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="max-sm:flex-1">Language</span>
            <Select
              id="language"
              className="min-w-[130px] text-sm max-sm:flex-2"
              onChange={(target) =>
                setValues((prev) => ({
                  ...prev,
                  language: target?.value as string,
                }))
              }
              options={supportedLanguages.map((l) => ({
                label: l.name,
                value: l.value,
              }))}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="max-sm:flex-1">Theme</span>
            <Select
              id="language"
              className="min-w-[130px] text-sm max-sm:flex-2"
              onChange={(target) =>
                setValues((prev) => ({
                  ...prev,
                  theme: target?.value as string,
                }))
              }
              options={supportedThemes.map((t) => ({
                label: t.name,
                value: t.value,
              }))}
            />
          </div>
        </div>
        <textarea
          value={values.code}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, code: e.target.value }))
          }
          placeholder="Type/paste code here"
          className="border-code-150 bg-code focus:ring-code-300 focus:border-code-300 relative max-h-[500px] min-h-[150px] resize-y overflow-y-auto rounded-md border px-2.5 py-1.5 font-[monospace] text-base ring-2 ring-transparent transition-shadow outline-none"
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        {!isAdding && !isUpdating && (
          <GlossyButton
            content={<span className="px-3 py-1">Cancel</span>}
            onClick={() => setEditorState(null)}
          />
        )}
        <GlossyButton
          onClick={() => {
            if (isAdding || isUpdating) return;
            if (editorState === 'new') {
              addNewCodeBlock(values);
            } else {
              updateCodeBlock(values);
            }
          }}
          content={
            <span className="grid h-7 w-[90px] place-items-center">
              {isAdding || isUpdating ? (
                <span className="loading loading-spinner loading-xs opacity-80"></span>
              ) : (
                <span>{editorState === 'new' ? 'Add block' : 'Update'}</span>
              )}
            </span>
          }
        />
      </div>
    </Modal>
  );
}
