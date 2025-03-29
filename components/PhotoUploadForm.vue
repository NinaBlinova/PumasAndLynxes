<template>
  <div class="upload-form">
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
        <img v-if="previewUrl" :src="previewUrl" class="preview-image">
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

const availableTags = ['Пума', 'Рысь'];

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

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    // Создаем FormData для отправки файла
    const formPayload = new FormData();
    formPayload.append('photo', formData.photo);
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formData.tags.forEach(tag => formPayload.append('tags[]', tag));

    // Здесь будет логика отправки на сервер
    // Например:
    // await $fetch('/api/upload', {
    //   method: 'POST',
    //   body: formPayload
    // });

    emit('submit', formData);

    // Сброс формы после успешной отправки
    formData.photo = null;
    formData.title = '';
    formData.description = '';
    formData.tags = [];
    previewUrl.value = '';

  } catch (error) {
    console.error('Ошибка загрузки:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.upload-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
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
textarea,
input[type="file"] {
  width: 100%;
  height: 20%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  min-height: 100px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tags label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: normal;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
  border-radius: 4px;
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
</style>