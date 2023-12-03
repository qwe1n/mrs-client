<template>
  <a-card v-if="loaded" hoverable style="width: 250px;height: 380px">
    <template #cover>
      <img v-lazy="props.movieInfo.picture" style="height: 200px" />
    </template>
    <template #actions>
      <div>
        请打分：
        <a-rate v-model:value="rate" :tooltips="desc" @change="onChangingRate">
          <template #character>
            <heart-outlined />
          </template>
        </a-rate>
        <span class="ant-rate-text">{{ desc[rate - 1] }}</span>
      </div>
    </template>
    <a-card-meta>
      <template #title>
        {{props.movieInfo.moviename}}
      </template>
      <template #description>
        {{"上映时间：" + props.movieInfo.releasetime.slice(0,10)}}
      </template>
    </a-card-meta>
  </a-card>
</template>

<script setup>
import {defineProps, ref} from "vue";
import {
  HeartOutlined
} from '@ant-design/icons-vue';
const $emit = defineEmits(['updateRating'])
const props = defineProps({
  movieInfo: Object
})
const desc = ref(['很糟糕', '比较差', '一般', '还不错', '很好看']);
let loaded = ref(false)
let rate = ref(0)

setTimeout(() => {
  loaded.value = true
}, 200)

const onChangingRate = () => {
  $emit('updateRating',rate)
}

</script>

<style scoped lang="scss">

</style>