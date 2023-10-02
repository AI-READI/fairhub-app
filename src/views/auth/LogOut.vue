<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

onBeforeMount(() => {
  authStore.logout();
});

// The LogOut component is a simple component that logs the user out and redirects them to the login page.
</script>
