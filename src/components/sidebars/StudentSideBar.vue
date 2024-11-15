

<template>
  <v-navigation-drawer app v-model="drawer">
    <v-list>
      <!-- Profile Information -->
      <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmail.com"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>

      <v-divider></v-divider>

      <!-- Sidebar Menu Items -->
      <v-list dense>
        <template v-if="type === 'student'">
          <v-list-item
        prepend-icon="mdi-account-multiple"
        title="View Teachers"
        value="view_teachers"
        to="/teachers"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-star"
        title="View Exams"
        value="view_exams"
        to="/exams"
      ></v-list-item>
  
        </template>

        <template v-else-if="type === 'profesor'">
          <v-list-item
        prepend-icon="mdi-account-multiple"
        title="View Requests"
        value="view_requests"
        to="/view_requests"
      ></v-list-item>
     
  
        </template>

        <template v-else-if="type === 'admin'">
      
  
        </template>

        <!-- Logout Button (common for all users) -->
        <v-list-item
        prepend-icon="mdi-folder"
        title="Logout"
        value="logout"
        @click="logout"
      ></v-list-item>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: {
      type: {
        type: String,
        required: true,
      },
    },
  setup() {
    const router = useRouter();

    const logout = () => {
      // Șterge token-ul de autentificare din localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('accountType');

      // Redirecționează utilizatorul la pagina de login
      router.push({ name: 'Login' });
    };

    return {
      logout,
    };
  },
  data(){
   return {
    drawer: true
    }
  }
}
</script>