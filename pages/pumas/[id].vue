<template>
  <div class="animal-page">
    <!--    <pre>{{ lynx }}</pre>-->

    <div class="logo-container">
      <NuxtLink to="/pumas">
        <img src="/logo.png" alt="Логотип" class="logo">
      </NuxtLink>
    </div>

    <div class="animal-header"><h1>{{ puma.caption }}</h1></div>
    <div class="animal-grid">
      <div class="animal-image">
        <img :src="`/${puma.imageName}`" v-if="puma.imageName" :alt="puma.caption" class="my-img"/>
      </div>

      <div class="animal-description">
        <p>{{ puma.description }}</p>
      </div>

      <div class="animal-facts">
        <h2>Интересные факты</h2>
        <ul>
          <li>{{ puma.fact1 }}</li>
          <li>{{ puma.fact2 }}</li>
          <li>{{ puma.fact3 }}</li>
          <li>{{ puma.fact4 }}</li>
          <li>{{ puma.fact5 }}</li>
        </ul>
      </div>

      <div>
        <img :src="`/${puma.imgName2}`" v-if="puma.imgName2" :alt="puma.caption" class="my-img"/>
      </div>
    </div>
  </div>


  <div class="map2"> bla bla</div>
</template>

<script setup>
import {useRoute} from 'vue-router'

const route = useRoute()

const puma = await queryCollection('pumas')
    .where('slug', '=', route.params.id)
    .first();

console.log('Загруженные данные:', puma)
</script>

<style scoped>
.logo-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
}

.logo {
  width: 80px; /* Фиксированный размер */
  height: auto;
}

.animal-header {
  text-align: center;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.animal-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.animal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 30px;
  grid-template-areas:
    "image description"
    "facts gallery";
}

.animal-image {
  grid-area: image;
}

.my-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.animal-description {
  grid-area: description;
  align-self: center;
  text-align: justify;
  text-indent: 40px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}

.animal-facts {
  grid-area: facts;
  background: #f8f8f8;
  border-radius: 10px;
  text-indent: 40px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}

.animal-facts h2 {
  color: #333;
  margin-bottom: 15px;
}

.animal-facts ul {
  list-style-type: none;
  padding: 0;
}

.animal-facts li {
  margin-bottom: 10px;
  position: relative;
  padding: 0 25px;
}

.animal-facts li:before {
  content: "•";
  color: #FFC943;
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  top: -3px;
}


/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .animal-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "image"
      "description"
      "facts"
      "gallery";
  }

  .animal-header h1 {
    font-size: 2rem;
  }
}

.map2 {
  width: 90%; /* Задаем ширину 60% от экрана */
  height: auto; /* Высота карты будет адаптироваться */
  background: #ccc; /* Примерный фон для карты */
  margin-top: 3%;
  margin-left: auto;
  margin-right: auto;
  padding: 5vw; /* Добавляем отступы внутри карты */
  border-radius: 10px; /* Скругляем углы */
  box-sizing: border-box; /* Учитываем padding в размерах */
  margin-bottom: 3vw; /* Добавляем отступ снизу, чтобы подвал не упирался в элемент */
}
</style>