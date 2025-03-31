<template>
  <div class="upload-form">
    <button class="close-button" @click="handleClose">×</button>
    <form @submit.prevent="handleSubmit">
      <!-- Поле загрузки файла -->
      <div class="form-group">
        <label for="photo">Фотография:</label>
        <input
            type="file"
            id="photo"
            accept="image/*"
            @change="handleFileChange"
            required>
        <div class="preview-container">
          <img v-if="previewUrl" :src="previewUrl" class="preview-image">
          <div v-else class="preview-placeholder">Предпросмотр изображения</div>
        </div>
      </div>

      <!-- Название фотографии -->
      <div class="form-group">
        <label for="title">Название:</label>
        <input style="width: 50vh"
               type="text"
               id="title"
               v-model="formData.title"
               required>
      </div>

      <!-- Описание -->
      <div class="form-group">
        <label for="description">Описание:</label>
        <input style="width: 50vh"
               type="text"
               id="description"
               v-model="formData.description">
        </input>
      </div>

      <!-- Выбор тегов -->
      <div class="form-group">
        <label>Теги:</label>
        <div class="tags">
          <label v-for="tag in availableTags" :key="tag">
            <input
                type="checkbox"
                v-model="formData.tags"
                :value="tag"
            >
            {{ tag }}
          </label>
        </div>
      </div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Загрузка...' : 'Сохранить' }}
      </button>
    </form>
  </div>
</template>

<script setup>
const emit = defineEmits(['submit']);

const availableTags = ['puma', 'lynx'];

const formData = reactive({
  photo: null,
  title: '',
  description: '',
  tags: []
});

const previewUrl = ref('');
const isSubmitting = ref(false);

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
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
}

.tags label {
  display: flex;
  align-items: center;
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