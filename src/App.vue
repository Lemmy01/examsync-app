<template>
  <div>
    <h1>Lista de utilizatori</h1>
    <ul v-if="users.length">
      <li v-for="(user, index) in users" :key="index">
        <strong>Nume:</strong> {{ user.nume }} <br />
        <strong>Prenume:</strong> {{ user.prenume }} <br />
      </li>
    </ul>
    <p v-else>Niciun utilizator găsit.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Definim variabila reactivă pentru a stoca utilizatorii
const users = ref([]);

// Funcție pentru apelarea API-ului
const fetchUsers = async () => {
  try {
    const response = await fetch('api/user/');

    
    const data = await response.json();
    console.log(data);
    users.value = data;
  } catch (error) {
    console.error('Eroare la apelarea API-ului:', error);
  }
};

// Apelăm API-ul când componenta este montată
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
h1 {
  font-family: Arial, sans-serif;
  color: #333;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 8px 0;
}
</style>
