import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../../hooks/axios.hook';
import type { CodeBlock } from '../../../types/types';

// syntax highlighting
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import GlossyButton from '../../../components/ui/GlossyButton';
import {
  CopyCheckIcon,
  CopyIcon,
  PencilLineIcon,
  Trash2Icon,
} from 'lucide-react';
import kitzo from 'kitzo';
import { Tooltip } from 'kitzo/react';
import { useState } from 'react';
import type { DeleteInfoType } from './CodeFolder';

type CodeBlockViewProps = {
  codeBlockId: string;
  setDeletingInfo: React.Dispatch<
    React.SetStateAction<DeleteInfoType | undefined>
  >;
};

export default function CodeBlockView({
  codeBlockId,
  setDeletingInfo,
}: CodeBlockViewProps) {
  const server = useAxios();

  const { data, isLoading } = useQuery<CodeBlock>({
    queryKey: ['code_block', codeBlockId],
    queryFn: async () => {
      const response = await server.get(`/code/get/${codeBlockId}`);
      return response.data;
    },
  });

  const [copied, setCopied] = useState<boolean>(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-code-100 rounded-2xl border px-3 py-2">
      <h3 className="text-code-800 text-lg font-medium">{data?.title}</h3>
      <p className="text-code-700">{data?.description}</p>

      <div className="flex justify-end gap-1 py-2">
        <Tooltip content="Delete!">
          <GlossyButton
            content={
              <span className="grid h-7 place-items-center bg-white px-3">
                <Trash2Icon size="16" />
              </span>
            }
            onClick={() =>
              setDeletingInfo({
                folder_id: data?.folder_id ?? '',
                code_block_id: data?._id ?? '',
                code_block_title: data?.title ?? '',
              })
            }
          />
        </Tooltip>

        <Tooltip content="Edit">
          <GlossyButton
            content={
              <span className="grid h-7 place-items-center bg-white px-3">
                <PencilLineIcon size="16" />
              </span>
            }
          />
        </Tooltip>

        <Tooltip content={copied ? 'Copied' : 'Copy'}>
          <GlossyButton
            content={
              <span className="grid h-7 place-items-center bg-white px-3">
                {copied ? <CopyCheckIcon size="16" /> : <CopyIcon size="16" />}
              </span>
            }
            onClick={() => {
              kitzo.copy(data?.code);
              if (copied) return;
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          />
        </Tooltip>
      </div>

      <div className="mx-auto w-[clamp(16.875rem,-3.125rem+100vw,44.8125rem)] overflow-auto md:w-[clamp(710px,-58px+100vw,1274px)]">
        <SyntaxHighlighter
          children={data?.code as string}
          style={okaidia}
          language="javascript"
          customStyle={{
            paddingBlock: '1rem',
            paddingInlineEnd: '1rem',
            margin: 0,
            minHeight: 40,
            maxHeight: 500,
          }}
          showLineNumbers={true}
        ></SyntaxHighlighter>
      </div>
    </div>
  );
}
