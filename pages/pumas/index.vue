<template>
  <div class="pumas-page">

    <div class="logo-container">
      <NuxtLink to="/">
        <img src="/logo.png" alt="Логотип" class="logo">
      </NuxtLink>
    </div>

    <div class="header">
      <h1 class="page-title">Пумы</h1>
      <p class="page-subtitle">Здесь вы найдете информацию о пумах.</p>
    </div>
    <div class="cards-container">
      <Card v-for="(c, index) in myCats"
            :key="index" :imageName="c.imageName" :caption="c.caption" :description="c.description" :link="c.link"/>
    </div>
  </div>

  <hr>
  <div class="change-info">
    <h1>Изменить информацию</h1>
    <UButtonGroup>
      <UButton color="neutral" variant="subtle" label="Settings"/>

      <UDropdownMenu :items="items">
        <UButton
            color="neutral"
            variant="outline"
            icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </UButtonGroup>
  </div>
  <hr>

</template>

<script setup lang="ts">
import Card from "~/components/Card.vue"
import {reactive} from "vue";
import type {DropdownMenuItem} from '@nuxt/ui'


const myCats = reactive([
  {
    imageName: "PumaConcolorCouguar.png",
    caption: "Восточная пума",
    description: "Восточная пума распространёна в Северной Америке (от юга Канады до Гватемалы и Белиза), включает редких флоридских пум. ",
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
    caption: "Южно-американская",
    description: "Южно-американская пума обитает в северной части Южной Америки (Колумбия, " +
        "Венесуэла, Гайана, Гвиана, Эквадор, Перу, Боливия);",
    link: "pumas/concolor"
  }
])
const items: DropdownMenuItem[] = [
  {
    label: 'Добавить пуму',
    icon: 'i-lucide-plus',
    click: () => console.log('Добавить кошку')
  },
  {
    label: 'Изменить информацию о пуме',
    icon: 'i-lucide-square-pen',
    children: [
      {
        label: 'Поменять карточку',
        icon: 'i-lucide-pen',
        click: () => console.log('Поменять карточку')
      },
      {
        label: 'Поменять описание',
        icon: 'i-lucide-pen-line',
        click: () => console.log('Поменять описание')
      }
    ]
  }
]
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

.change-info {
  margin-bottom: 0.5vh;
  text-align: center;
}

.change-info h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
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


@media (max-width: 700px) {
  .page-title {
    font-size: 2.5rem; /* Уменьшаем размер заголовка */
  }

  .page-subtitle {
    font-size: 1.5rem; /* Уменьшаем размер подзаголовка */
  }
}
</style>