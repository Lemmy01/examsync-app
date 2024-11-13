<!-- src/components/Card.vue -->
<template>
    <div class="card" @click="handleClick">
      <img :src="image" class="card-img-top" :alt="title" />
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
        // Emitere eveniment la click pe card
        this.$emit('card-click', this.title);
      },
    },
  });
  </script>
  
  <style scoped>
  .card {
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  </style>
  