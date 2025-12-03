import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { DeleteInfoType } from '../pages/client/code/types/types';
import type { CodeBlock } from '../types/types';
import {
  useMutation,
  useQueryClient,
  type UseMutateFunction,
} from '@tanstack/react-query';
import { useAxios } from '../hooks/axios.hook';

//! type for context
type CodeContextType = {
  deletingInfo: DeleteInfoType | null;
  setDeletingInfo: React.Dispatch<React.SetStateAction<DeleteInfoType | null>>;
  editorState: 'new' | 'update' | null;
  setEditorState: React.Dispatch<React.SetStateAction<'new' | 'update' | null>>;
  editDetails: CodeBlock | null;
  setEditDetails: React.Dispatch<React.SetStateAction<CodeBlock | null>>;
  updateDetails: UpdateFolderDetailsType | null;
  setUpdateDetails: React.Dispatch<
    React.SetStateAction<UpdateFolderDetailsType | null>
  >;
  updateFolderDetails: UseMutateFunction<
    string,
    Error,
    UpdateFolderDetailsType,
    unknown
  >;
  updatingFolderDetails: boolean;
  folderDeleteDetails: FolderDeleteDetailsType | null;
  setFolderDeleteDetails: React.Dispatch<
    React.SetStateAction<FolderDeleteDetailsType | null>
  >;
  deleteFolder: UseMutateFunction<string, Error, FolderDeleteDetailsType, unknown>;
  deletingFolder: boolean;
};
const NewContext = createContext<CodeContextType | null>(null);

export type UpdateFolderDetailsType = {
  folder_id: string;
  folder_name: string;
  folder_description: string;
};

export type FolderDeleteDetailsType = {
  folder_id: string;
  folder_name: string;
};

//! context wrapper component
function CodeContext({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const server = useAxios();
  // delete code block
  const [deletingInfo, setDeletingInfo] = useState<DeleteInfoType | null>(null);

  // editor state
  const [editorState, setEditorState] = useState<'new' | 'update' | null>(null);

  // edit details
  const [editDetails, setEditDetails] = useState<CodeBlock | null>(null);

  // update folder name & description
  const [updateDetails, setUpdateDetails] =
    useState<UpdateFolderDetailsType | null>(null);

  const { mutate: updateFolderDetails, isPending: updatingFolderDetails } =
    useMutation({
      mutationFn: async (value: UpdateFolderDetailsType): Promise<string> => {
        const response = await server.patch<string>(
          '/codefolder/update',
          value,
        );
        return response.data;
      },
      onSuccess: (_, value) => {
        setUpdateDetails(null);
        queryClient.invalidateQueries({
          queryKey: ['code_folder', value.folder_id],
        });
        queryClient.invalidateQueries({
          queryKey: ['code_folders'],
        });
      },
    });

  // delete folder
  const [folderDeleteDetails, setFolderDeleteDetails] =
    useState<FolderDeleteDetailsType | null>(null);

  const { mutate: deleteFolder, isPending: deletingFolder } = useMutation({
    mutationFn: async (value: FolderDeleteDetailsType): Promise<string> => {
      const response = await server.delete<string>(
        `/codefolder/delete/${value.folder_id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      setFolderDeleteDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folders'],
      });
    },
  });

  return (
    <NewContext.Provider
      value={{
        deletingInfo,
        setDeletingInfo,
        editorState,
        setEditorState,
        editDetails,
        setEditDetails,
        updateDetails,
        setUpdateDetails,
        updateFolderDetails,
        updatingFolderDetails,
        folderDeleteDetails,
        setFolderDeleteDetails,
        deleteFolder,
        deletingFolder,
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
