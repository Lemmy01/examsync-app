<script lang="ts">
import { defineComponent, ref } from 'vue';
import axiosInstance from '../axios';
import { useRouter } from 'vue-router';
import InputField from '../components/InputField.vue';
import SubmitButton from '../components/SubmitButton.vue';
import axios, { AxiosError } from 'axios'; // Importăm Axios și AxiosError pentru a tipiza corect erorile

// Definirea tipurilor pentru cererea și răspunsul de login
interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface LoginRequestData {
  email: string;
  password: string;
}

export default defineComponent({
  name: 'Login',
  components: {
    InputField,
    SubmitButton,
  },
  setup() {
    // Variabilele reactive
    const email = ref<string>('');
    const password = ref<string>('');
    const errorMessage = ref<string | null>(null);
    const router = useRouter();
   
   
   // Funcția de login tipizată cu `async` și `void`
    const handleLogin = async (): Promise<void> => {
      errorMessage.value = null;

      const requestData: LoginRequestData = {
        email: email.value,
        password: password.value,
      };

    //   try {
    //     // Tipizarea răspunsului Axios
    //     const response = await axiosInstance.post<LoginResponse>('/login', requestData);

    //     if (response.data.token) {
    //       localStorage.setItem('token', response.data.token);
    //       router.push({ name: 'Home' });
    //     }
    //   } catch (error) {
    //     // Verificarea tipului erorii
    //     if (axios.isAxiosError(error)) {
    //       const axiosError = error as AxiosError; // Cast pentru a accesa eroarea Axios
    //       if (axiosError.response) {
    //         errorMessage.value = axiosError.response.data.message || 'Login failed';
    //       } else {
    //         errorMessage.value = 'An unexpected error occurred';
    //       }
    //     } else {
    //       errorMessage.value = 'An unexpected error occurred';
    //     }
    //   }
    router.push({ name: 'Home' });
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

<style scoped>
.login-page {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}
.error {
  color: red;
}
</style>

<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
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
      <SubmitButton text="Login" />
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>
