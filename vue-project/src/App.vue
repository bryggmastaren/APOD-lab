<script setup>
  import { ref, onMounted } from 'vue'
  import { RouterView } from 'vue-router'
  import Form from './components/Form.vue'

  // import { Forms } from './components/Form.vue'

  // gör om till comp api lol :/

  const selectedDate = ref(new Date().toISOString().split('T')[0]) //toISOtring koncerterar datum till sträng, och [0] gör att datumet är array0 och tid array1
  const title = ref('')
  const imageUrl = ref('')
  const explanation = ref('')
  const copyright = ref('')
  const isVideo = ref(false) // För att kontrollera om det är en video
  const defaultImageUrl = ref('media/favicon(1).ico') // Fallbackbild om ingen bild hämtas

  // funktion HÄMTA DATA från API
  //((ersätter "methods" från options api))
  const fetchAPOD = async () => {
    const apiKey = 'bLKsuQaFpHG3mK8eo9UwyCI1RXpF9CKf8DqVYmiW'
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate.value}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      title.value = data.title || 'No Title'
      imageUrl.value = data.url || defaultImageUrl.value //  Hämta hdurl annars fallback bilden
      explanation.value = data.explanation || 'No explanation'
      copyright.value = data.copyright || 'No Title'
      isVideo.value = data.media_type === 'video'
    } catch (error) {
      console.error('Fetch error:', error)
      alert('Failed to fetch data. Please try again later.') // Felmeddelande till användarn
    }
  }

  const updateBtn = () => {
    //när updateBtn klickas, kör fetchAPOD
    fetchAPOD()
  }

  onMounted(() => {
    fetchAPOD()
  })
</script>

<template>
  <Form @update-date="update - date" />
  <h1>{{ title }}</h1>
  <!-- <p> {{ selectedDate }}</p> VISA DATUM -->

  <!-- Bilden/videon visas här. v-bind används genom ":" innan "src" -->
  <div v-if="isVideo">
    <video :src="imageUrl" controls alt="astro video"></video>
  </div>
  <div v-else>
    <img :src="imageUrl || defaultImageUrl" alt="astro bild" class="apod-image" />
  </div>

  <!--beskrivning o copyright -->
  <p id="explan">{{ explanation }}</p>
  <p id="copyright">Copyright: {{ copyright }}</p>
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
