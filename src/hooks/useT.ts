// ============================================================
//  useT — translation hook bound to the store's current language
// ============================================================
'use client';
import { useCallback } from 'react';
import { useStore } from '@/app/store';
import { translate, type TKey, type Lang } from '@/data/translations';

export function useT() {
  const lang = useStore(s => s.lang);
  const t = useCallback(
    (key: TKey, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang],
  );
  return { t, lang: lang as Lang };
}
