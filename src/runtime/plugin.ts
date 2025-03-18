import { defineNuxtPlugin } from '#imports';
import { consola } from 'consola';
import Rollbar from 'rollbar';

const isValidAccessToken = (accessToken: unknown): accessToken is string => {
  return typeof accessToken === 'string' && accessToken.length > 0;
};

const warn = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    consola.warn('nuxt-rollbar', ...args);
  }
};

export default defineNuxtPlugin(({ $config }) => {
  const { clientAccessToken, ...options } = $config.public.rollbar;
  const serverAccessToken = $config.__rollbarServerAccessToken;

  const accessToken = import.meta.client ? clientAccessToken : serverAccessToken;

  if (!isValidAccessToken(accessToken)) {
    const side = import.meta.client ? 'client' : 'server';
    return warn(
      `Skipping Rollbar initialization on ${side} side. Please provide a valid ${side}AccessToken.`,
    );
  }

  const rollbar = new Rollbar({
    ...(options?.config || {}),
    accessToken,
  });

  return {
    provide: { rollbar },
  };
});
