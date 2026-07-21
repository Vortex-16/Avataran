// ============================================================
//  safeDynamic — Resilient dynamic import wrapper
//  Catches ChunkLoadError (e.g. stale webpack cache / network lag)
//  and automatically retries or gracefully reloads without crashing.
// ============================================================
import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';

export function safeDynamic<T extends object>(importFn: () => Promise<{ default: ComponentType<T> }>) {
  return dynamic<T>(
    () =>
      importFn().catch((err) => {
        console.warn('ChunkLoadError encountered in dynamic module, attempting resilient recovery...', err);
        if (typeof window !== 'undefined') {
          return new Promise<{ default: ComponentType<T> }>((resolve, reject) => {
            setTimeout(() => {
              importFn()
                .then(resolve)
                .catch((retryErr) => {
                  console.error('Retry failed. Reloading page to sync webpack chunks...', retryErr);
                  window.location.reload();
                  reject(retryErr);
                });
            }, 300);
          });
        }
        return importFn();
      }),
    { ssr: false }
  );
}
