import Rollbar from 'rollbar';
import { consola } from 'consola';
import { name, version } from '../../package.json';

const isValidAccessToken = (accessToken: unknown): accessToken is string => {
  return typeof accessToken === 'string' && accessToken.length > 0;
};

const warn = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    consola.warn(`${name}:${version}`, ...args);
  }
};

export default defineNuxtPlugin(({ $config }) => {
  const { clientAccessToken, ...options } = $config.public.rollbar;
  const serverAccessToken = $config.__rollbarServerAccessToken;

  const accessToken = process.client ? clientAccessToken : serverAccessToken;

  if (!isValidAccessToken(accessToken)) {
    const side = process.client ? 'client' : 'server';
    return warn(
      `Skipping Rollbar initialization on ${side} side. Please provide a valid ${side}AccessToken.`,
    );
  }

  const rollbar = new Rollbar({
    ...(options || {}),
    accessToken,
  });

  return {
    provide: { rollbar },
  };
});
