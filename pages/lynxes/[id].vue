<template>
  <div class="animal-page">
    <div class="animal-header"><h1>{{ lynx.caption }}</h1></div>
    <div class="animal-grid">
      <div class="animal-image">
        <img :src="`/${lynx.imageName}`" v-if="lynx.imageName" :alt="lynx.caption" class="my-img"/>
      </div>

      <div class="animal-description">
        <p>{{ lynx.description }}</p>
      </div>

      <div class="animal-facts">
        <h2>Интересные факты</h2>
        <ul>
          <li>Продолжительность жизни: 10-15 лет</li>
          <li>Ареал обитания: Северные леса</li>
          <li>Особенности: Кисточки на ушах</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'

const route = useRoute()

const lynx = await queryCollection('lynxes')
    .where('slug', '=', route.params.id)
    .first();

console.log('Загруженные данные:', lynx)

</script>


<style scoped>
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
}

.animal-description p {
  text-indent: 40px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}

.animal-facts {
  grid-area: facts;
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
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
  padding-left: 25px;
  position: relative;
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
</style>