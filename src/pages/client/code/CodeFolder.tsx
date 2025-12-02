import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAxios } from '../../../hooks/axios.hook';
import { AnimatePresence } from 'motion/react';
import EditorModal from './EditorModal';
import GlossyButton from '../../../components/ui/GlossyButton';
import CodeBlockView from './CodeBlockView';
import { useAuthContext } from '../../../contexts/AuthContext';
import DeleteModal from '../../../components/ui/DeleteModal';
import { useCodeContext } from '../../../contexts/CodeContext';

// types
import type { CodeFolder } from '../../../types/types';
import type { AxiosError } from 'axios';
import type { EditorValuesType } from './EditorModal';

export default function Code() {
  const { user } = useAuthContext();
  const { editorState, setEditorState, deletingInfo, setDeletingInfo } =
    useCodeContext();

  const server = useAxios();
  const params = useParams();
  const codeFolderId = params.id;
  const queryClient = useQueryClient();

  const {
    data: codeFolder,
    isLoading: codeFolderLoading,
    error: codeFolderError,
  } = useQuery<CodeFolder, AxiosError>({
    queryKey: ['code_folder', codeFolderId],
    queryFn: async () => {
      const response = await server.get(`/codefolder/get/${codeFolderId}`);
      return response.data;
    },
    enabled: !!user,
  });

  // add new code block
  const { mutate: addNewCodeBlock, isPending: isAddingCodeBlock } = useMutation(
    {
      mutationFn: async (values: EditorValuesType) => {
        const response = await server.post('/code/add', {
          folder_id: codeFolderId,
          ...values,
        });
        return response.data;
      },
      onSuccess: () => {
        setEditorState(null);
        queryClient.invalidateQueries({
          queryKey: ['code_folder', codeFolderId],
        });
      },
    },
  );

  // update code block
  const { mutate: updateCodeBlock, isPending: isUpdatingCodeBlock } =
    useMutation({
      mutationFn: async (values: EditorValuesType) => {
        const response = await server.post('/code/update', {
          folder_id: codeFolderId,
          ...values,
        });
        return response.data;
      },
      onSuccess: () => {
        setEditorState(null);
        queryClient.invalidateQueries({
          queryKey: ['code_folder', codeFolderId],
        });
      },
    });

  if (codeFolderError) {
    return (
      <div>
        <p className="pt-16 text-center">Folder doesn't exists</p>
      </div>
    );
  }

  return (
    <>
      {codeFolderLoading ? (
        <div className="flex justify-center pt-42">
          <span className="loading loading-spinner loading-xl opacity-80"></span>
        </div>
      ) : (
        <div className="pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-code-800 text-xl font-semibold">
                {codeFolder?.folder_name || 'Unknown folder name'}
              </h2>
              <p className="text-code-800">
                {codeFolder?.folder_description || 'No description yet'}
              </p>
            </div>

            <div>
              <GlossyButton
                content={<span className="bg-white px-6 py-2">Add Block</span>}
                onClick={() => setEditorState('new')}
              />
            </div>
          </div>

          {(codeFolder?.code_blocks?.length ?? 0 > 0) ? (
            <div className="mt-8 space-y-8">
              {codeFolder?.code_blocks?.map((b) => (
                <CodeBlockView key={b} codeBlockId={b} />
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
                isAdding={isAddingCodeBlock}
                isUpdating={isUpdatingCodeBlock}
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
