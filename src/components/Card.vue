<template>
  <div class="card" @click="handleClick">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
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
      // Emit the 'card-click' event when the card is clicked
      this.$emit('card-click', this.title);
    },
  },
};
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
