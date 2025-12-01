import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '../../../hooks/axios.hook';
import { PlusIcon } from 'lucide-react';
import type { CodeFolder } from '../../../types/types';
import EachCodeFolderCard from './EachCodeFolderCard';

export default function Home() {
  const server = useAxios();

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery<CodeFolder[]>({
    queryKey: ['code_folders'],
    queryFn: async () => {
      const response = await server.get('/codefolder/getall');
      return response.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await server.post('/codefolder/add');
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['code_folders'],
      });
    },
  });

  const createCodeFolder = () => {
    mutate();
  };

  return (
    <div className="pt-4">
      <h1 className="text-code-600 text-center text-[clamp(1.125rem,0.6302rem+1.0309vw,1.5rem)] font-semibold tracking-wide">
        Save your Favorite Code Snippets
      </h1>

      {isLoading ? (
        <div className="flex justify-center pt-42">
          <span className="loading loading-spinner loading-xl opacity-80"></span>
        </div>
      ) : (
        <div className="mt-16 grid gap-2 sm:grid-cols-2 md:mt-26 lg:grid-cols-3 xl:grid-cols-4">
          <div
            className={`pointer-fine:hover:text-code-600 pointer-fine:hover:border-code-500 text-code-300 border-code-150 relative grid h-[clamp(7.5rem,5.6484rem+8.2292vw,12.4375rem)] place-items-center overflow-hidden rounded-2xl border-2 bg-transparent select-none`}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-xl opacity-80"></span>
            ) : (
              <>
                <div className="grid justify-items-center">
                  <span>
                    <PlusIcon size="36" />
                  </span>
                  <span className="text-lg font-semibold">Add Code folder</span>
                </div>
                <button
                  onClick={createCodeFolder}
                  className="absolute inset-0"
                ></button>
              </>
            )}
          </div>

          {data?.map((f) => (
            <EachCodeFolderCard key={f._id} folder={f} />
          ))}
        </div>
      )}
    </div>
  );
}
