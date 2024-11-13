<script>
export default {
  name: 'SubmitButton',
  props: {
    handleLogin: {
      type: Function,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <v-btn
    color="primary"
    @click="handleLogin"
    :disabled="disabled"
  >
    Login
  </v-btn>
</template>

<style scoped>
/* Custom styles for the button */
</style>
