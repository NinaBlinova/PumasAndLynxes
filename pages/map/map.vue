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

  // ✅ Попап
  const popup = new Overlay({
    element: popupElement.value!,
    positioning: 'bottom-center',
    stopEvent: false
  })
  map.addOverlay(popup)

  map.on('pointermove', (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f)
    const element = popup.getElement()

    if (feature && element) {
      const properties = feature.getProperties()
      element.innerHTML = ` <strong>${properties.name || 'Неизвестная область'}</strong><br> Вид: ${properties.species || 'Не указано'}<br> Численность: ${properties.population ?? 'Неизвестно'}`
      popup.setPosition(e.coordinate)
      element.style.display = 'block'
    } else if (element) {
      element.style.display = 'none'
    }
  })
})
</script>

<template>
  <div>
    <h1>Ареалы обитания рыси</h1>
    <div
        ref="mapElement"
        style="width: 100%; height: 600px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;"
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
        style="display: none; background: white; padding: 5px 10px; border-radius: 3px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); position: absolute;">
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #333;
  margin-bottom: 20px;
}

.legend {
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  display: inline-block;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.legend-color {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #333;
}
</style>
