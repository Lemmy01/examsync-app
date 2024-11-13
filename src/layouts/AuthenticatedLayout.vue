<!-- src/layouts/AuthenticatedLayout.vue -->
<script>
import Sidebar from '@/components/sidebar/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
};
</script>

<template>
    <v-app>
      <v-container fluid class="d-flex">
        <!-- Sidebar -->
        <Sidebar />
  
        <!-- Main Content Area -->
        <v-main>
          <router-view /> <!-- This renders the main content for each route -->
        </v-main>
      </v-container>
    </v-app>
  </template>
  
 
