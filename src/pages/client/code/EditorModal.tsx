import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import GlossyButton from '../../../components/ui/GlossyButton';

import type { CodeBlockActionTypes } from './CodeFolder';

type EditorModalProps = {
  editorState: 'new' | 'update' | null;
  setEditorState: React.Dispatch<React.SetStateAction<'new' | 'update' | null>>;
  actions: {
    addNewCodeBlock: (values: CodeBlockActionTypes) => void;
    updateCodeBlock: (values: CodeBlockActionTypes) => void;
  };
};

export default function EditorModal({
  editorState,
  setEditorState,
  actions,
}: EditorModalProps) {
  const { addNewCodeBlock, updateCodeBlock } = actions;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [values, setValues] = useState({
    title: '',
    description: '',
    code: '',
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      onMouseDown={() => setEditorState(null)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/30 px-4 pt-16 pb-26"
    >
      <motion.div
        onMouseDown={(e) => e.stopPropagation()}
        initial={{
          opacity: 0,
          scale: 1.2,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          scale: 0.8,
          opacity: 0,
        }}
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

        <div className="relative grid gap-1">
          <p className="text-code-800 pl-1">Type/paste code below</p>
          <textarea
            value={values.code}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, code: e.target.value }))
            }
            placeholder="Code here"
            className="border-code-150 bg-code focus:ring-code-300 focus:border-code-300 relative max-h-[500px] min-h-[150px] resize-y overflow-y-auto rounded-md border px-2.5 py-1.5 font-[monospace] text-base ring-2 ring-transparent transition-shadow outline-none"
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <GlossyButton
            content={<span className="px-3 py-1">Cancel</span>}
            onClick={() => setEditorState(null)}
          />
          <GlossyButton
            onClick={() =>
              editorState === 'new'
                ? addNewCodeBlock(values)
                : updateCodeBlock(values)
            }
            content={
              <span className="px-3 py-1">
                {editorState === 'new' ? 'Add block' : 'Update'}
              </span>
            }
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
