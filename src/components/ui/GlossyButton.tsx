import type { ReactNode } from 'react';

type GlossyButtonProps = {
  content: string | ReactNode;
  onClick?: () => void;
};

export default function GlossyButton({ content, onClick }: GlossyButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-code-50 border-code-100 inset-shadow-code grid origin-center overflow-hidden rounded-full border text-sm font-medium shadow-xs inset-shadow-2xs active:transform-[scale(0.96)] active:shadow-none"
    >
      {content}
    </button>
  );
}
