<template>
  <div
    style="height: 100%; width: 90%; display: block; margin-left: 4%"
    v-for="item in list"
    :key="item"
  >
    <el-skeleton style="display: flex; width: 100%; height: 100%" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 240px; height: 240px" animated />
        <div
          style="
            width: 70%;
            height: 240px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
          "
        >
          <el-skeleton-item
            variant="text"
            style="margin-left: 20px; width: 80%; height: 25px"
            animated
          />
          <el-skeleton-item
            variant="text"
            style="margin-left: 20px; width: 80%; height: 25px"
            animated
          />
          <el-skeleton-item
            variant="text"
            style="margin-left: 20px; width: 80%; height: 25px"
            animated
          />
          <el-skeleton-item variant="text" style="width: 0%; height: 25px" animated />
          <el-skeleton-item
            variant="text"
            style="margin-left: 20px; width: 50%; height: 25px"
            animated
          />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const list = ref([1, 2, 3, 4]);
</script>

<style></style>
