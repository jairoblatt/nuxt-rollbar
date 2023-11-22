export default defineNuxtConfig({
  modules: ['../src/module.ts'],

  ssr: true,

  rollbar: {
    clientAccessToken: 'client_access_token',
    serverAccessToken: 'server_access_token',
    mode: 'all',

    config: {
      captureUncaught: true,
      captureUnhandledRejections: true,

      payload: {
        environment: 'development',
      },
    },
  },

  typescript: {
    typeCheck: 'build',
    shim: false,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
});
