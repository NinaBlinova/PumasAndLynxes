<template>
  <div class="banner">
    <div class="first">
      <!-- Иконка лайка -->
      <div class="icon">
        <img src="/public/logo.png" alt="logo">
      </div>
      <img class="lynx" src="/public/lynxesHome.png" alt="Рысь"/>
    </div>

    <div class="content">
      <div class="text-content">
        <h2>Откройте для себя мир рысей и пум!</h2>
        <p>
          Погрузитесь в удивительное царство диких кошек с нашим сайтом,
          посвящённым рысям и пума.
          Узнайте о их привычках, среде обитания и роли в экосистеме.
        </p>
        <p>🔵 <strong>Интересные факты:</strong></p>
        <ul>
          <li>Рыси — мастера маскировки, способные сливаться с окружающей средой.</li>
          <li>Пумы — одни из самых больших кошек в Северной Америке, известные своей силой и грацией.</li>
        </ul>
        <p>🌍 <strong>Исследуйте: фотогалерею потрясающих снимков этих великолепных животных.</strong></p>
      </div>
      <img class="puma" src="/public/pumasHome.png" alt="Пума"/>
      <NuxtLink aria-label="Перейти в галерею фотографий" to="/gallery">
        <button class="more-btn">More</button>
      </NuxtLink>

    </div>
  </div>

  <div class="cardsHomeCats">
    <!-- Использование компонента Card с v-for -->
    <Card v-for="(c, index) in myCats"
          :key="index" :imageName="c.imageName" :caption="c.caption" :description="c.description" :link="c.link"/>
  </div>

  <div class="map2">
    <NuxtLink aria-label="Перейти к карте" to="/map"><img src="/public/map.png"
                                                          alt="карта на главной странице"/></NuxtLink>
  </div>

</template>

<script setup>

import Card from "../components/Card.vue"
import {reactive} from "vue";


const myCats = reactive([
  {
    imageName: "pumasHomeCard.png",
    caption: "Пумы", // Важно для SEO: точное название животного
    description: "Один из самых грациозных и сильных хищников Северной " +
        "и Южной Америки. Эти великолепные животные обитают в разнообразных экосистемах, от лесов и гор до пустынь " +
        "и степей", // Детальное описание - хорошо для SEO
    link: "pumas" // ЧПУ (человеко-понятный URL) - важно для SEO
  },
  {
    imageName: "lynxesHomeCard.png",
    caption: "Рыси",
    description: "Загадочное и грациозное животное, принадлежащее к " +
        "семейству кошачьих. Эти хищники обитают в лесах и горных районах Европы, Азии и Северной Америки. " +
        "Рыси известны своим уникальным внешним видом, включая характерные кисточки на ушах и короткий хвост.",
    link: "lynxes"
  }
])


// SEO метаданные
import {useRoute} from "vue-router";

const route = useRoute();

// 1. Основные мета-теги через useSeoMeta (Nuxt Seo Kit)
useSeoMeta({
  title: "Пумы и Рыси — Исследования диких кошек", // Главный title (важнейший SEO-элемент)
  description: "Научные статьи, фотогалерея и карты ареалов обитания пум и рысей.", // Мета-описание (отображается в поисковиках)

  // OpenGraph мета-теги (для соцсетей)
  ogTitle: "Исследуйте мир диких кошек.", // Заголовок для соцсетей
  ogDescription: "Эксклюзивные фото и видео пум в естественной среде обитания.", // Описание для соцсетей
  ogImage: "https://pumas-and-lynxes.com/CanadianLynx.png", // Изображение для превью
  ogUrl: `https://pumas-and-lynxes.com${route.path}`, // Полный URL страницы
  ogType: "website", // Тип контента
  ogLocale: "ru_RU", // Локализация (русский язык)

  // Каноническая ссылка (важно против дублей)
  canonical: `https://pumas-and-lynxes.com${route.path}`
});


import {useHead} from "#imports";


// 2. Дополнительные SEO-настройки через useHead
useHead({
  // Ключевые слова (менее важны сейчас, но иногда используются)
  meta: [
    {name: 'keywords', content: 'пумы, рыси, дикие кошки, животные'}
  ],

  // JSON-LD разметка (Schema.org) - очень важно для SEO
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite", // Тип схемы
        "name": "Пумы и Рыси",
        "url": "https://pumas-and-lynxes.com", // Основной URL
        "description": "Научные статьи, фотогалерея и карты ареалов обитания пум и рысей.", // Описание для поисковиков
        "image": "https://pumas-and-lynxes.com/EurasianLynxPageD3.png", // Основное изображение
        "publisher": { // Информация об издателе
          "@type": "Organization",
          "name": "Pumas & Lynxes Research",
          "logo": {
            "@type": "ImageObject",
            "url": "https://pumas-and-lynxes.com/images/logo.png" // Лого для rich-результатов
          }
        }
      })
    }
  ]
});
</script>

<style scoped>
.banner {
  margin-top: 1.5%;
  background: #FFC943;
  display: flex;
  padding: 5px; /* Добавляем отступы внутри контейнера */
  box-sizing: border-box; /* Учитываем padding в размере */
  position: relative; /* Для абсолютного позиционирования */
  flex-direction: row; /* Горизонтальное расположение элементов */
  justify-content: space-between; /* Распределение элементов */
  /* 30vw — это относительная единица измерения в CSS,
  которая означает 30% от ширины области просмотра (viewport width) */
  height: 30vw;
}

.first {
  display: flex; /* Применение flexbox для управления расположением */
  flex-direction: column; /* Элементы вертикально */
  align-items: flex-start; /* элементы выравниваются по началу поперечной оси контейнера, располагаясь вверху. */
  justify-content: flex-start; /* Выравнивание элементов по верхнему краю */
  width: 30vw;
  left: 2vw;
  height: auto;
  position: relative; /* положение элемента устанавливается относительно его исходного места */
}


.icon {
  width: 20%;
  height: auto;
  border-radius: 50%;
  background: antiquewhite;
  overflow: hidden;
  position: relative;
  left: 0.1%;
  top: 5vh; /* Небольшой отступ сверху */
  max-width: 100%; /* Ограничиваем максимальную ширину */
  max-height: 100%; /* Ограничиваем максимальную высоту */
}

.icon img {
  width: 100%;
  height: 100%;
  /* сохраняются пропорции, но всё, что не поместится в размер бокса, обрезается. */
  object-fit: cover;
}

/* Картинка рыси (позицийка на левом нижнем углу) */
.lynx {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
  max-width: 100%; /* Ограничиваем максимальную ширину */
  max-height: 100%; /* Ограничиваем максимальную высоту */
}

/* Контент с картинкой пумы */
.content {
  display: flex;
  flex-direction: row;
  align-items: flex-start; /* элементы выравниваются по верхнему краю контейнера */
  width: 70vw;
  height: auto;
  position: relative;
  padding-left: 2vw;
  padding-right: 2vw;
}

.puma {
  position: absolute; /* Абсолютное позиционирование */
  right: 1vw;
  top: 1vw;
  width: 40%;
  height: auto;
  max-width: 100%; /* Ограничиваем максимальную ширину */
  max-height: 100%; /* Ограничиваем максимальную высоту */
}

.text-content {
  text-align: justify; /* выравнивание по ширине */
  width: 50%; /* Задаем ширину контейнера с текстом */
  padding-left: 5%; /* Отступ от пумы */
  font-size: 1vw;
  height: auto;
  max-width: 100%; /* Ограничиваем максимальную ширину */
  max-height: 100%; /* Ограничиваем максимальную высоту */
}

.more-btn {
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 0.5vw; /* скругление углов кнопки */
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 10%;
  height: 15%;
  position: absolute;
  bottom: 1vw;
  right: 1vw;
  font-size: 1.5vw;
}

.more-btn:hover {
  background-color: #ffb600;
}

.cardsHomeCats {
  display: flex;
  justify-content: space-between; /* распределение карточек по всей ширине */
  flex-wrap: wrap; /* позволяет карточкам переноситься на новую строку, если не помещаются */
  gap: 1vw; /* отступы между карточками */
  padding-right: 1.5vw; /* отступ справа, чтобы не упиралась в стенку */
}

.map2 {
  width: 60%; /* Задаем ширину 60% от экрана */
  height: auto; /* Высота карты будет адаптироваться */
  padding: 5vw; /* Добавляем отступы внутри карты */
  border-radius: 10px; /* Скругляем углы */
  box-sizing: border-box; /* Учитываем padding в размерах */
  /* Для трех значений: первое делает отступ сверху, второе — слева и справа, третье — снизу
     Для четырех значений: применятся по часовой стрелке для каждой из сторон: сверху, справа, снизу и слева. */
  margin: 7% auto 3vw;
}

.map2 img {
  width: 100%; /* Картинка растягивается на всю ширину контейнера */
  height: 100%; /* Картинка растягивается на всю высоту контейнера */
  object-fit: cover; /* Обеспечивает сохранение пропорций картинки, при этом она полностью заполняет контейнер */
}


/* Медиазапрос для очень маленьких экранов */
@media (max-width: 900px) {
  .banner {
    flex-direction: column;
    height: auto;
  }

  .content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 0;
  }

  .text-content {
    width: 90%;
    padding-left: 0;
    font-size: 3vw;
  }

  .puma {
    position: static;
    width: 60%;
    margin-top: 10px;
  }

  .first {
    flex-direction: row;
    position: static;
    width: 60%;
    margin-top: 10px;
  }

  .lynx {
    position: static;
    width: 60%;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
  }

  .more-btn {
    position: static;
    width: 100%;
    height: auto;
    padding: 10px;
    font-size: 4vw;
    margin: 10px auto;
  }

  .cardsHomeCats {
    flex-direction: column;
    align-items: center;
  }

  .map2 {
    width: 90%;
    padding: 10vw;
  }
}
</style>
