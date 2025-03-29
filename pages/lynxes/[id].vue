<template>
  <div>
    <template v-if="lynx ">
      <span>Название рыси: {{ lynx.caption }}</span>
      <img :src="lynx.imageUrl" :alt="lynx.caption"/>
      <p>{{ lynx.description }}</p>
    </template>
    <template v-else>
      <p>Данные о рыси не найдены.</p>
    </template>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'

const route = useRoute()

const lynx = await queryCollection('lynxes')
    .where('slug', '=', route.params.id)
    .first();


</script>


<style scoped>
</style>