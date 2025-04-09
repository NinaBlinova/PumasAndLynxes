<template>
  <div class="popup-card">
    <img :src="photo" :alt="species" class="popup-image" />
    <div class="popup-content">
      <h3 class="popup-title">{{ species }}</h3>
      <p class="popup-subspecies">{{ subspecies }}</p>
      <p class="popup-population">Популяция: {{ population || 'Неизвестно' }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  photo: String,
  species: String,
  subspecies: String,
  population: [String, Number]
});
</script>

<style scoped>
.popup-card {
  display: flex;
  flex-direction: column;
  width: 220px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  font-family: 'Arial', sans-serif;
}

.popup-image {
  width: 100%;
  height: 130px;
  object-fit: cover;
}

.popup-content {
  padding: 10px;
}

.popup-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.popup-subspecies {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.popup-population {
  font-size: 0.85rem;
  color: #333;
}
</style>
