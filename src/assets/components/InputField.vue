<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  name: 'InputField',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<'text' | 'email' | 'password'>,
      default: 'text',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);

    const updateValue = () => {
      emit('update:modelValue', inputValue.value);
    };

    return {
      inputValue,
      updateValue,
    };
  },
});
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem;
}
</style>


<template>
    <div class="input-group">
      <label :for="id">{{ label }}</label>
      <input :type="type" :id="id" v-model="inputValue" @input="updateValue" required />
    </div>
  </template>
  
