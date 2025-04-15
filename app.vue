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
            <NuxtLink to="/map">Map</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Мой контент -->
    <main class="main-content">
      <!-- Transition в Nuxt — это компонент,
       который позволяет создавать анимацию при переходах между маршрутами. -->
      <transition name="page">
        <NuxtPage/>
      </transition>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>Contact us: <a href="mailto:contact@example.com">contact@example.com</a></p>
    </footer>
  </div>
</template>

<!-- указывает на синтаксис для использования Composition API внутри однофайловых компонентов -->
<script setup>
import {ref} from 'vue';

const isMenuOpen = ref(false); // Управляем состоянием меню

// Метод для переключения состояния меню
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<!-- указывает, что стили применяются не ко всему документу,
а только к родительскому элементу и его дочерним элементам. -->
<style scoped>
/* Layout container */
.layout {
  display: flex;
  flex-direction: column;
  /*не допускает, чтобы значение свойства height стало меньше, чем значение, указанное для min-height*/
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #FFFBF0;
}

/* Header & Footer Styles */
.header {
  background-color: #FFFBF0;
  padding: 20px;
  display: flex;
  justify-content: flex-end; /* Выравнивание содержимого вправо */
  /* смещение чисто визуальное и не затрагивает положение соседних элементов */
  position: relative;
}

/* Hamburger menu */
.hamburger-menu {
  /* внещний вид курсора */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  /* Чем выше значение z-индекса, тем ближе элемент будет
  располагаться к верхней части порядка наложени */
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
  font-family: 'Arial', sans-serif;
  padding: 20px;
  text-align: center;
  margin-top: auto; /* Это автоматически отправляет футер в низ */
}

.header ul {
  display: flex;
  justify-content: center;
  /* у списка будут отсутствовать маркеры */
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
  flex: 1; /* элемент будет увеличиваться, чтобы заполнить доступное пространство */
}

/* анимация плавного перехода между страницами */
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
}
</style>
