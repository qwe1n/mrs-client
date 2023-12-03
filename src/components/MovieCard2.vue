<template>
  <div class="grid" v-if="loaded">
    <figure class="effect-apollo">
      <img v-lazy="props.movieInfo.picture" alt="img22"/>
      <figcaption>
        <h2><span v-text="props.movieInfo.moviename"></span></h2>
        <p class="p2" v-text="'导演:'+props.movieInfo.director"></p><br>
        <p class="p1" v-text="'上映时间:'+props.movieInfo.releasetime.toString().slice(0,7)"></p>
      </figcaption>
    </figure>
  </div>
</template>

<script setup>
import "@/assets/css/apollo.css"
import {defineProps, inject, reactive, ref} from "vue";
const props = defineProps({
  movieInfo: Object
})

let loaded = ref(false)

setTimeout(() => {
  loaded.value = true
},200)

</script>


<style scoped lang="scss">

</style>