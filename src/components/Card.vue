<template>
  <v-card @click="handleCardClick">
    <v-img :src="image" height="200px" />
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ description }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    description: String,
    image: String,
  },
  methods: {
    handleCardClick() {
      this.$emit('card-click');  // Emit the event to trigger the dialog
    },
  },
};
</script>
