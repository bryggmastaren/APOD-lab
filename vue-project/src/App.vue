<script setup>
  import { ref, onMounted } from 'vue'
  import { RouterView } from 'vue-router'

  import Form from './components/Form.vue'
  import FetchAPOD from './components/FetchAPOD.vue'
  import Nav from './components/Nav.vue'

  // gör om till comp api lol :/

  const selectedDate = ref(new Date().toISOString().split('T')[0]) //toISOtring koncerterar datum till sträng, och [0] gör att datumet är array0 och tid array1
  const title = ref('')
  const imageUrl = ref('')
  const explanation = ref('')
  const copyright = ref('')
  const isVideo = ref(false) // För att kontrollera om det är en video
  const defaultImageUrl = ref('media/favicon(1).ico') // Fallbackbild om ingen bild hämtas

  const getVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    return match ? match[1] : null
  }
  // funktion för att uppdatera data när FetchAPOD skickar tillbaka data
  const updateData = (data) => {
    title.value = data.title
    imageUrl.value = data.imageUrl
    explanation.value = data.explanation
    copyright.value = data.copyright
    isVideo.value = data.isVideo
  }

  // funktion uppdaterar selectedDate när formuläret ändras
  const updateDate = (date) => {
    selectedDate.value = date
  }
</script>

<template>
  <!--<v-app> -->
  <!-- <Nav /> -->
  <!-- Formulärkomponenten-->
  <Form @update-date="updateDate" />
  <FetchAPOD :selectedDate="selectedDate" @update-data="updateData" />
  <h1>{{ title }}</h1>
  <!-- <p> {{ selectedDate }}</p> VISA DATUM -->

  <!-- Bilden/videon visas här. v-bind används genom ":" innan "src" -->
  <div v-if="isVideo">
    <iframe
      width="480"
      height="270"
      style="border-radius: 8px; margin: 20px"
      :src="`https://www.youtube.com/embed/${getVideoId(imageUrl)}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div v-else>
    <img :src="imageUrl || defaultImageUrl" alt="astro bild" class="apod-image" />
  </div>

  <!--beskrivning o copyright -->
  <p id="explan">{{ explanation }}</p>
  <p id="copyright">Copyright: {{ copyright }}</p>
  <!-- </v-app>-->
</template>

<style scoped>
  /* APOD bilden */
  .apod-image {
    max-width: 90%;
    max-height: 70vh;
    height: auto;
    /* behåller bildens proportioner */
    width: auto;
    /* behåller bildens proportioner */
    border-radius: 8px;
    /* Runda hörn */
    margin: 20px;
    /* Avstånd upp ner */
  }

  /*
div .apod-image{

}*/
</style>
