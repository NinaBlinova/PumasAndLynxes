<template>
  <div class="pumas-page">
    <div class="header">
      <h1 class="page-title">Пумы</h1>
      <p class="page-subtitle">Здесь вы найдете информацию о пумах.</p>
    </div>
    <div class="cards-container">
      <Card v-for="(c, index) in myCats"
            :key="index" :imageName="c.imageName" :caption="c.caption" :description="c.description" :link= "c.link"/>
    </div>
  </div>
</template>

<script setup>
import Card from "../components/Card.vue"
import {reactive} from "vue";


const myCats = reactive([
  {
    imageName: "PumaConcolorCouguar.png",
    caption: "Восточная пума",
    description: "Восточная пума распространёна в Северной Америке (от юга Канады до Гватемалы и Белиза);, включает редких флоридских пум. ",
    link: "pumas/couguar"
  },
  {
    imageName: "PumaConcolorCostaricensis.png",
    caption: "Коста-риканская пума",
    description: "Коста-риканская пума обитает в Центральной части Америки " +
        "(Никарагуа, Коста-Рика и Панама).",
    link: "pumas/сostaricensis"
  },

  {
    imageName: "PumaConcolorConcolor.png",
    caption: "Puma concolor concolor",
    description: "Южно-американская пума обитает в северной части Южной Америки (Колумбия, " +
        "Венесуэла, Гайана, Гвиана, Эквадор, Перу, Боливия);",
    link: "pumas/concolor"
  }
])
</script>

<style scoped>
.pumas-page {
  padding: 2rem;
  text-align: center;
}

.cards-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2vw;
  margin-top: 3vh;
}

.header {
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.page-subtitle {
  font-size: 1.5rem;
  color: #666;
  font-style: italic;
}


/* Адаптация для экранов меньше 1200px */
@media (max-width: 1200px) {
  .page-title {
    font-size: 2.5rem; /* Уменьшаем размер заголовка */
  }

  .page-subtitle {
    font-size: 1.25rem; /* Уменьшаем размер подзаголовка */
  }
}

/* Адаптация для экранов меньше 992px */
@media (max-width: 992px) {
  .page-title {
    font-size: 2rem; /* Уменьшаем размер заголовка */
  }

  .page-subtitle {
    font-size: 1rem; /* Уменьшаем размер подзаголовка */
  }
}

/* Адаптация для экранов меньше 768px */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.75rem; /* Уменьшаем размер заголовка */
  }

  .page-subtitle {
    font-size: 0.875rem; /* Уменьшаем размер подзаголовка */
  }
}

/* Адаптация для экранов меньше 576px */
@media (max-width: 576px) {
  .page-title {
    font-size: 1.5rem; /* Уменьшаем размер заголовка */
  }

  .page-subtitle {
    font-size: 0.75rem; /* Уменьшаем размер подзаголовка */
  }
}
</style>