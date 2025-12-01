import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAxios } from '../../../hooks/axios.hook';
import { AnimatePresence } from 'motion/react';
import EditorModal from './EditorModal';
import { useState } from 'react';
import GlossyButton from '../../../components/ui/GlossyButton';
import CodeBlockView from './CodeBlockView';
// types
import type { CodeFolder } from '../../../types/types';
import type { AxiosError } from 'axios';
import DeleteModal from '../../../components/ui/DeleteModal';

export type CodeBlockActionTypes = {
  title: string;
  description: string;
  code: string;
};

export type DeleteInfoType = {
  code_block_title: string;
  code_block_id: string;
  folder_id: string;
} | null;

export default function Code() {
  const server = useAxios();
  const params = useParams();
  const codeFolderId = params.id;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<CodeFolder, AxiosError>({
    queryKey: ['code_folder', codeFolderId],
    queryFn: async () => {
      const response = await server.get(`/codefolder/get/${codeFolderId}`);
      return response.data;
    },
  });

  const add_codeMutation = useMutation({
    mutationFn: async (values: CodeBlockActionTypes) => {
      const response = await server.post('/code/add', {
        folder_id: codeFolderId,
        ...values,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['code_folder', codeFolderId],
      });
    },
  });

  // add new block
  async function addNewCodeBlock(values: CodeBlockActionTypes) {
    await add_codeMutation.mutateAsync(values);

    setEditorState(null);
  }
  // update code block
  function updateCodeBlock(values: CodeBlockActionTypes) {
    console.log(values);
  }

  // delete code block
  const [deletingInfo, setDeletingInfo] = useState<DeleteInfoType>();

  // editor state
  const [editorState, setEditorState] = useState<'new' | 'update' | null>(null);

  if (error) {
    return (
      <div>
        <p className="pt-16 text-center">Folder doesn't exists</p>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center pt-42">
          <span className="loading loading-spinner loading-xl opacity-80"></span>
        </div>
      ) : (
        <div className="pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-code-800 text-xl font-semibold">
                {data?.folder_name || 'Unknown folder name'}
              </h2>
              <p className="text-code-800">
                {data?.folder_description || 'No description yet'}
              </p>
            </div>

            <div>
              <GlossyButton
                content={<span className="bg-white px-6 py-2">Add Block</span>}
                onClick={() => setEditorState('new')}
              />
            </div>
          </div>

          {(data?.code_blocks?.length ?? 0 > 0) ? (
            <div className="mt-8 space-y-8">
              {data?.code_blocks?.map((b) => (
                <CodeBlockView
                  key={b}
                  codeBlockId={b}
                  setDeletingInfo={setDeletingInfo}
                />
              ))}
            </div>
          ) : (
            <p className="pt-16 text-center">
              No Code blocks in this folder yet
            </p>
          )}

          <AnimatePresence>
            {editorState && (
              <EditorModal
                editorState={editorState}
                setEditorState={setEditorState}
                actions={{ addNewCodeBlock, updateCodeBlock }}
                isAdding={add_codeMutation.isPending}
                isUpdating={add_codeMutation.isPending}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {deletingInfo && (
              <DeleteModal
                title="Delete code block!"
                description={
                  <span className="font-light tracking-wide">
                    Delete '
                    <span className="font-medium">
                      {deletingInfo.code_block_title || 'Untitled'}
                    </span>
                    ' code block permanently? This action is irreversible.
                  </span>
                }
                cancelFn={() => setDeletingInfo(null)}
                clickFn={() => {}}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
