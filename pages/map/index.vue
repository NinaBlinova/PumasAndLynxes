<script setup lang="ts">
import {ref, onMounted} from 'vue'

// Ссылка на DOM элемент карты
const mapElement = ref<HTMLElement | null>(null)
const popupElement = ref<HTMLElement | null>(null)

onMounted(async () => {
  const {default: Map} = await import('ol/Map')
  const {default: View} = await import('ol/View')
  const {default: TileLayer} = await import('ol/layer/Tile')
  const {default: OSM} = await import('ol/source/OSM')
  const {default: GeoJSON} = await import('ol/format/GeoJSON')
  const {default: VectorLayer} = await import('ol/layer/Vector')
  const {default: VectorSource} = await import('ol/source/Vector')
  const {default: Style} = await import('ol/style/Style')
  const {default: Fill} = await import('ol/style/Fill')
  const {default: Stroke} = await import('ol/style/Stroke')
  const {default: Overlay} = await import('ol/Overlay')

  // ✅ Загружаем GeoJSON для ареала европейской рыси
  const responseEurasian = await fetch('/data/eurasian_lynx.json')
  const eurasionLynxRangeGeoJSON = await responseEurasian.json()

  // ✅ Загружаем GeoJSON для ареала иберийской рыси
  const responseIberian = await fetch('/data/iberian_lynx.json')
  const iberianLynxRangeGeoJSON = await responseIberian.json()

  // ✅ Загружаем GeoJSON для ареала канадской рыси
  const responseCanadian = await fetch('/data/canadian_lynx.json')
  const canadianLynxRangeGeoJSON = await responseCanadian.json()

  // ✅ Загружаем GeoJSON для ареала пум
  const responsePumas = await fetch('/data/puma.json')
  const pumasRangeGeoJSON = await responsePumas.json()

  // ✅ Стиль для ареала европейской рыси
  const rangeStyleEurasian = new Style({
    fill: new Fill({
      color: 'rgba(255, 87, 51, 0.5)' // оранжевый цвет для европейской рыси
    }),
    stroke: new Stroke({
      color: 'rgba(255, 87, 51, 1)',
      width: 2
    })
  })

  // ✅ Стиль для ареала иберийской рыси
  const rangeStyleIberian = new Style({
    fill: new Fill({
      color: 'rgba(0, 123, 255, 0.5)' // синий цвет для иберийской рыси
    }),
    stroke: new Stroke({
      color: 'rgba(0, 123, 255, 1)',
      width: 2
    })
  })

  // ✅ Стиль для ареала канадской рыси
  const rangeStyleCanadian = new Style({
    fill: new Fill({
      color: 'rgba(208,0,255,0.5)' // пурпурный цвет для канадской рыси
    }),
    stroke: new Stroke({
      color: 'rgba(208,0,255,0.5)',
      width: 2
    })
  })

  // ✅ Стиль для ареала пум
  const rangeStylePuma = new Style({
    fill: new Fill({
      color: 'rgba(123,255,0,0.5)' // зеленый цвет для пум
    }),
    stroke: new Stroke({
      color: 'rgba(123,255,0,0.5)',
      width: 2
    })
  })

  // ✅ Чтение GeoJSON для европейской рыси
  const vectorSourceEurasian = new VectorSource({
    features: new GeoJSON().readFeatures(eurasionLynxRangeGeoJSON, {
      featureProjection: 'EPSG:3857' // для корректного отображения на карте
    })
  })

  // ✅ Чтение GeoJSON для иберийской рыси
  const vectorSourceIberian = new VectorSource({
    features: new GeoJSON().readFeatures(iberianLynxRangeGeoJSON, {
      // EPSG:3857 — это система координат, используемая для веб-картографии
      featureProjection: 'EPSG:3857' // для корректного отображения на карте
    })
  })

  // ✅ Чтение GeoJSON для канадской рыси
  const vectorSourceCanadian = new VectorSource({
    features: new GeoJSON().readFeatures(canadianLynxRangeGeoJSON, {
      featureProjection: 'EPSG:3857' // для корректного отображения на карте
    })
  })

  // ✅ Чтение GeoJSON для пум
  const vectorSourcePuma = new VectorSource({
    features: new GeoJSON().readFeatures(pumasRangeGeoJSON, {
      featureProjection: 'EPSG:3857' // для корректного отображения на карте
    })
  })

  // ✅ Создаем слои для ареалов
  const vectorLayerEurasian = new VectorLayer({
    source: vectorSourceEurasian,
    style: rangeStyleEurasian
  })

  const vectorLayerIberian = new VectorLayer({
    source: vectorSourceIberian,
    style: rangeStyleIberian
  })

  const vectorLayerCanadian = new VectorLayer({
    source: vectorSourceCanadian,
    style: rangeStyleCanadian
  })

  const vectorLayerPuma = new VectorLayer({
    source: vectorSourcePuma,
    style: rangeStylePuma
  })
//интерактивная зоологическая выставка для курсовой работы
  // ✅ Карта
  const map = new Map({
    target: mapElement.value!,
    layers: [
      new TileLayer({
        source: new OSM()
      }),
      vectorLayerEurasian, // Слой для европейской рыси
      vectorLayerIberian,   // Слой для иберийской рыси
      vectorLayerCanadian, // Слой для канадской рыси
      vectorLayerPuma // Слой для пумы
    ],
    view: new View({
      center: [0, 0], // можно заменить позже
      zoom: 2
    })
  })

  // ✅ Авто-фит на область ареалов
  map.getView().fit(vectorSourceEurasian.getExtent(), {
    padding: [50, 50, 50, 50],
    duration: 1000
  })

  // ✅ Попап (всплывающее окно)
  const popup = new Overlay({
    element: popupElement.value!, // HTML-элемент попапа (передаем через ref)
    positioning: 'bottom-center',
    stopEvent: false // Позволяет событиям мыши "проходить сквозь" попап к карте
  })
  // Добавляем созданный попап на карту
  map.addOverlay(popup)

  // Обрабатываем движение курсора мыши по карте
  map.on('pointermove', (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f)
    const element = popup.getElement()

    if (feature && element) {
      // Получаем свойства объекта
      const properties = feature.getProperties()

      // Извлекаем данные с подстановкой значений по умолчанию
      const name = properties.name || 'Неизвестная область'
      const species = properties.species || 'Не указано'
      const population = properties.population ?? 'Неизвестно'
      const photo = properties.photo || '' // путь к фото

      // Формируем HTML-содержимое попапа
      element.innerHTML = `\n      <div class="Elements">\n        <strong>${name}</strong><br>\n        Вид: ${species}<br>\n        Численность: ${population}<br>\n        ${photo ? `<img src="${photo}" alt="${species}" style="max-width: 100%">` : ''}\n      </div>\n    `

      // Позиционируем попап в координатах курсора
      popup.setPosition(e.coordinate)

      // Показываем попап
      element.style.display = 'block'
    } else if (element) { // Если объекта под курсором нет, но попап существует
      element.style.display = 'none'
    }
  })
})
</script>

<template>
  <div>
    <h1>Ареалы обитания рыси и пумы</h1>
    <div
        ref="mapElement"
        style="width: 100%; height: 600px; border: 1px solid #ddd; border-radius: 8px;"
    ></div>

    <div class="legend">
      <div class="legend-item">
        <span class="legend-color" style="background-color: rgba(255, 87, 51, 0.5);"></span>
        <span>Ареал европейской рыси</span>
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background-color: rgba(0, 123, 255, 0.5);"></span>
        <span>Ареал иберийской рыси</span>
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background-color: rgba(208,0,255,0.5);"></span>
        <span>Ареал канадской рыси</span>
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background-color: rgba(123,255,0,0.5);"></span>
        <span>Ареал пум</span>
      </div>
    </div>

    <div
        ref="popupElement"
        class="Elements">
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #333;
  margin-bottom: 1.25rem;
  text-align: center;
  font-size: 2rem;
}

.legend {
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0;
}

.legend-color {
  /* элемент отображается как строчный, но его содержимое может быть отформатировано как блок */
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  border: 0.01rem solid #333;
  border-radius: 0.5rem;
}

.Elements {
  display: none;
  background: white;
  padding: 0.4rem 0.7rem;
  border-radius: 0.4rem;
  box-shadow: 0 0.2rem 0.25rem rgba(0, 0, 0, 0.2);
  max-width: 16rem;
}
</style>
