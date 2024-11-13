<script>
import { defineComponent, ref } from 'vue';
import axiosInstance from '../axios';
import { useRouter } from 'vue-router';
import InputField from '../components/InputField.vue';
import SubmitButton from '../components/SubmitButton.vue';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  components: {
    InputField,
    SubmitButton,
    SubmitButton
},
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref(null);
    const router = useRouter();
    
    const handleLogin = async () => {
      errorMessage.value = null;

      const requestData = {
        email: email.value,
        password: password.value,
      };

      // try {
      //   const response = await axiosInstance.post('/login', requestData);

      //   if (response.data.token) {
      //     localStorage.setItem('authToken', response.data.token);
      //     router.push({ name: 'Home' });
      //   }
      // } catch (error) {
      //   if (axios.isAxiosError(error)) {
      //     if (error.response) {
      //       errorMessage.value = error.response.data.message || 'Login failed. Please try again.';
      //     } else {
      //       errorMessage.value = 'An unexpected error occurred.';
      //     }
      //   } else {
      //     errorMessage.value = 'An unexpected error occurred.';
      //   }
      // }
      localStorage.setItem('authToken', "response.data.token");
      router.push({ name: 'Teachers' });
    };

    return {
      email,
      password,
      errorMessage,
      handleLogin,
    };
  },
});
</script>



<template>
  <v-main>
    <v-container fluid >
     <v-row justify="center">
      <v-col md="4">
      <v-card class="pa-4">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-item>
   
       <InputField
        id="email"
        label="Email"
        type="email"
        v-model="email"
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        v-model="password"
      />
      <SubmitButton :handleLogin="handleLogin" />
 
      
      </v-card-item>
       
      </v-card>
      </v-col>
    </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
/* Ensure the card is centered both horizontally and vertically */
.v-container {
  height: 100vh;
}

.v-card {
  min-height: 300px; /* Ensure a minimum height for the login card */
}
</style>