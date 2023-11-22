import { useNuxtApp } from '#imports';

export function useRollbar() {
  return useNuxtApp().$rollbar;
}
