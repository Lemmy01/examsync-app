<script>
import Card from '@/components/Card.vue';
import DialogForm from '@/components/DialogForm.vue';
import axiosInstance  from '@/axios';

export default {
  name: 'ViewRequests',
  components: {
    Card,
    DialogForm,
  },
  data() {
    return {
      items: [], // Initialize items as an empty array
      dialogVisible: false, // Manage dialog visibility
      isLoading: true, // Track loading state

    };
  },
  async created(){
  await  this.fetchData();
  },
 
  methods: {
    handleCardClick(itemId) {
      this.$router.push({ name: 'FillRequests', });
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const id = localStorage.getItem('id');
        const response = await axiosInstance.get('/examen/' + id);
        console.log(response.data);
      
       for( var i = 0; i < response.data.length; i++ )
         {
            const student = await response.data[i].sef;
            const materie = response.data[i].materie;
           this.items.push({
            numeMaterie: materie.nume,
            numeElev: student.nume,
            id: response.data[i].id,
            data: response.data[i].data,
           });
         }

      } catch (error) {
        console.error('Error fetching data:', error);
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
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"  md="6" lg="5" xl="3"
          >
            <Card
         
             :title="item.numeMaterie"
              :subtitle="item.numeElev"
              :description="item.data"
              :buton-name="'Check out'"
              @card-click="handleCardClick(item.id)"
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
