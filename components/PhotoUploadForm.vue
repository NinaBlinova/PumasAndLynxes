<template>
  <!-- Основной контейнер формы загрузки -->
  <div class="upload-form">
    <!-- Кнопка закрытия формы (крестик) -->
    <button class="close-button" @click="handleClose">×</button>

    <!-- Форма с обработкой submit (prevent предотвращает перезагрузку страницы) -->
    <form @submit.prevent="handleSubmit">

      <!-- ===== Секция загрузки файла ===== -->
      <div class="form-group">
        <!-- Лейбл для поля загрузки -->
        <label for="photo">Фотография:</label>

        <!-- Поле ввода файла:
             - accept="image/*" ограничивает выбор только изображениями
             - required делает поле обязательным
             - @change обрабатывает выбор файла -->
        <input
            type="file"
            id="photo"
            accept="image/*"
            @change="handleFileChange"
            required>

        <!-- Контейнер для предпросмотра изображения -->
        <div class="preview-container">
          <!-- Показываем изображение, если есть previewUrl -->
          <img v-if="previewUrl" :src="previewUrl" class="preview-image">

          <!-- Плейсхолдер, если изображение не выбрано -->
          <div v-else class="preview-placeholder">Предпросмотр изображения</div>
        </div>
      </div>

      <!-- ===== Поле для названия фотографии ===== -->
      <div class="form-group">
        <label for="title">Название:</label>

        <!-- Текстовое поле:
             - v-model связывает с formData.title
             - style="width: 50vh" делает ширину 50% от высоты viewport
             - required делает поле обязательным -->
        <input style="width: 50vh"
               type="text"
               id="title"
               v-model="formData.title"
               required>
      </div>

      <!-- ===== Поле для описания ===== -->
      <div class="form-group">
        <label for="description">Описание:</label>

        <!-- Текстовое поле (можно заменить на textarea для многострочного ввода):
             - v-model связывает с formData.description -->
        <input style="width: 50vh"
               type="text"
               id="description"
               v-model="formData.description">
        </input> <!-- Здесь лучше использовать <textarea> для описаний -->
      </div>

      <!-- ===== Секция выбора тегов ===== -->
      <div class="form-group">
        <label>Теги:</label>

        <!-- Контейнер для чекбоксов тегов -->
        <div class="tags">
          <!-- Генерация чекбоксов для каждого доступного тега:
               - v-for перебирает availableTags
               - v-model связывает массив formData.tags
               - :value привязывает значение тега -->
          <label v-for="tag in availableTags" :key="tag">
            <input
                type="checkbox"
                v-model="formData.tags"
                :value="tag"
            >
            {{ tag }} <!-- Отображаем название тега -->
          </label>
        </div>
      </div>

      <!-- Кнопка отправки формы:
           - :disabled блокирует кнопку во время отправки
           - Текст меняется в зависимости от состояния isSubmitting -->
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Загрузка...' : 'Сохранить' }}
      </button>
    </form>
  </div>
</template>

<script setup>
// Объявляем события, которые может генерировать этот компонент
const emit = defineEmits(['submit']);

// Доступные теги для выбора пользователем
const availableTags = ['puma', 'lynx'];

// Реактивные данные формы
const formData = reactive({
  photo: null,
  title: '',
  description: '',
  tags: []
});

// URL для предпросмотра выбранного изображения
const previewUrl = ref('');
// Флаг состояния загрузки (для отключения кнопки во время отправки)
const isSubmitting = ref(false);


/**
 * Обработчик изменения выбранного файла
 * @param {Event} e - Событие изменения input[type="file"]
 */
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    formData.photo = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

const handleSubmit = () => {
  isSubmitting.value = true;

  // Создаем объект для новой фотографии
  const newPhoto = {
    imageName: previewUrl.value, // Используем URL превью как временный источник
    caption: formData.title,
    description: formData.description,
    tags: formData.tags.map(tag => tag.toLowerCase()) // Приводим теги к нижнему регистру
  };

  emit('submit', newPhoto);

  // Сброс формы
  formData.photo = null;
  formData.title = '';
  formData.description = '';
  formData.tags = [];
  previewUrl.value = '';
  isSubmitting.value = false;
};


/**
 * Обработчик закрытия формы
 */
const handleClose = () => {
  emit('close');
};
</script>

<style scoped>
.upload-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  height: 20%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tags {
  display: flex;
  flex-wrap: wrap; /*элементы могут переноситься на следующую строку или столбец*/
  gap: 10px;
  padding: 10px;
}

.tags label {
  display: flex;
  align-items: center;
  /* отступ в 5 пикселей между элементами в сетке или колонках */
  gap: 5px;
  font-weight: normal;
}

.preview-container {
  width: 300px;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 10px;
  position: relative;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  /* изображение пропорционально масштабируется,
  чтобы целиком поместиться внутри родительского элемента. */
  object-fit: contain;
}

.preview-placeholder {
  color: #999;
  text-align: center;
  padding: 20px;
}

button {
  background-color: #FFC943;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0a1454;
}

.close-button:hover {
  color: #333;
}
</style>