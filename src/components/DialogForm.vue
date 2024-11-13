<template>
  <v-dialog v-model="dialogVisible" persistent max-width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">Teacher Form</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="formValid">
          <!-- Nume -->
          <v-text-field 
            v-model="name" 
            label="Name" 
            required
            :rules="nameRules"
          ></v-text-field>
          
          <!-- Email -->
          <v-text-field 
            v-model="email" 
            label="Email" 
            required
            :rules="emailRules"
            type="email"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="submitForm" :disabled="!formValid">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogForm',
  props: {
    modelValue: Boolean, // Controls the visibility of the dialog
  },
  emits: ['update:modelValue', 'submit'], // Emit the 'submit' event
  data() {
    return {
      dialogVisible: this.modelValue, // Local state to control the dialog visibility
      name: '',
      email: '',
      formValid: false, // Track the form's validity state
      // Rules for Name field
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 3) || 'Name must be at least 3 characters long',
      ],
      // Rules for Email field
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  watch: {
    modelValue(newValue) {
      this.dialogVisible = newValue;
    },
  },
  methods: {
    submitForm() {
      const formData = { name: this.name, email: this.email };
      this.$emit('submit', formData); // Emit the form data
      this.$emit('update:modelValue', false); // Close the dialog
    },
    closeDialog() {
      this.$emit('update:modelValue', false); // Close the dialog
    },
  },
};
</script>
