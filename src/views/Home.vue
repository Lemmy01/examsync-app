<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import Card from '../components/Card.vue';
  import Sidebar from '../components/sidebar/Sidebar.vue';

  export default defineComponent({
    name: 'Home',
    components: {
      Sidebar,
      Card,
    },
    setup() {
      const items = ref([
        {
          id: 1,
          title: 'Card 1',
          description: 'Description for Card 1',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          title: 'Card 2',
          description: 'Description for Card 2',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          title: 'Card 3',
          description: 'Description for Card 3',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 4,
          title: 'Card 4',
          description: 'Description for Card 4',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 5,
          title: 'Card 5',
          description: 'Description for Card 5',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 6,
          title: 'Card 6',
          description: 'Description for Card 6',
          image: 'https://via.placeholder.com/150',
        },
        // More cards as needed
      ]);

      const handleCardClick = (title: string) => {
        alert(`Card clicked: ${title}`);
      };

      return {
        items,
        handleCardClick,
      };
    },
  });
</script>

<style scoped>
.home-page {
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 250px; /* Adjust this based on sidebar width */
  padding: 20px;
}

.container {
  max-width: 1200px;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Creates a grid with dynamic number of columns */
  gap: 20px; /* Space between cards */
  margin-top: 20px;
}

.card-wrapper {
  width: 100%;
}
</style>

<template>
  <div class="home-page">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content">
      <div class="container">
        <div class="grid">
          <!-- Loop through items and display each card -->
          <div class="card-wrapper" v-for="item in items" :key="item.id">
            <Card
              :title="item.title"
              :description="item.description"
              :image="item.image"
              @card-click="handleCardClick"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
