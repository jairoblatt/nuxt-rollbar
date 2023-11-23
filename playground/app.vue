<script setup lang="ts">
const { rollbar: rollbarPublic } = useRuntimeConfig().public;

const rollbar = useRollbar();

function trackLog() {
  rollbar.log('Hello from Nuxt 3!');
}
</script>

<template>
  <Head>
    <Title>nuxt-rollbar</Title>
    <Link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
  </Head>

  <header>
    <h1>nuxt-rollbar</h1>
  </header>

  <h3>Configuration</h3>
  <details>
    <summary>Public Runtime Options</summary>
    <pre>{{ JSON.stringify(rollbarPublic, null, 2) }}</pre>
  </details>

  <h3>Composable</h3>
  <button @click="trackLog">Log</button>
</template>
