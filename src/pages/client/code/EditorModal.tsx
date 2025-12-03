import React, { useEffect, useRef, useState } from 'react';
import GlossyButton from '../../../components/ui/GlossyButton';
import Modal from '../../../components/ui/Modal';

import Select from 'react-select';
import { supportedLanguages } from './utils/editorLanguage';
import { supportedThemes } from './utils/editorStyle';
import { useCodeContext } from '../../../contexts/CodeContext';
import type { EditorUpdateValuesType, EditorValuesType } from './types/types';

type EditorModalProps = {
  editorState: 'new' | 'update' | null;
  setEditorState: React.Dispatch<React.SetStateAction<'new' | 'update' | null>>;
  actions: {
    addNewCodeBlock: (values: EditorValuesType) => void;
    updateCodeBlock: (values: EditorUpdateValuesType) => void;
  };
  isAdding: boolean;
  isUpdating: boolean;
};

export default function EditorModal({
  editorState,
  setEditorState,
  actions,
  isAdding,
  isUpdating,
}: EditorModalProps) {
  const { editDetails } = useCodeContext();
  const { addNewCodeBlock, updateCodeBlock } = actions;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [values, setValues] = useState<EditorValuesType>(() => {
    if (editorState === 'update') {
      return {
        title: editDetails?.title ?? '',
        description: editDetails?.description ?? '',
        code: editDetails?.code ?? '',
        language: editDetails?.language ?? 'plaintext',
        theme: editDetails?.theme ?? 'coy',
      };
    }
    return {
      title: '',
      description: '',
      code: '',
      language: 'plaintext',
      theme: 'coy',
    };
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function getDefaultLanguage() {
    const defaultLanguage = supportedLanguages.find(
      (l) => l.value === values.language,
    );
    return {
      value: defaultLanguage?.value,
      label: defaultLanguage?.name,
    };
  }

  function getDefaultTheme() {
    const defaultTheme = supportedThemes.find((t) => t.value === values.theme);
    return {
      value: defaultTheme?.value,
      label: defaultTheme?.name,
    };
  }

  return (
    <Modal
      onMouseDown={() => setEditorState(null)}
      className="bg-code w-full max-w-[700px] space-y-2 rounded-2xl p-4 shadow-md"
    >
      <div className="grid gap-2">
        <div className="grid gap-1">
          <label className="w-fit pl-1" htmlFor="block-title">
            Title
          </label>
          <input
            id="block-title"
            ref={inputRef}
            type="text"
            placeholder="Block title"
            value={values.title}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border-code-150 bg-code focus:ring-code-300 focus:border-code-300 rounded-md border px-3 py-1.5 ring-2 ring-transparent transition-shadow outline-none"
          />
        </div>
        <div className="grid gap-1">
          <label className="w-fit pl-1" htmlFor="block-description">
            Description
          </label>
          <textarea
            id="block-description"
            value={values.description}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border-code-150 bg-code focus:ring-code-300 focus:border-code-300 max-h-[150px] min-h-[38px] rounded-md border px-3 py-1.5 ring-2 ring-transparent transition-shadow outline-none"
            placeholder="Block description"
          />
        </div>
      </div>

      <div className="relative grid gap-2">
        <div className="grid gap-2 sm:flex sm:items-center sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="max-sm:flex-1 max-sm:pl-1">Language</span>
            <Select
              id="language"
              className="min-w-[130px] text-sm max-sm:flex-2"
              value={getDefaultLanguage()}
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
            <span className="max-sm:flex-1 max-sm:pl-1">Theme</span>
            <Select
              id="language"
              className="min-w-[130px] text-sm max-sm:flex-2"
              value={getDefaultTheme()}
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
              updateCodeBlock({
                ...values,
                code_block_id: editDetails?._id as string,
              });
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
