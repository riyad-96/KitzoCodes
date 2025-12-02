import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { DeleteInfoType } from '../pages/client/code/types/types';
import type { CodeBlock } from '../types/types';

//! type for context
type CodeContextType = {
  deletingInfo: DeleteInfoType | null;
  setDeletingInfo: React.Dispatch<React.SetStateAction<DeleteInfoType | null>>;
  editorState: 'new' | 'update' | null;
  setEditorState: React.Dispatch<React.SetStateAction<'new' | 'update' | null>>;
  editDetails: CodeBlock | null;
  setEditDetails: React.Dispatch<React.SetStateAction<CodeBlock | null>>;
};

const NewContext = createContext<CodeContextType | null>(null);

//! context wrapper component
function CodeContext({ children }: { children: ReactNode }) {
  // delete code block
  const [deletingInfo, setDeletingInfo] = useState<DeleteInfoType | null>(null);

  // editor state
  const [editorState, setEditorState] = useState<'new' | 'update' | null>(null);

  // edit details
  const [editDetails, setEditDetails] = useState<CodeBlock | null>(null);

  return (
    <NewContext.Provider
      value={{
        deletingInfo,
        setDeletingInfo,
        editorState,
        setEditorState,
        editDetails,
        setEditDetails,
      }}
    >
      {children}
    </NewContext.Provider>
  );
}

export default CodeContext;

//! use context hook
export function useCodeContext() {
  const context = useContext(NewContext);

  if (context === null) {
    throw new Error('useCodeContext must be used within a context Provider');
  }

  return context;
}
