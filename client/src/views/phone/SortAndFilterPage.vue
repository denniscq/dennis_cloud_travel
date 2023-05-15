<template>
  <div style="width: 97%">
    <div class="exit-block">
      <img src="../../assets/x.png" class="search-icon" @click="back()" />
      <span class="font-blue-16">Sort & Filter</span>
    </div>
    <div class="sort-block">
      <p class="font-blue-14 text-align-left margin-left-10">Sort by</p>
      <el-select
        v-model="currentSort"
        class="m-2 width-100"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="(sort, index) in sortList"
          :key="index"
          :label="sort"
          :value="index"
        />
      </el-select>
    </div>
    <div class="filter-block display-block width-100">
      <p class="font-blue-14 text-align-left margin-left-10">Filter by</p>
      <Filter ref="filterComponent"></Filter>
    </div>
    <div class="stick-bottom">
      <el-button text color="#002D63" class="bottom-button" @click='clearAll'> Clear </el-button>
      <el-button text color="#002D63" class="bottom-button" @click='filter'> Filter </el-button>
    </div>
  </div>
</template>

<script>
import Filter from '@/components/Filter.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'sort',
  components: {
    Filter,
  },
  setup() {
    const router = useRouter();
    const filterComponent = ref();
    const sortList = reactive([
      'Popularity',
      'Price(lowest first)',
      'Reviews',
      'Discount',
    ]);
    const currentSort = ref(1);

    const back = () => {
      router.push({
        path: '/',
        params: '',
      });
    };

    const clearAll = () => {
      filterComponent.value.reset();
    };

    const filter = () => {
      router.push({ path: '/', params: false });
    };

    return {
      sortList,
      currentSort,
      back,
      filterComponent,
      clearAll,
      filter,
    };
  },
};
</script>

<style scoped>
.stick-bottom {
  width: 100%;
  height: 60px;
  background: #ffffff;
  position: fixed;
  bottom: 0px;
  text-align: center;
  z-index: 1002;
  display: flex;
  justify-content: flex-start;
  border-top: 2px solid #dddddd;
  padding-left: 3%;
  padding-top: 5px;
}

.bottom-button {
  width: 45%;
  height: 50px;
}
</style>
