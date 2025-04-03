<template>
  <div class="layout">
    <!-- Header -->
    <header class="header">
      <div class="hamburger-menu" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>

      <nav :class="{'nav-open': isMenuOpen}">
        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/gallery">Gallery</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/map/map">Map</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Main content -->
    <main class="main-content">
      <NuxtLayout>
        <transition name="page">
          <NuxtPage />
        </transition>
      </NuxtLayout>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>Contact us: <a href="mailto:contact@example.com">contact@example.com</a></p>
    </footer>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const isMenuOpen = ref(false); // Управляем состоянием меню

// Метод для переключения состояния меню
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Layout container */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFFBF0;
}

/* Header & Footer Styles */
.header {
  background-color: #FFFBF0;
  padding: 20px;
  display: flex;
  justify-content: flex-end; /* Выравнивание содержимого вправо */
  position: relative;
}

/* Hamburger menu */
.hamburger-menu {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  z-index: 2; /* Увеличиваем приоритет кнопки над меню */
}

.hamburger-menu .bar {
  width: 30px;
  height: 4px;
  background-color: #000;

}

/* Navigation Styles */
nav {
  position: absolute;
  display: none; /* Меню скрыто по умолчанию */
  z-index: 1; /* Меню ниже кнопки */

}

nav.nav-open {
  display: block; /* Показываем меню при открытии */
}

nav ul {
  margin: 0 50% 0 0;
  display: flex; /* Разворачиваем меню в строку */

}

nav ul li {
  margin: 0 20px; /* Расстояние между пунктами меню */
}

nav ul li a {
  text-decoration: none;
  color: #000;
  font-size: 1.2rem; /* Размер шрифта относительно root */
}

.footer {
  background-color: #FFC943;
  padding: 20px;
  text-align: center;
  margin-top: auto; /* Это автоматически отправляет футер в низ */
}

.header ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
}

.header a {
  text-decoration: none;
  color: #000;
}

.footer p {
  margin: 0;
}

.footer a {
  color: #000;
}

/* Main Content */
.main-content {
  flex: 1; /* This ensures the content grows and takes up available space */
}

.page-enter-active, .page-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
}
</style>
