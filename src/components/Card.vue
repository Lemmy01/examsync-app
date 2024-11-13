<template>
  <div class="card" @click="handleClick">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      // Emit the card-click event with the card title
      this.$emit('card-click', this.title);
    },
  },
});
</script>

<style scoped>
.card {
  cursor: pointer;
  transition: transform 0.3s ease;
  border: 2px solid #3498db;  /* Add border here */
  border-radius: 8px;         /* Rounded corners */
  overflow: hidden;           /* Prevent content from overflowing rounded corners */
}

.card:hover {
  transform: scale(1.05);
}

.card-body {
  padding: 15px;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
