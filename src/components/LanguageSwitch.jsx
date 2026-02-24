import React from "react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function LanguageSwitch() {
  const { lang, setLang, t } = useTranslation();

  return (
    <button
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-[var(--accent-border)] hover:border-[#C46542] transition-all text-sm font-semibold bg-[var(--bg-elev)] shrink-0"
      aria-label={t("langSwitch.label")}
      type="button"
    >
      <span className={`px-1.5 py-0.5 rounded transition-colors ${lang === "es" ? "bg-[#C46542] text-white" : "text-[var(--muted)]"}`}>
        ES
      </span>
      <span className={`px-1.5 py-0.5 rounded transition-colors ${lang === "en" ? "bg-[#C46542] text-white" : "text-[var(--muted)]"}`}>
        EN
      </span>
    </button>
  );
}
