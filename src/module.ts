import { defu } from 'defu';
import { addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import { name, version } from '../package.json';

export interface ModuleOptions {
  /**
   * @description
   *  Rollbar client access token.
   *  If not provided rollbar will not be enabled on the client side;
   */
  clientAccessToken: string;
  /**
   * @description
   *  Rollbar server access token.
   *  If not provided rollbar will not be enabled on the server side;
   */
  serverAccessToken: string;
  /**
   * @description
   *  Plugin mode.
   *
   * @default 'all'
   */
  mode?: 'client' | 'server' | 'all';
  /**
   * @description
   * Rollbar configuration options.
   */
  config?: any;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'rollbar',
    compatibility: {
      nuxt: '^3',
    },
  },
  hooks: {
    'vite:extendConfig': (config) => {
      config.optimizeDeps?.include?.push('rollbar');
    },
  },
  defaults: {
    serverAccessToken: '',
    clientAccessToken: '',
    mode: 'all',
    config: {},
  },
  setup({ serverAccessToken, mode, ...options }, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.__rollbarServerAccessToken = serverAccessToken;
    nuxt.options.runtimeConfig.public.rollbar = defu(
      nuxt.options.runtimeConfig.public.rollbar,
      options,
    );

    nuxt.options.build.transpile.push(resolve('runtime'));

    if (process.env.NODE_ENV === 'development') {
      nuxt.options.build.transpile.push('rollbar');
    }

    addImports([
      {
        name: 'useRollbar',
        as: 'useRollbar',
        from: resolve('runtime/composables/useRollbar'),
      },
    ]);

    addPlugin({ src: resolve('runtime/plugin'), mode });
  },
});
