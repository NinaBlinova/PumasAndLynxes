<template>
  <div class="map-container">
    <div ref="mapContainer" style="height: 600px; width: 100%"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Импорт данных GeoJSON
import lynxHabitat from '../static/data/data_0.json';

const mapContainer = ref(null);

onMounted(() => {
  // Инициализация карты
  const map = L.map(mapContainer.value).setView([55.0, 40.0], 3);

  // Добавление базового слоя
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Проверка загрузки данных
  console.log('GeoJSON data:', lynxHabitat);

  // Стиль для ареала рыси
  const lynxStyle = {
    fillColor: '#3498db',
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  };

  // Добавление GeoJSON на карту
  const geoJsonLayer = L.geoJSON(lynxHabitat, {
    style: lynxStyle,
    onEachFeature: (feature, layer) => {
      console.log('Processing feature:', feature);

      // Проверяем наличие свойств
      if (feature.properties) {
        console.log('Feature properties:', feature.properties);

        // Создаем содержимое popup
        const popupContent = `
          <h3>${feature.properties.scientific || feature.properties.binomial || 'Рысь'}</h3>
          <p><strong>Категория IUCN:</strong> ${feature.properties.category || 'Не указано'}</p>
          <p><strong>Ареал:</strong> ${feature.properties.presence || 'Не указано'}</p>
          <p><small>Источник: IUCN Red List</small></p>
        `;

        // Привязываем popup к слою
        layer.bindPopup(popupContent);

        // Добавляем обработчик клика для отладки
        layer.on('click', () => {
          console.log('Layer clicked:', feature);
        });
      }
    }
  }).addTo(map);

  // Проверяем, что слои добавлены
  console.log('GeoJSON layer:', geoJsonLayer);
});
</script>

<style scoped>
.map-container {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

h1 {
  text-align: center;
  font-size: 1.5rem;
}
</style>