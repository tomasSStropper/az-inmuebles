import React from "react";
import ReactDOM from "react-dom";

const SheetCtx = React.createContext(null);

export function Sheet({ children }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return <SheetCtx.Provider value={{ open, setOpen }}>{children}</SheetCtx.Provider>;
}

export function SheetTrigger({ asChild, children, className = "" }) {
  const ctx = React.useContext(SheetCtx);
  const child = React.Children.only(children);
  const props = {
    onClick: (e) => {
      child.props?.onClick?.(e);
      ctx?.setOpen?.(true);
    },
    className: `${child.props?.className ?? ""} ${className}`,
  };
  return asChild ? React.cloneElement(child, props) : <button {...props}>{children}</button>;
}

export function SheetContent({ side = "right", className = "", children }) {
  const ctx = React.useContext(SheetCtx);
  if (!ctx?.open) return null;

  const align = side === "left" ? "left-0" : "right-0";
  const panel = (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => ctx.setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`absolute top-0 ${align} h-full w-80 max-w-[90vw] bg-white shadow-2xl p-6 overflow-y-auto ${className}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => ctx.setOpen(false)}
          className="absolute top-4 right-4 rounded-lg px-2 py-1 text-gray-600 hover:bg-gray-100"
          aria-label="Cerrar"
          type="button"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(panel, document.body);
}

export function SheetHeader({ children }) {
  return <div className="pr-6">{children}</div>;
}
export function SheetTitle({ children, className = "" }) {
  return <h3 className={`text-lg font-bold ${className}`}>{children}</h3>;
}
