<script>
import Card from '@/components/Card.vue';
import DialogForm from '@/components/DialogForm.vue';
import axiosInstance  from '@/axios';
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'Exams',
  components: {
    Card,
    DialogForm,
  },

  data() {
    return {
      items: [], // Initialize items as an empty array
      dialogVisible: false, // Manage dialog visibility
      isLoading: true, // Track loading state
      stare: 'Approved',
      filterOptions: ['Approved', 'Pending', 'Rejected'],
      noData: false,
    };
  },
  async created(){
  await  this.fetchData();
  },
 
  methods: {
    handleCardClick(data,id) {
      this.$router.push({ name: 'FillRequests',params: { date: data ,id: id}  });
    },
    async fetchData() {
      this.noData = false;
      this.isLoading = true;
      try {
        this.items = [];
        const id = localStorage.getItem('id');
        console.log(`/examen/studentdupastare/${id}/${this.stare.toLocaleLowerCase()}`);
        const response = await axiosInstance.get(`/examen/studentdupastare/${id}/${this.stare.toLocaleLowerCase()}`);
       
       for( var i = 0; i < response.data.length; i++ )
         {
            const student = await response.data[i].sef;
            const materie = response.data[i].materie;
            this.items.push({
            numeMaterie: materie.nume,
            numeElev: student.nume,
            id: response.data[i].id,
            data: response.data[i].data,
            oraStart: response.data[i].orastart,
            oraStop: response.data[i].orafinal,
            numeSala: this.stare === "Approved" ? response.data[i].sala.nume : '',
           });
         }
          
          if(this.items.length === 0) {
            this.noData = true;
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
      <!-- Loading State -->
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
        <v-row justify="end" class="mb-4">
          <v-col cols="auto">
            <v-select
              v-model="stare"
              :items="filterOptions"
              label="Filter by"
              dense
              outlined
              style="max-width: 200px"
              @update:model-value="fetchData"
            />
          </v-col>
        </v-row>
      </v-container>
      <!-- Filter Dropdown -->
      <v-container v-if="!isLoading && !noData">

        <!-- Items List -->
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"  md="6" lg="5" xl="3"
          >
            <Card   
              :title="item.numeMaterie"
              :subtitle="this.stare =='Approved'? item.numeSala : item.numeElev"
              :description="this.stare !='Approved'?'' : `${item.data}  ${item.oraStart} - ${item.oraStop}`"         
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- No Data Message -->
      <v-container v-if="!isLoading && noData">
        <v-row>
          <v-col>
            <p class="font-weight-black">
              No exams available
            </p>
          </v-col>
        </v-row>
      </v-container>

    </v-main>
  </v-app>
</template>


<style scoped>
/* Optional: Custom styles if needed */
</style>
