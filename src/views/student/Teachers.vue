<template>
  <v-app>
    <!-- Main Content -->
    <v-main>
      <v-container>
        <!-- Search Field -->
        <v-row justify="center" class="mb-4">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="searchQuery"
              label="Search by name or department"
              outlined
              clearable
              append-icon="mdi-magnify"
              @click:append="performSearch"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

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

      <v-container v-if="!isLoading && !noData">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12" md="3"
          >
            <!-- Card Component with Create Request Button -->
            <Card
              :title="item.nume"
              :subtitle="item.departament"
              :description="item.telefon"
              :butonName="'Create request'"
              @card-click="item.dialogVisible = true"
              :showButton="true"
            />

            <!-- DialogForm Component for Each Item -->
            <DialogForm
              v-model="item.dialogVisible"
              :profesorId="item.id"
            />
          </v-col>
        </v-row>
      </v-container>

      <v-container v-if="!isLoading && noData">
        <v-row>
          <v-col>
            <p class="font-weight-black" style="text-align: center">
              No teachers available
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>







<script>
import Card from '@/components/Card.vue';
import DialogForm from '@/components/DialogForm.vue';
import axiosInstance from '@/axios';
// export default {
//   data() {
//     return {
//       isLoading: true, // Simulate loading state
//       searchQuery: "", // Data binding for search field
//       items: [
//         // Example items
//         { id: 1, nume: "John Doe", departament: "Math", telefon: "123456789", dialogVisible: false },
//         { id: 2, nume: "Jane Smith", departament: "Physics", telefon: "987654321", dialogVisible: false },
//         // Add more items as needed
//       ],
//     };
//   },
//   computed: {
//     filteredItems() {
//       // Filter items based on search query
//       const query = this.searchQuery.toLowerCase();
//       return this.items.filter(
//         (item) =>
//           item.nume.toLowerCase().includes(query) ||
//           item.departament.toLowerCase().includes(query)
//       );
//     },
//   },
//   mounted() {
//     // Simulate API loading delay
//     setTimeout(() => {
//       this.isLoading = false;
//     }, 1000);
//   },
// };
export default {
  name: 'TeacherPage',
  components: {
    Card,
    DialogForm,
  },
  data() {
    return {
      items: [], // Array of items with each item holding its own dialog visibility
      allItems: [], // Array of all items fetched from the API
      isLoading: false, 
      searchQuery: '',
      noData: false,
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    performSearch() {
      this.noData = false;
      if(this.searchQuery === '') {
        return;
      }
      if(this.searchQuery === null) {
        return;
      }
  
      this.isLoading = true;
      const itemsCopy = [...this.allItems];
      this.items = itemsCopy.filter((item) => {
        const searchQuery = this.searchQuery.toLowerCase();
        return item.nume.toLowerCase().includes(searchQuery) ;
      });
      this.isLoading = false;
      if(this.items.length === 0) {
        this.noData = true;
      }

    },
    async fetchData() {
      this.noData = false;
      this.isLoading = true;
      try {
        const response = await axiosInstance.get('/profesor');
        
        // Initialize items with dialogVisible set to false for each item
       this.allItems=this.items = response.data.map((profesor) => ({
          ...profesor,
          dialogVisible: false,  // Add dialogVisible to each item for independent control
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally{
        this.isLoading = false;
      }
    },
  },
};
</script>
