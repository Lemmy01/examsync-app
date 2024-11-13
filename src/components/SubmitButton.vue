<script setup lang="ts">
defineProps<{ 
	handleLogin: () => Promise<void>;
}>()
</script>

<template>
	<v-btn color="primary" @click="handleLogin" type="submit" block class="mt-4">
	        Submit
	      </v-btn>
</template>
