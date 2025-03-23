<template>
  <div>
    <template v-if="lynx">
      <span>Название рыси: {{ lynx.caption }}</span>
      <img :src="lynx.imageUrl" :alt="lynx.caption"/>
      <p>{{ lynx.description }}</p>
    </template>
    <template v-else>
      <p>Данные о рыси не найдены.</p>
    </template>
  </div>
</template>

<script>
export default {
  async asyncData({params, $axios}) {
    const lynx = await $axios.$get(
        `http://localhost:3000/lynxes/${params.slug}`
    )
    return {lynx}
  }
}

</script>

<style scoped>
</style>