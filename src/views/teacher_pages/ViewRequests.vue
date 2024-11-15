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
            const student = await axiosInstance.get('/user/info/' + response.data[i].sefid);
            const materie = response.data[i].materie;
            console.log(student.data);
           this.items.push({
            numeMaterie: materie.nume,
            numeElev: student.data.nume,
            id: response.data[i].id,
            data: response.data[i].data,
           });
         }

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
            v-for="item in items"
            :key="item.id"
            cols="12"  md="6" lg="5" xl="3"
          >
            <Card
         
             :title="item.numeMaterie"
              :subtitle="item.numeElev"
              :description="item.data"
              :buton-name="'Check out'"
              @card-click=""
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
