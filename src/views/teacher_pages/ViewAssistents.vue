<script>
import Card from '@/components/Card.vue';
import DialogForm from '@/components/DialogForm.vue';
import axiosInstance  from '@/axios';

export default {
  name: 'ViewAssistents',
  components: {
    Card,
    DialogForm,
  },
  data() {
    return {
      items: [], // Initialize items as an empty array
      dialogVisible: false, // Manage dialog visibility
    };
  },
  async created(){
  await  this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const id = localStorage.getItem('id');
        const response = await axiosInstance.get('/examen/' + id);
        console.log(response.data);
      
       for( var i = 0; i < response.data.length; i++ )
         {
           this.items.push(response.data[i]);
         }
         
         console.log(this.items);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    
  },
};
</script>



<template>
  <v-app>
    <!-- Main Content -->
    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="item in this.items"
            :key="item.id"
            cols="12" md="3"
          >
            <Card
              :title="item.title"
              :subtitle="item.description"
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
