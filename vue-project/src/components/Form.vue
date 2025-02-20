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
      <v-btn height="26px" elevation="0" class="custom-btn" type="button" @click="updateBtn()"
        >Update</v-btn
      >
      <!-- v-on med @click-->
    </form>
  </div>
  <!-- kan även skrivas såhär
  vue
  <p>Copyright: {{ copyright || "No copyright information." }}</p>
  och i fetchAPOD():
  
  javascript
  this.copyright = data.copyright; // Ta bort fallback-strängen här-->
</template>
<style scoped>
  * {
    box-sizing: border-box;
    width: 100%;
    transition: ease all 0.2s;
  }
  div {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 250px;
    gap: 6px; /* mellanrum mellan input o button */
  }

  input {
    width: 150px;
    padding: 0 4px 0 10px; /* padding vid border */
    border: solid 1px #ffffff49;
    border-radius: 4px;
    height: 28px;
  }

  button {
    width: 90px;
    /* !! height ändras i template v-btn */
  }
  /* INOUT HOVER */
  input::before {
    background-color: transparent;
    transition: ease all 0.4s;
  }
  input:hover {
    background-color: #444444;
    transition: ease all 0.4s;
  }
  /* DATE PICKER ICON */
  input[type='date']::-webkit-calendar-picker-indicator {
    padding: 4px 6px;
    border-radius: 2px;
  }
  input[type='date']::-webkit-calendar-picker-indicator:hover {
    background-color: rgb(108, 108, 108);
  }
  /* BUTTON HOVER */
  .custom-btn::before {
    background-color: transparent;
    transition: ease all 0.4s;
  }

  .custom-btn:hover {
    color: #fff;
    background-color: #515151;
    transition: ease all 0.4s;
  }

  /* MOBIL */
  @media only screen and (max-width: 400px) {
    form {
      width: 235px;
      height: 24px;
    }

    button {
      width: 80px;
    }
  }
</style>
