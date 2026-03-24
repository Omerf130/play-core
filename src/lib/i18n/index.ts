import { cookies } from "next/headers";
import type { TranslationKeys } from "./types";
import en from "./translations/en";
import he from "./translations/he";

export type Locale = "he" | "en";
export type { TranslationKeys };

export const DEFAULT_LOCALE: Locale = "he";
export const LOCALES: Locale[] = ["he", "en"];

const dictionaries: Record<Locale, TranslationKeys> = { en, he };

export function getTranslations(locale: Locale): TranslationKeys {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export async function getLocaleFromCookies(): Promise<Locale> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value;
  if (lang === "en" || lang === "he") return lang;
  return DEFAULT_LOCALE;
}
