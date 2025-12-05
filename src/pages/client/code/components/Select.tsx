import type { SupportedThemesType } from '../utils/editorStyle';
import type { SupportedLanguagesType } from '../utils/editorLanguage';
import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import useDropdownClose from '../../../../hooks/useDropdownClose';

type Options = SupportedThemesType | SupportedLanguagesType;

type SelectPropsType<T> = {
  options: T[];
  value: string;
  onChange: (value: T) => void;
  className?: string;
};

export default function Select<T extends Options>({
  options,
  value,
  onChange,
  className,
}: SelectPropsType<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const option = value ? options?.find((v) => v.value === value) : options?.[0];

  const defaultOption = option ? option : { name: 'Select', value: '' };

  const randomClass = `close_select_${crypto.randomUUID().slice(0, 8)}`;

  const closeOptionRef = useDropdownClose({
    isOpen,
    onClose: () => {
      setIsOpen(false);
    },
    ignoredSelectors: [`.${randomClass}`],
  });

  return (
    <div
      style={{ position: 'relative', zIndex: isOpen ? 2 : 1 }}
      className={className}
    >
      <div className="size-full">
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className={`${randomClass} flex size-full items-center justify-between gap-1.5 rounded-[inherit] px-2 py-1.5`}
        >
          <span className="line-clamp-1 text-sm text-nowrap">
            {defaultOption?.name}
          </span>
          <span>
            <ChevronDownIcon
              size="14"
              strokeWidth="3"
            />
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: `calc(100% + 8px)`,
            display: 'grid',
          }}
          ref={closeOptionRef}
          className={`bg-code border-code-200 max-h-[195px] w-full overflow-y-auto rounded-md border shadow-md`}
        >
          {options.map((o) => (
            <button
              className={`px-3 py-1.5 text-start text-sm ${defaultOption?.value === o.value ? 'bg-code-100 text-blue-500' : 'hover:bg-code-50'}`}
              onClick={() => {
                onChange(o);
                setIsOpen(false);
              }}
              key={o.value}
            >
              {o.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
