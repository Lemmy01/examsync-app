<template>
    
      <v-card>
        <v-card-title>
          <span class="headline">Teacher Form</span>
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
          <!-- Asistent pick -->
          <v-select
            v-model="pickAsistent"
            label="Select Assistent"
            :items="assistents"
            item-title="nume"
            item-value="id"
            clearable
          ></v-select>
          <!-- Subject Select -->
          <v-select
            v-model="selectedClass"
            label="Select Class"
            :items="sali"
            item-title="nume"
            item-value="id"
            clearable
          ></v-select>
  
          <!-- Error Message -->
          <v-alert v-if="validationError" type="error" class="mt-3">
            {{ validationError }}
          </v-alert>
  
        
        </v-card-text>
  
        <v-card-actions>
          <v-btn text @click="closeDialog" :disabled="loading">Cancel</v-btn>
          <v-btn color="primary" @click="submitForm" :loading="loading" :disabled="loading">Submit</v-btn>
        </v-card-actions>
      </v-card>
  </template>
  
  <script>
  import axiosInstance from '@/axios';
  
  export default {
    name: 'FillRequest',
    props: {
    },
    emits: ['update:modelValue', 'submit'],
    data() {
      return {
        selectedClass: null,
        pickAsistent: null,
        assistents: [],
        sali: [],
        loading: false,
        validationError: '',
        dataFetched: false, // Track if data has been fetched to prevent redundant calls
      };
    },
    async created() {
    await this.fetchData();
   },
    methods: {
      async fetchData() {
        this.loading = true;
        try {
          const id =  localStorage.getItem('id');
            const request =await axiosInstance.get('/asistenti/' + id);
            console.log(request);
         
          this.dataFetched = true; // Mark data as fetched

        } catch (error) {
        
        } finally {
          this.loading = false;

        }
      },
  
      async submitForm() {
        this.validationError = '';
  
        if (!this.selectedDate) {
          this.validationError = 'Please select a date.';
          return;
        }
        if (!this.selectedClass) {
          this.validationError = 'Please select a subject.';
          return;
        }
  
        this.loading = true;
        const formData = {
          data: this.selectedDate,
          materieid: this.selectedClass,
          sefid: localStorage.getItem('id'),
          profesorid: this.profesorId,
        };
  
        try {
          const response = await axiosInstance.post('/examen', formData);
          if (response.status === 200 || response.status === 201) {
            this.$emit('submit', formData);
            this.closeDialog();
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          this.validationError = 'Failed to submit the form. Please try again.';
        } finally {
          this.loading = false;
        }
      },
  
      closeDialog() {
        this.resetForm();
        this.$emit('update:modelValue', false);
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
  