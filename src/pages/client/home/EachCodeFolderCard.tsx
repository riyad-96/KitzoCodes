import { EllipsisIcon, FileBracesCornerIcon } from 'lucide-react';
import type { CodeFolder } from '../../../types/types';
import { Tooltip } from 'kitzo/react';
import { useNavigate } from 'react-router-dom';
import FormatedDate from './components/FormatedDate';

type EachCodeFolderCard = {
  folder: CodeFolder;
};

export default function EachCodeFolderCard({ folder }: EachCodeFolderCard) {
  const { _id, code_blocks, folder_name, folder_description, updated_at } =
    folder;

  const navigate = useNavigate();

  return (
    <div className="bg-code-100 pointer-fine:hover:shadow-none pointer-fine:hover:border-code-200 inset-shadow-code-100 relative grid min-h-[clamp(7.5rem,5.6484rem+8.2292vw,12.4375rem)] cursor-default grid-rows-[1fr_auto] overflow-hidden rounded-2xl border-2 border-transparent px-4 py-3 shadow inset-shadow-2xs">
      <button
        onClick={() => navigate(`/code/${_id}`)}
        className="absolute inset-0 z-1"
      ></button>

      <div className="absolute top-2 right-2 z-3">
        <Tooltip
          content="Menu"
          tooltipOptions={{
            position: 'left',
          }}
        >
          <button className="bg-code-150 border-code-200 inset-shadow-code-100 grid size-8 place-items-center rounded-lg border inset-shadow-2xs active:transform-[scale(0.96)]">
            <EllipsisIcon size="18" />
          </button>
        </Tooltip>
      </div>

      <div className="mb-4 space-y-2">
        <h3 className="text-code-500 line-clamp-2 max-w-8/10 text-xl font-semibold">
          {folder_name || 'Unknown'}
        </h3>
        <p className="text-code-700 line-clamp-2">
          {folder_description || 'Click to view folder content'}
        </p>
      </div>

      <div className="relative z-1 flex w-fit gap-1">
        <Tooltip content="Updated on" animation={{ delay: 40 }}>
          <FormatedDate className="bg-code-50 shadow-xs" time={updated_at} />
        </Tooltip>

        <Tooltip
          content={`${code_blocks.length} Blocks`}
          animation={{ delay: 40 }}
        >
          <div className="bg-code-50 relative z-2 flex w-fit cursor-default items-center gap-1 rounded-lg px-2 py-1 text-xs shadow-xs">
            <span>
              <FileBracesCornerIcon size="14" />
            </span>
            :<span>{code_blocks.length}</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
