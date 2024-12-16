  
  <script>
  import axiosInstance from '@/axios';
  import RefuzeExam from '@/components/RefuzeExam.vue';
  
  export default {
    name: 'EditExam',
    components: {
      // Add any components used here
      RefuzeExam,
    },
    // props: {
    //   id: {
    //     type: String,
    //     required: true,
    //   },
    //   data: {
    //     type: Object,
    //     required: true,
    //     default: () => JSON.parse(this.$route.query.data),
    //   },
    // },

    created() {

    this.examId = this.$route.query.id;
 
    try {
      // Parse the JSON string back to an object
      this.examData = JSON.parse(this.$route.query.data);
      this.fetchAssistenti();
    
      this.selectedClass = this.examData.salaid;
      this.selectedAsistent = this.examData.asistentid;
      this.selectedDate = this.reverseIsoDate(this.examData.data);
    } catch (e) {
      console.error('Error parsing query data:', e);
      this.examData = null; // Default to null if parsing fails
    }

  },
    data() {
      return {
        assistentName: '',
        examId: null,
        examData: null,
        selectedClass: null,
        selectedAsistent: null,
        selectStartDate: null,
        selectEndDate: null,
        assistents: [],
        sali: [],
        dialogVisible: false,

        selectedDate: null,
        loading: false,
        validationError: '',
        dataFetched: false, // Track if data has been fetched to prevent redundant calls
        additionalData: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
        generatedIntervals: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
        dropdownItems: [], // Data for v-autocomplete dropdown
        items: [], // Data for v-autocomplete dropdown
        motiv: '',
      };
    },

    methods: {
      async fetchAssistenti() {
        this.loading = true;
        try {             
     
          const id =this.examData.profesorid;
          const request =await axiosInstance.get(`/asistenti/${id}`);         
     
          for( var i = 0; i < request.data.length; i++ )
            {
              this.assistents.push(request.data[i]);
            }
        } catch (error) {
         console.error('Error fetching data:', error);
          this.items = [];
        } finally {
          this.loading = false;

        }
      },
      reverseIsoDate(isoDateString) {
    // Descompune string-ul folosind destructurare
    const [year, month, day] = isoDateString.split('-').map(Number);

    // Creează un obiect Date folosind valorile descompuse
    const date = new Date(year, month - 1, day); // Lunile sunt 0-indexate

    return date;
}
,
     convertToIsoDate() {
    // Parsează data folosind obiectul Date
    const date = new Date(this.selectedDate);

    // tatează în YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Luna începe de la 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
      },
  


    async fetchSali(newSelectedValue) {
      this.dropdownItems = [];
      if (!newSelectedValue) {
        return;
      }
      try {
        const request = await axiosInstance.get(`/sali/dupanume/${newSelectedValue}`);
        this.dropdownItems = request.data; // Update the items with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        this.dropdownItems = []; // Clear items if there's an error
      }
    },

      async submitForm() {
        this.validationError = '';
  
        if (!this.selectedAsistent) {
          this.selectedAsistent = this.examData.assistantId;
    
        }
        if (!this.selectedClass) {
          this.selectedClass = this.examData.idSala;
    
        }
        if (!this.selectStartDate) {
          this.selectStartDate = this.examData.oraStart;
     
        }
        if (!this.selectEndDate) {
          this.selectEndDate = this.examData.oraStop;
     
        }
        if (!this.selectedDate) {
          this.selectedDate = this.reverseIsoDate(this.examData.data);
    
        }
  
        this.loading = true;
        const idUtilizator = localStorage.getItem('id');
     
        const formData = 
            {
            "id": this.examId,
            "asistentid": this.selectedAsistent,
            "orastart": this.selectStartDate,
            "orafinal": this.selectEndDate,
            "actualizatde": idUtilizator,
            "salaid": this.selectedClass,
            "data": this.convertToIsoDate(),
            "sefid": this.examData.sefid,
            "motiv": this.motiv
          }
         
         
        console.log(formData)
        try {
          const response = await axiosInstance.put('/examen', formData);
          console.log(response.status);
          if (response.status === 200 || response.status === 201) {
            this.$emit('submit', formData);
            this.$router.push({ name: 'ViewAllExams' });
          }
        } catch (error) {
          if(error.response.status === 418){
            console.error('Error submitting form:', error);
            this.validationError = 'Group does not possess a group lider';
          }else{
            console.error('Error submitting form:', error);
            this.validationError = 'Failed to submit the form. Please try again.';
          }
        } finally {
          this.loading = false;
        }
      },
  
      closeDialog() {
        this.$router.push({ name: 'CreateTeachers' });
      },
  
      resetForm() {
        this.selectedDate = null;
        this.selectedClass = null;
        this.validationError = '';
        this.dataFetched = false; // Reset dataFetched so data can be fetched again next time
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optionally, you can add styles here */
  </style>
  


  <template>
    <v-row
      justify="center"
      align="center"
      class="full-height"
    >
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4" persistent>
          <v-card-title>
            <span class="headline">Edit Exam</span>
          </v-card-title>
  
          <v-card-text>
            <!-- Loading Spinner -->
            <v-row v-if="loading" justify="center">
              <v-col cols="auto">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  size="64"
                  width="4"
                ></v-progress-circular>
              </v-col>
            </v-row>
            <v-row v-if="!loading" justify="center">
              <v-col cols="auto">
                <v-date-picker v-model="selectedDate" label="Select Date"></v-date-picker>
              </v-col>
            </v-row>
            <!-- Asistent pick -->
            <v-autocomplete
            v-model="selectedClass"
            clearable
            :label='this.examData.numeSala'
            :items="dropdownItems"
            item-title="nume"
            item-value="id"
            @update:search="fetchSali"
            class="min-width-200"
          ></v-autocomplete>
            <!-- Start Date Select -->
            <v-select
              v-model="selectStartDate"
              :label="this.examData.oraStart"
              :items="additionalData"
              item-title="ora_start"
              clearable
              ></v-select>
  
            <!-- End Date Select -->
            <v-select
              v-model="selectEndDate"
              :label="this.examData.oraStop"
              :items="generatedIntervals"
              item-title="ora_end"
              clearable
            ></v-select>
            <v-select

              v-model="selectedAsistent"
              :label="this.examData.assistantName"
              :items="assistents"
              item-title="nume"
              item-value="id"
              clearable
            ></v-select>

               <!-- Text box for reason -->
          <v-textarea
            v-model="motiv"
            label="Reason"
            outlined
            rows="1"
            clearable
          ></v-textarea>
            <!-- Error Message -->
            <v-alert v-if="validationError" type="error" class="mt-3">
              {{ validationError }}
            </v-alert>
          </v-card-text>

       
  
          <v-card-actions>
            <v-row justify="end">
              <v-btn text @click="closeDialog" :disabled="loading">Cancel</v-btn>
              <v-btn text @click="this.dialogVisible = true" :disabled="loading" color="error">Delete</v-btn>
              <v-btn color="primary" @click="submitForm" :loading="loading" :disabled="loading">Submit</v-btn>
            </v-row>
          </v-card-actions>
          <RefuzeExam v-model="dialogVisible" :id="this.examId" :is-teacher="false"
          /> 
        </v-card>
      </v-col>
    </v-row>
  </template>
  
