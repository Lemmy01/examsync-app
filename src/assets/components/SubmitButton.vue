<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubmitButton',
  props: {
    text: {
      type: String,
      default: 'Submit',
    },
  },
});
</script>

<style scoped>
.submit-button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>


<template>
    <button type="submit" class="submit-button">
      {{ text }}
    </button>
  </template>
  
 