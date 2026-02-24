import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import es from "@/locales/es.json";
import en from "@/locales/en.json";

const translations = { es, en };
const STORAGE_KEY = "az_lang";
const SUPPORTED_LANGS = ["es", "en"];

function getInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch {}

  const browserLang = navigator.language || navigator.userLanguage || "";
  return browserLang.startsWith("en") ? "en" : "es";
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((newLang) => {
    if (!SUPPORTED_LANGS.includes(newLang)) return;
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {}
    document.documentElement.lang = newLang;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((key, params) => {
    let value = getNestedValue(translations[lang], key);
    if (value === undefined) {
      value = getNestedValue(translations.es, key);
    }
    if (value === undefined) return key;
    if (typeof value !== "string") return value;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(new RegExp(`\\{${k}\\}`, "g"), v);
      });
    }
    return value;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}
