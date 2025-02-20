<script setup>
  import { ref, watch } from 'vue'

  // bestäm/definera props för att ta emot selectedDate från förälderkomponenten
  const props = defineProps({
    selectedDate: {
      type: String,
      required: true,
    },
  })
  // bestäm/definera emits för att skicka tillbaka data till förälderkomponenten
  const emit = defineEmits(['update-data'])

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
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${props.selectedDate}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      // uppdatera lokala refs
      title.value = data.title || 'No Title'
      imageUrl.value = data.url || defaultImageUrl.value //  Hämta hdurl annars fallback bilden
      explanation.value = data.explanation || 'No explanation'
      copyright.value = data.copyright || 'No Title'
      isVideo.value = data.media_type === 'video'

      // Skicka data tillbaka till förälderkomponenten
      emit('update-data', {
        title: title.value,
        imageUrl: imageUrl.value,
        explanation: explanation.value,
        copyright: copyright.value,
        isVideo: isVideo.value,
      })
    } catch (error) {
      console.error('Fetch error:', error)
      alert('Failed to fetch NASA data. Please try again later.') // Felmeddelande till användarn
    }
  }

  //kolla efter ändringar i selectedDate, kör fetchAPOD
  watch(() => props.selectedDate, fetchAPOD, { immediate: true })
</script>

<template></template>
