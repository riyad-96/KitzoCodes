import type { CodeBlock } from '../../../types/types';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../../hooks/axios.hook';

// syntax highlighting
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
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
import { getStyle, supportedThemes } from './utils/editorStyle';
import { supportedLanguages } from './utils/editorLanguage';
import CodeBlockViewLoader from './components/CodeBlockViewLoader';
import { useCodeContext } from '../../../contexts/CodeContext';

type CodeBlockViewProps = {
  codeBlockId: string;
};

export default function CodeBlockView({ codeBlockId }: CodeBlockViewProps) {
  const server = useAxios();
  const { setDeletingInfo } = useCodeContext();

  const { data, isLoading } = useQuery<CodeBlock>({
    queryKey: ['code_block', codeBlockId],
    queryFn: async () => {
      const response = await server.get(`/code/get/${codeBlockId}`);
      return response.data;
    },
  });

  const [copied, setCopied] = useState<boolean>(false);

  if (isLoading) {
    return <CodeBlockViewLoader />;
  }

  return (
    <div className="border-code-100 bg-code rounded-2xl border px-3 py-4 shadow">
      <div className="mb-3 pl-2">
        <h3 className="text-code-800 text-lg font-medium md:text-xl">
          {data?.title ? (
            data?.title
          ) : (
            <span className="text-code-400">Untitled code block</span>
          )}
        </h3>
        <p className="text-code-700">
          {data?.description ? (
            data?.description
          ) : (
            <span className="text-code-300">
              No description yet. Add one if you like
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 py-2">
        <div className="flex items-center gap-1">
          <Tooltip content="Language">
            <span className="bg-code-50 border-code-100 inset-shadow-code grid h-7 cursor-default place-items-center rounded-full border px-3 text-sm shadow-xs inset-shadow-2xs">
              {supportedLanguages.find((l) => l.value === data?.language)?.name}
            </span>
          </Tooltip>

          <Tooltip content="Theme">
            <span className="bg-code-50 border-code-100 inset-shadow-code grid h-7 cursor-default place-items-center rounded-full border px-3 text-sm shadow-xs inset-shadow-2xs">
              {supportedThemes.find((t) => t.value === data?.theme)?.name}
            </span>
          </Tooltip>
        </div>

        <div className="flex items-center gap-1">
          <Tooltip content="Delete!">
            <GlossyButton
              content={
                <span className="grid h-7 place-items-center px-3">
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
                <span className="grid h-7 place-items-center px-3">
                  <PencilLineIcon size="16" />
                </span>
              }
            />
          </Tooltip>

          <Tooltip content={copied ? 'Copied' : 'Copy'}>
            <GlossyButton
              content={
                <span className="grid h-7 place-items-center px-3">
                  {copied ? (
                    <CopyCheckIcon size="16" />
                  ) : (
                    <CopyIcon size="16" />
                  )}
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
      </div>

      <div className="mx-auto w-[clamp(16.875rem,-3.125rem+100vw,44.8125rem)] overflow-auto md:w-[clamp(710px,-58px+100vw,1274px)]">
        <SyntaxHighlighter
          children={data?.code as string}
          style={getStyle(data?.theme)}
          language={data?.language}
          customStyle={{
            paddingBlock: '1rem',
            paddingInlineEnd: '1rem',
            margin: 0,
            minHeight: 40,
            maxHeight: 500,
            borderRadius: '0.5rem',
          }}
          showLineNumbers={true}
        />
      </div>
    </div>
  );
}
