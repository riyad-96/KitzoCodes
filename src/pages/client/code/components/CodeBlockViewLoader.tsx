export default function CodeBlockViewLoader() {
  return (
    <div className="border-code-100 space-y-3 rounded-2xl border bg-white p-3 shadow">
      <div className="space-y-2">
        <div className="bg-code-100 h-6 w-40/100 animate-pulse rounded-xl"></div>
        <div className="bg-code-100 h-6 w-80/100 animate-pulse rounded-xl"></div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <div className="flex items-center gap-1">
          <div className="bg-code-100 h-7 w-15 animate-pulse rounded-full"></div>
          <div className="bg-code-100 h-7 w-15 animate-pulse rounded-full"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-code-100 h-7 w-9 animate-pulse rounded-full"></div>
          <div className="bg-code-100 h-7 w-9 animate-pulse rounded-full"></div>
          <div className="bg-code-100 h-7 w-9 animate-pulse rounded-full"></div>
        </div>
      </div>
      <div className="bg-code-100 h-[150px] animate-pulse rounded-xl"></div>
    </div>
  );
}
