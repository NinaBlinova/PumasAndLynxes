<template>
  <div class="card">
    <img :src="imageUrl" :alt="caption" class="card-image"/>
    <h3 class="card-title">{{ caption }}</h3>
    <p class="card-description">{{ description }}</p>
    <button class="more-btn">
      <NuxtLink :to="`/${link}`" class="nuxt-link">More</NuxtLink>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  imageName: String,
  caption: String,
  description: String,
  link: String,
});

const imageUrl = computed(() => {
  return new URL(`/public/${props.imageName}`, import.meta.url).href;
});
</script>

<style scoped>
.card {
  margin-left: 20px; /* Фиксированный отступ */
  margin-top: 30px; /* Фиксированный отступ */
  background: #FFFBF0;
  padding: 20px; /* Фиксированный padding */
  border-radius: 10px; /* Фиксированное скругление */
  width: 300px; /* Фиксированная ширина или min-width */
  min-width: 250px; /* Минимальная ширина */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.card-title {
  font-size: 1.5rem; /* Фиксированный размер */
  margin: 10px 0; /* Фиксированные отступы */
}

.card-description {
  font-size: 1rem; /* Фиксированный размер */
  color: #666;
  text-indent: 1.5em;
  text-align: justify;
}

.more-btn {
  margin-top: 15px;
  padding: 12px 24px; /* Фиксированные отступы */
  font-size: 1rem; /* Фиксированный размер */
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.more-btn:hover {
  background-color: #FFC943;
}

.nuxt-link {
  text-decoration: none;
  color: inherit;
}

.nuxt-link:visited {
  color: inherit;
}

/* Медиазапрос для очень маленьких экранов */
@media (max-width: 480px) {
  .card {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }

  .card-title {
    font-size: 1.2rem;
  }
}
</style>