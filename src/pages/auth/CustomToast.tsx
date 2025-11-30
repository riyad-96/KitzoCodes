import { InfoIcon } from 'lucide-react';

export default function CustomToast({ text }: { text: string }) {
  return (
    <>
      <div className="flex items-center gap-1 rounded-lg bg-red-700 px-3 py-2 text-sm font-light tracking-wide text-white shadow-md">
        <span>
          <InfoIcon size="16" />
        </span>
        <span>{text}</span>
      </div>
    </>
  );
}
