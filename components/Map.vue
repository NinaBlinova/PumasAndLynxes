<template>
  <div v-if="isVisible" class="legend-popup">
    <div class="legend-content">
      <button @click="closePopup" class="close-btn">X</button>
      <img :src="animalPhoto" alt="Animal photo" class="animal-photo" />
      <div class="animal-info">
        <h3>{{ species }}</h3>
        <p><strong>Подвид:</strong> {{ subspecies }}</p>
        <p><strong>Численность:</strong> {{ population }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Пропсы для передачи данных
const props = defineProps({
  animalPhoto: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  subspecies: {
    type: String,
    required: true
  },
  population: {
    type: String,
    required: true
  }
});

// Логика видимости попапа
const isVisible = ref(false);

// Функция для открытия попапа
const openPopup = () => {
  isVisible.value = true;
};

// Функция для закрытия попапа
const closePopup = () => {
  isVisible.value = false;
};

// Внешняя функция для вызова открытия (можно будет вызвать из другого компонента)
const triggerPopup = (data) => {
  animalPhoto.value = data.photo;
  species.value = data.species;
  subspecies.value = data.subspecies;
  population.value = data.population;
  openPopup();
};
</script>

<style scoped>
.legend-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 300px;
  width: 100%;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.legend-content {
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.animal-photo {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.animal-info {
  text-align: left;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
