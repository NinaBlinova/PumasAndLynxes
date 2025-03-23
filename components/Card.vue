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
  margin-left: 3vw; /* отступ слева */
  margin-top: 5vh; /* отступ сверху */
  background: #FFFBF0;
  padding: 2vw; /* padding относительно ширины окна */
  border-radius: 1vw; /* скругление углов */
  width: 20vw; /* ширина карты зависит от ширины окна */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 1vw;
}

.card-title {
  font-size: 2vw; /* размер шрифта зависит от ширины окна */
  margin: 1vh 0; /* вертикальные отступы от заголовка */
}

.card-description {
  font-size: 1vw;
  color: #666;
  text-indent: 1.5em; /* отступ с красной строки */
  text-align: justify; /* выравнивание по ширине */
}

.more-btn {
  margin-top: 2vh; /* отступ сверху кнопки */
  padding: 1.5rem 2rem; /* уменьшение отступов */
  font-size: 1.5vw; /* размер шрифта кнопки */
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 0.5vw; /* скругление углов кнопки */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.more-btn:hover {
  background-color: #FFC943;
}

.nuxt-link {
  text-decoration: none; /* Убираем подчеркивание */
  color: inherit; /* Наследуем цвет текста от родителя */
}

/* Убираем фиолетовый цвет после нажатия */
.nuxt-link:visited {
  color: inherit; /* Наследуем цвет текста от родителя */
}

</style>
