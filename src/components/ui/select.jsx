import React from "react";

const SelectCtx = React.createContext(null);

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onDoc = (e) => {
      // close if click outside
      if (!e.target.closest?.("[data-select-root='true']")) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const ctx = { value, onValueChange, open, setOpen };
  return (
    <SelectCtx.Provider value={ctx}>
      <div data-select-root="true">{children}</div>
    </SelectCtx.Provider>
  );
}

export function SelectTrigger({ className = "", children }) {
  const ctx = React.useContext(SelectCtx);
  return (
    <button
      type="button"
      onClick={() => ctx?.setOpen?.(!ctx.open)}
      className={`w-full flex items-center justify-between rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-2 text-sm ${className}`}
    >
      {children}
      <span className="ml-3 text-[var(--muted)]">▾</span>
    </button>
  );
}

export function SelectValue({ placeholder }) {
  const ctx = React.useContext(SelectCtx);
  const val = ctx?.value;
  return <span className="text-sm text-[var(--text)]">{val && val !== "all" ? val : placeholder ?? ""}</span>;
}

export function SelectContent({ children }) {
  const ctx = React.useContext(SelectCtx);
  if (!ctx?.open) return null;
  return (
    <div className="mt-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] shadow-xl overflow-hidden">
      {children}
    </div>
  );
}

export function SelectItem({ value, children }) {
  const ctx = React.useContext(SelectCtx);
  return (
    <button
      type="button"
      onClick={() => {
        ctx?.onValueChange?.(value);
        ctx?.setOpen?.(false);
      }}
      className="block w-full text-left px-4 py-2 hover:bg-[var(--bg-elev2)] text-sm text-[var(--text)]"
    >
      {children}
    </button>
  );
}
