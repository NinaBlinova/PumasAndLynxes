<template>
  <div class="lynxes-page">

    <div class="logo-container">
      <NuxtLink to="/">
        <img src="/logo.png" alt="Логотип" class="logo">
      </NuxtLink>
    </div>

    <div class="header">
      <h1 class="page-title">Рыси</h1>
      <p class="page-subtitle">Здесь вы найдете информацию о рысях.</p>
    </div>
    <div class="cards-container">
      <Card v-for="(c, index) in myCats"
            :key="index" :imageName="c.imageName" :caption="c.caption" :description="c.description" :link="c.link"/>
    </div>
  </div>
</template>

<script setup>
import Card from "../components/Card.vue"
import {reactive} from "vue";


const myCats = reactive([
  {
    imageName: "EurasianLynx.png",
    caption: "Обыкновенная (евразийская) рысь",
    description: "Евразийская рысь — крупный хищник, обитающий в лесах Европы и Азии.",
    link: "lynxes/eurasian-lynx"
  },
  {
    imageName: "CanadianLynx.png",
    caption: "Канадская рысь",
    description: "Канадская рысь — вид рыси, населяющий Североамериканский материк, " +
        "её среда обитания простирается от Аляски до нескольких штатов на западе США.",
    link: "lynxes/canadian-lynx"
  },
  {
    imageName: "SpanishLynx.png",
    caption: "Испанская (иберийская) рысь",
    description: "Иберийская рысь — редкий вид, обитающий на Пиренейском полуострове.",
    link: "lynxes/iberian-lynx"
  },
  {
    imageName: "RedLynx.png",
    caption: "Красная (рыжая) рысь",
    description: "Красная рысь — распространена в Северной Америке," +
        " населяет также практически все штаты США от западного до восточного побережья",
    link: "lynxes/red-lynx"
  }
])
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

.lynxes-page {
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


@media (max-width: 700px) {
  .page-title {
    font-size: 2.5rem; /* Уменьшаем размер заголовка */
  }

  .page-subtitle {
    font-size: 1.5rem; /* Уменьшаем размер подзаголовка */
  }
}

</style>