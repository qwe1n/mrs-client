<template>
  <div class="container">
    <section class="selection">
      <h1>
        <span class="title">请为</span>
        <span class="title">右侧电影</span>
        <span class="title">打分</span>
      </h1>
    </section>
    <div class="spinner-box">
      <div class="solar-system">
        <div class="earth-orbit orbit">
          <div class="planet earth"></div>
          <div class="venus-orbit orbit">
            <div class="planet venus"></div>
            <div class="mercury-orbit orbit">
              <div class="planet mercury"></div>
              <div class="sun"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-popconfirm
        title="确定开始测评?"
        ok-text="开始吧！"
        cancel-text="哦，不"
        @confirm="submitRatings"
      >
      <div class="my-box">
        <button class="my-button">开始评测</button>
      </div>
    </a-popconfirm>
    <div v-if="!loading" class="my-box" style="top:70% !important;">
      <button @click="router.push({name:'recommend'})" class="my-button">查看结果</button>
    </div>
    <div v-if="loading" class="tip-container">
      <div class="tip">
        测评时间较长，请耐心等候。
      </div>
    </div>

    <div class="rate-card-container">
      <a-list :grid="{ gutter: 10, column: 4 }" :data-source="moviesList">
        <template #renderItem="{ item }">
          <a-list-item>
            <movie-card @update-rating="(e) => item.rating=e" :movie-info="item"></movie-card>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
<script setup>
import {inject, onBeforeMount, ref} from "vue"
import MovieCard from "@/components/MovieCard.vue";
import "@/assets/css/planet.css"
import {router} from "@/common/router.js";

const axios = inject("axios")
const notify = inject("notify")
let moviesList = ref([])
let loading = ref(false)
const loadMoviesInfo = async () => {
  moviesList.value.length = 0
  let res = {}
  try {
    res = await axios.get("/movies/_user/getbyrand?num=8")
  } catch (err) {
    if (err.response.status === 401) {
      notify("请先登录!")
      router.push({
        name: "login"
      })
      return
    }
    notify(err.response.data.msg)
  }
  if (res.data.success === false) {
    notify(res.data.msg)
  }
  moviesList.value = res.data.info
}
onBeforeMount(async () => {
  await loadMoviesInfo()
})
const submitRatings = async () => {
  let counter = 0
  for (let item of moviesList.value) {
    if (item.rating !== undefined) {
      counter ++
      let res = {}
      try {
        res = await axios.post("/movies/_user/submitRating", {
          movieid : item.movieid,
          rating  : item.rating
        })
      } catch (err) {
        counter --
        if (err.response.status === 401) {
          notify("请先登录!")
          router.push({
            name: "login"
          })
          return
        }
      }
    }
  }
  if (counter === 0) {
    notify("请先为右侧的电影评分！")
    return
  }
  loading.value = true
  let res = {}
  try {
    res = await axios.get("/movies/_user/runSpark")
  } catch (err) {
    if (err.response.status === 401) {
      notify("请先登录!")
      router.push({
        name: "login"
      })
      return
    }
  }
  if (res.data.success === true) {
    notify("测评完成！")
  } else {
    notify(res.data.msg)
    return
  }
  loading.value = false
}

</script>

<style scoped lang="scss">
.container {
  color: #3ff9dc;
  width: 100vw;
  height: 100vh;
  background-color: #1d2630;
  .rate-card-container {
    margin: 50px 50px auto;
    width: 64%;
    float: right;
  }

  $background: linear-gradient(to bottom, #405166 0%,#656f6f 100%);
  $red: #e55643 ;
  $green: #2b9f5e;
  $yellow: #f1c83c;
  $shadow: #533d4a;

  .selection{
    transform: translate(-50%, -50%);
    top: 40%;
    left: 15%;
    display: block;
    position: absolute;
    max-width: 225px;
    font-size: 150px !important;
    font-weight: 500 !important;
  }


  h1{
    color: #fff;
    text-transform: uppercase;
    font-size: 42px;
    margin: 0;
    line-height: 47px;
    letter-spacing: 2px;
  }

  .title{
    transform: translateX(-50%) rotate(-10deg);
    display: block;
    float: left;
    left: 50%;
    position: relative;

    span {
      transform: skew(-10deg);
      display: block;
      float: left;
      text-shadow: $shadow 1px 1px, $shadow 2px 2px, $shadow 3px 3px, $shadow 4px 4px, $shadow 5px 5px, $shadow 6px 6px;
      min-width: 10px;
      min-height: 10px;
      position: relative;
    }
  }

  .title{
    &:nth-child(1){
      color: $red;
    }
    &:nth-child(2){
      color: $green;
    }
    &:nth-child(3){
      color: $yellow;
    }
  }

  .my-box {
    --size: 3rem;
    position: absolute;
    top: 60%;
    left: 10%;
    outline: 1px solid $green;
  }

  .my-button {
    font-weight: 600;
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
    background: transparent;
    padding: calc(1rem) 1rem;
    border: none;
    cursor: pointer;
    color: $green;
  }

  .tip-container {
    position: absolute;
    top: 70%;
    left: 5%;
    .tip {
      font-size: 30px;
    }
  }

}
</style>