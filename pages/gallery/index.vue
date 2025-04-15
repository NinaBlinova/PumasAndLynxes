<template>
  <div class="gallery-page">
    <h1 class="page-title">Галерея</h1>
    <div class="filter-controls">
      <label>
        <input type="checkbox" v-model="filter.puma"/> Пума
      </label>
      <label>
        <input type="checkbox" v-model="filter.lynx"/> Рысь
      </label>
      <button @click="resetFilter">Сбросить фильтры</button>
    </div>

    <div class="add-photos">
      <button @click="showForm = true">Добавить новую фотографию</button>

      <PhotoUploadForm
          v-if="showForm"
          class="upload-form-overlay"
          @submit="handlePhotoSubmit"
          @close="showForm = false"
      />
    </div>

    <div class="gallery-grid">
      <Carousel
          v-for="(photo, index) in filteredPhotos"
          :key="index"
          :imageName="photo.imageName"
          :caption="photo.caption"
          :description="photo.description"
          :initialTags="photo.tags"
      />
    </div>
  </div>
</template>

<script setup>
import Carousel from "../components/Carousel.vue"
import PhotoUploadForm from "../components/PhotoUploadForm.vue";
import {ref, reactive, computed} from "vue";

const filter = reactive({
  puma: false,
  lynx: false
});


const myPhoto = ref([]);

// Загружаем данные только в браузере
onMounted(() => {
  const savedPhotos = sessionStorage.getItem("galleryPhotos");
  if (savedPhotos) {
    myPhoto.value = JSON.parse(savedPhotos);
  } else {
    myPhoto.value = [
      {
        imageName: "CanadianLynxPage2.png",
        caption: "Рысь",
        description: "Канадская рысь",
        tags: ['lynx'] // тег устанавливается здесь
      },
      {
        imageName: "PumaConcolorCostaricensisPageD.png",
        caption: "Пума",
        description: "Горная пума",
        tags: ['puma'] // тег устанавливается здесь
      },
      {
        imageName: "RedLynxPageD3.png",
        caption: "Рысь",
        description: "Красная рысь",
        tags: ['lynx'] // тег устанавливается здесь
      },
      {
        imageName: "EurasianLynxPageD3.png",
        caption: "Рысь",
        description: "Евразийская рысь",
        tags: ['lynx'] // тег устанавливается здесь
      },

      {
        imageName: "Puma1.png",
        caption: "Пума",
        description: "Пума",
        tags: ['puma'] // тег устанавливается здесь
      },

      {
        imageName: "Puma2.png",
        caption: "Пума",
        description: "Пума",
        tags: ['puma'] // тег устанавливается здесь
      }
    ];
  }
});


function resetFilter() {
  filter.puma = false;
  filter.lynx = false;
}

const filteredPhotos = computed(() => {
  if (!filter.puma && !filter.lynx) {
    return myPhoto.value;
  }

  return myPhoto.value.filter(photo => {
    const hasPuma = filter.puma && photo.tags.includes('puma');
    const hasLynx = filter.lynx && photo.tags.includes('lynx');

    return hasPuma || hasLynx;
  });
});


const handlePhotoSubmit = (newPhoto) => {
  myPhoto.value.push(newPhoto);
  sessionStorage.setItem("galleryPhotos", JSON.stringify(myPhoto.value));
  showForm.value = false;
};

const showForm = ref(false);

</script>

<style scoped>

.add-photos {
  margin-bottom: 20px;
}

.upload-form-overlay {
  position: absolute;
  background-color: #E6E6E6;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-title {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.gallery-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-page h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #333;
}

.filter-controls {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
}

.filter-controls label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.filter-controls button {
  padding: 5px 10px;
  background: #ddd;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-controls button:hover {
  background: #ccc;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>