<!-- src/layouts/AuthenticatedLayout.vue -->
<script>
import Sidebar from "@/components/sidebars/StudentSideBar.vue";


export default {
  components: {
    Sidebar,
  },
  computed: {
    accountType() {
      console.log(localStorage.getItem('accountType'));
      return localStorage.getItem('accountType');
    },
  },
  setup() {
    console.log(localStorage.getItem('accountType'));

    return {};
  },
};

</script>


<template>
  <v-app>
  <v-container fluid class="d-flex">
    <Sidebar v-if="accountType === 'student'" type="student" />
    <Sidebar v-else-if="accountType === 'profesor'" type="profesor" />
    <Sidebar v-else-if="accountType === 'admin'" type="admin" />
   <v-main>
    <router-view />
    </v-main> 
    </v-container>
   </v-app>
</template>

