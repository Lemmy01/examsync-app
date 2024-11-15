<template>
  <v-card >
  
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text> {{ description }}</v-card-text>
    <v-card-actions >
    <v-btn color="primary" @click="handleCardClick">  {{ butonName }}</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    subtitle: String,
    description: String,
    butonName: String,
  },
  methods: {
    handleCardClick() {
      this.$emit('card-click');  // Emit the event to trigger the dialog
    },
  },
};
</script>
