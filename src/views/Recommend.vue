<template>
  <div class="container">
    <span class="title">以下是为你的推荐结果</span>
    <div class="content">
      <a-list :grid="{ gutter: 10, column: 5 }" :data-source="recommendList">
        <template #renderItem="{ item }">
          <a-list-item @click="showDrawer(item)">
            <movie-card :movie-info="item"></movie-card>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <div class="others">
      <button class="button2" @click="turnToPage('evaluate')">
        重新测评
      </button>
      <button class="button2" @click="turnToPage('home')">
        返回首页
      </button>
    </div>
    <a-drawer
        v-model:open="openDrawer"
        placement="right"
        :closable="false"
        style="background-color: #2f3238;color: #3ff9dc"
    >
      <template #title>
        <div style="color: #3ff9dc">
          {{selectedMovie.moviename}}
        </div>
      </template>
      <p>{{'评分: ' + selectedMovie.averating}}</p>
      <p>{{'导演: ' + selectedMovie.director}}</p>
      <p>{{'主演: ' + selectedMovie.leadactors}}</p>
      <p>{{'上映时间: ' + selectedMovie.releasetime.toString().slice(0,10)}}</p>
      <p>{{'剧情简介: ' + selectedMovie.description}}</p>
    </a-drawer>
  </div>
</template>

<script setup>

import {inject, onMounted, reactive, ref} from 'vue'
import MovieCard from "@/components/MovieCard2.vue";
import {router} from "@/common/router.js";
const axios = inject("axios")
const notify = inject("notify")
let recommendList = ref([])
const openDrawer = ref(false);

const selectedMovie = reactive({
  moviename: '',
  director: '',
  leadactors: '',
  releasetime: '',
  description: '',
  averating: ''
})
const showDrawer = (item) => {
  selectedMovie.moviename = item.moviename
  selectedMovie.director = item.director
  selectedMovie.leadactors = item.leadactors
  selectedMovie.averating = item.averating
  selectedMovie.description = item.description
  selectedMovie.releasetime = item.releasetime
  openDrawer.value = true;
};
onMounted( async() => {
  let res = {}
  try {
    res = await axios.get("/movies/_user/getrecommends")
    recommendList.value = res.data.info
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
})

const turnToPage = (name) => {
  router.push({
    name
  })
}


</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  .title{
    transform: translateX(-50%) rotate(-2deg);
    display: block;
    left: 50%;
    top: 15%;
    position: absolute;
    $shadow: #533d4a;
    color: #2b9f5e;
    font-size: 40px;
    span {
      transform: skew(-5deg);
      display: block;
      float: left;
      text-shadow: $shadow 1px 1px, $shadow 2px 2px, $shadow 3px 3px, $shadow 4px 4px, $shadow 5px 5px, $shadow 6px 6px;
      min-width: 10px;
      min-height: 10px;
      position: relative;
    }
  }
  .content {
    margin: 0 auto;
    max-width: 80%;
    position: relative;
    top: 30vh;
  }
  .others {
    position: absolute;
    bottom: 10vh;
    right: 9vw;
    .button2 {
      margin-right: 20px;
      display: inline-block;
      transition: all 0.2s ease-in;
      position: relative;
      overflow: hidden;
      z-index: 1;
      padding: 0.7em 1.7em;
      font-size: 18px;
      border-radius: 0.5em;
      background: #e8e8e8;
      border: 1px solid #e8e8e8;
      box-shadow: 6px 6px 12px #c5c5c5,
      -6px -6px 12px #ffffff;
    }

    .button2:active {
      color: #666;
      box-shadow: inset 4px 4px 12px #c5c5c5,
      inset -4px -4px 12px #ffffff;
    }

    .button2:before {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%) scaleY(1) scaleX(1.25);
      top: 100%;
      width: 140%;
      height: 180%;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      display: block;
      transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
      z-index: -1;
    }

    .button2:after {
      content: "";
      position: absolute;
      left: 55%;
      transform: translateX(-50%) scaleY(1) scaleX(1.45);
      top: 180%;
      width: 160%;
      height: 190%;
      background-color: #009087;
      border-radius: 50%;
      display: block;
      transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
      z-index: -1;
    }

    .button2:hover {
      color: #ffffff;
      border: 1px solid #009087;
    }

    .button2:hover:before {
      top: -35%;
      background-color: #009087;
      transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }

    .button2:hover:after {
      top: -45%;
      background-color: #009087;
      transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }

  }
}
</style>