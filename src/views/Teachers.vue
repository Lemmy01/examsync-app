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
              @card-click="dialogVisible = true"  
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <DialogForm
      v-model="dialogVisible"
      @submit="handleFormSubmit"  
    />
  </v-app>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue';
import Card from '@/components/Card.vue';
import DialogForm from '@/components/DialogForm.vue';

export default {
  name: 'TeacherPage',
  components: {
    Sidebar,
    Card,
    DialogForm,
  },
  data() {
    return {
      items: [
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
        }, {
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
        }, {
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
        // Add more teachers if necessary
      ],
      dialogVisible: false,  // Manage dialog visibility
    };
  },
  methods: {
    handleFormSubmit(formData) {
      console.log('Form Submitted:', formData);  // Handle the form submission (e.g., send to server)
      
    },
  },
};
</script>
