<script>
import Card from '@/components/Card.vue';
import axiosInstance  from '@/axios';
import AddAssistentDialog from '@/components/AddAssistentDialog.vue';

export default {
  name: 'ViewAssistents',
  components: {
    Card,
    AddAssistentDialog,

  },
  data() {
    return {
      items: [], // Initialize items as an empty array
      dialogVisible: false, // Manage dialog visibility
      isLoading: false,
    };
  },
  async created(){
  await  this.fetchData();
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {

        const id =  localStorage.getItem('id');
        const request =await axiosInstance.get('/asistenti/' + id);
        console.log(request);
         
     
      //  for( var i = 0; i < response.data.length; i++ )
      //    {
      //      this.items.push(response.data[i]);
      //    }
         
      //    console.log(this.items);

      } catch (error) {
        console.error('Error fetching data:', error);
        this.items = [];
      }
      this.isLoading = false;
    }, 
  },
};
</script>



<template>
  <v-app>
    <!-- Main Content -->
    <v-main>
      <v-container v-if="isLoading">
        <v-row justify="center">
          <v-col cols="auto">
            <v-progress-circular
              indeterminate
              color="primary"
              size="64"
              width="4"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="!isLoading">
        <v-row justify="end">
          <v-btn color="primary" @click="dialogVisible = true">
            Add New Asistent
          </v-btn>
        </v-row>
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
        <AddAssistentDialog  v-model="dialogVisible"  
     />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Optional: Custom styles if needed */
</style>
