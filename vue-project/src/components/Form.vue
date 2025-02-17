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
  import { ref, defineEmits } from 'vue'

  const emit = defineEmits(['update-date'])
  const selectedDate = ref(new Date().toISOString().split('T')[0])

  const updateBtn = () => {
    emit('update-date', selectedDate.value)
  }
</script>
<template>
  <div>
    <!-- formulär för att välja datum-->
    <form>
      <!-- v-modeln binder input-fältet till selectedDate. när användaren väljer datum uppdateras det automatiskt 
         @click="updateBtn()" när button klickas på körs metoden updateBtn() som kör fetchAPOD-->

      <input
        type="date"
        v-model="selectedDate"
        placeholder="Pick a date"
        aria-label="Enter a date"
      />
      <button class="button" type="button" @click="updateBtn()">Update</button>
    </form>
    <!-- Titel och datum visas här -->

    <!-- kan även skrivas såhär
      vue
  Copy
  <p>Copyright: {{ copyright || "No copyright information." }}</p>
  och i fetchAPOD():
  
  javascript
  Copy
  this.copyright = data.copyright; // Ta bort fallback-strängen här-->
  </div>
</template>
