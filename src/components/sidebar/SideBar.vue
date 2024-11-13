<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmail.com"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense >
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
      <v-list-item
        prepend-icon="mdi-folder"
        title="Logout"
        value="logout"
        to="/login"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>




<script>


export default {
  data(){
   return {
    drawer: true
    }
  }
}
</script>