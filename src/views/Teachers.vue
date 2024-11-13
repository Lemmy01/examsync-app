<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Sidebar from '@/components/sidebar/Sidebar.vue'; // Import Sidebar component
  import Card from '@/components/Card.vue';
  export default defineComponent({
    name: 'TeacherPage',
    components: {
      Sidebar,
      Card,
    },
    setup() {
      const items = ref([
        {
          id: 1,
          title: 'Teacher 1',
          description: 'Description for Card 1',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          title: 'Teacher 2',
          description: 'Description for Card 2',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          title: 'Teacher 3',
          description: 'Description for Card 3',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 4,
          title: 'Teacher 4',
          description: 'Description for Card 4',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 5,
          title: 'Teacher 5',
          description: 'Description for Card 5',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 6,
          title: 'Teacher 6',
          description: 'Description for Card 6',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 7,
          title: 'Teacher 7',
          description: 'Description for Card 7',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 8,
          title: 'Teacher 8',
          description: 'Description for Card 8',
          image: 'https://via.placeholder.com/150',
        },
      ]);

      const handleCardClick = (title: string) => {
        alert(`Card clicked: ${title}`);
      };

      const drawer = ref(true); // State of the sidebar (open/closed)

      return {
        items,
        handleCardClick,
        drawer,
      };
    },
  });
</script>

<template>
  <v-app>
    <!-- Main Content -->
    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12" md="3"
          >
            <Card
              :title="item.title"
              :description="item.description"
              :image="item.image"
              @card-click="handleCardClick"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Optional: Custom styles if needed */
</style>
