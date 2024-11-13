<template>
  <v-card @click="handleCardClick">
    <v-img :src="image" height="200px" />
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ description }}</v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary" @click.stop="handleCardClick">Click Me</v-btn>
    </v-card-actions>
  </v-card>
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
    }
  },
  methods: {
    handleCardClick() {
      // Emit the title of the card when clicked
      this.$emit('card-click', this.title);
    }
  }
}
</script>

