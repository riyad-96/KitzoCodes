import { useEffect } from 'react';
import type { CodeBlock } from '../../../../types/types';

type CodeNavMenuPropsType = {
  code_blocks: CodeBlock[];
};

export default function CodeNavMenu({ code_blocks }: CodeNavMenuPropsType) {
  const hash = location.hash;

  useEffect(() => {
    if (!hash) {
      document
        .querySelector('.scroller-element')
        ?.scrollTo({ behavior: 'smooth', top: 0 });
      return;
    }

    document
      .getElementById(hash)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div className="bg-code sticky top-[85px] overflow-hidden rounded-2xl py-1.5 shadow">
      <div className="max-h-[300px] overflow-y-auto">
        {code_blocks?.map((p) => {
          const id = p.title.trim()
            ? p?.title
                .trim()
                .toLowerCase()
                .replaceAll(/[^a-zA-Z0-9_]/g, '_')
                .replaceAll(/_+/g, '_') +
              '_' +
              p._id
            : `untitled_${p._id}`;

          const link = '#' + id;
          return (
            <div
              key={`title-link-${p._id}`}
              className={`pointer-fine:hover:bg-code-50 relative px-4 py-1.5 text-sm ${hash === link ? 'bg-code-50 text-blue-500' : 'text-code-600'}`}
            >
              <span>{p.title.trim() || 'Untitled'}</span>
              <a
                onClick={() => {
                  document
                    .getElementById(link)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="absolute inset-0 z-1"
                href={link}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
