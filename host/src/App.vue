<template>
  <div class="app-container">
    <header class="header">
      <h1>Module Federation Host</h1>
      <p>Loading remote applications...</p>
    </header>

    <main class="main-content">
      <section class="remote-section">
        <h3>React Remote</h3>
        <div ref="reactContainer" class="remote-container"></div>
        <p v-if="reactError" class="error">{{ reactError }}</p>
      </section>

      <section class="remote-section">
        <h3>Vue Remote</h3>
        <Suspense>
          <template #default>
            <VueRemote />
          </template>
          <template #fallback>
            <p>Loading Vue Remote...</p>
          </template>
        </Suspense>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent } from "vue";

const reactContainer = ref(null);
const reactError = ref(null);
let reactUnmount = null;

// Load Vue Remote with Suspense
const VueRemote = defineAsyncComponent(() =>
  import("vueApp/App").catch((err) => {
    console.error("Failed to load Vue remote:", err);
    return { template: "<p>Failed to load Vue Remote</p>" };
  })
);

onMounted(async () => {
  // Load React Remote
  try {
    const remote = await import("reactApp/App");
    console.log("[v0] React remote loaded:", remote);

    // Wait for the ref to be assigned
    if (reactContainer.value) {
      reactUnmount = remote.mount(reactContainer.value);
      console.log("[v0] React mounted successfully");
    } else {
      console.error("[v0] React container ref is null");
      reactError.value = "Failed to mount React app";
    }
  } catch (err) {
    console.error("[v0] Failed to load React remote:", err);
    reactError.value = `Error: ${err.message}`;
  }
});

onBeforeUnmount(() => {
  if (reactUnmount) {
    reactUnmount();
    console.log("[v0] React unmounted");
  }
});
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Source Sans Pro",
    sans-serif;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
}

.header p {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.remote-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.remote-section h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
}

.remote-container {
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error {
  color: #d32f2f;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 1.8rem;
  }
}
</style>
