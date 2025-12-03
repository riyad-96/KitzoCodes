import Logo from '../header/Logo';

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 pl-2">
      <div className="space-y-2">
        <div className="w-fit origin-left scale-90">
          <Logo
            onClick={() => {
              document.querySelector('.scroller-element')?.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          />
        </div>

        <div>
          <p className="max-w-[400px] text-sm font-light tracking-wide">
            Save, edit, and organize your favorite snippets in any language —
            light or dark, your code, your rules.
          </p>
        </div>
      </div>

      <div className="pt-8">
        <p className="text-sm font-medium">
          By{' '}
          <a
            href="https://github.com/riyad-96/"
            target="_self"
            className="underline"
          >
            Riyad
          </a>
        </p>
      </div>
    </footer>
  );
}
