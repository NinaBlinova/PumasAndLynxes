<template>
  <div class="photo-frame">
    <img :src="imageUrl" :alt="caption" class="photo-image"/>
    <div class="photo-info">
      <div class="photo-title">{{ caption }}</div>
      <div class="photo-description">{{ description }}</div>
      <div class="photo-tags">
        <span v-if="isPuma" class="tag">Пума</span>
        <span v-if="isLynx" class="tag">Рысь</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  imageName: String,
  caption: String,
  description: String,
  initialTags: {
    type: Array,
    default: () => []
  }
});

const imageUrl = computed(() => props.imageName);

const isPuma = computed(() => props.initialTags.includes('puma'));
const isLynx = computed(() => props.initialTags.includes('lynx'));
</script>

<style scoped>
.photo-frame {
  border: 1px solid #ddd;
  border-radius: 8px;
  /* содержимое, выходящее за пределы «родительского» блока, обрезается по его границам без прокрутки */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.photo-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.photo-info {
  padding: 10px;
  background: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.photo-title {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 1rem;
}

.photo-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 5px;
  flex-grow: 1;
}

.photo-tags {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}

.tag {
  background: #f0f0f0;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #333;
}

.tag:nth-child(1) {
  background: #e3f2fd;
  color: #4c3908;
}

.tag:nth-child(2) {
  background: #e8f5e9;
  color: #FFC943;
}
</style>