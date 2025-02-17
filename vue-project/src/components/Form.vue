<!--<template>
    <form>
      <input type="date" id="dateInput" v-model="selectedDate" placeholder="Pick a date" aria-label="Enter a date">
      <button class="button" type="button" @click="updateBtn">Update</button>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      selectedDate: String
    },
    methods: {
      updateBtn() {
        this.$emit('update-date', this.selectedDate);
      }
    }
  };
  </script>-->


<script setup>
import { RouterView } from 'vue-router'
</script>