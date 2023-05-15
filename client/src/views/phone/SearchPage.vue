<template>
  <div class="exit-block">
    <img src="../../assets/x.png" class="search-icon" @click="back()" />
    <span class="font-blue-16">Sort & Filter</span>
  </div>
  <div class="position-r" style="margin-top: 30px">
    <img src="../../assets/search.png" class="search-icon" />
    <el-select
      filterable
      placeholder="Singapore, Singapore"
      remote-show-suffix="false"
      class="input-city"
      v-model="currentCity"
      @change="changeSelect"
    >
      <el-option
        v-for="item in options"
        :key="item.cityCode"
        :label="item.label"
        :value="item.cityCode"
      />
    </el-select>
  </div>
  <div class="date-picker">
    <el-date-picker
      v-model="pickDate"
      type="daterange"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :default-value="[new Date(2023, 5, 10), new Date(2023, 5, 20)]"
    />
  </div>
  <el-input
    v-model="inputFilter"
    placeholder="2 adults, 0 children, 1 room"
    class="filter-input"
  />
  <el-button type="primary" class="search-button" @click="search">Search</el-button>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import hotelService from '@/services/hotelService';
import { useRouter } from 'vue-router';

export default {
  setup(props, context) {
    const router = useRouter();
    const pickDate = ['2023-05-10', '2010-05-20'];
    const options = ref([]);
    const inputFilter = ref('');
    const currentCity = ref('');

    const changeSelect = (city) => {
      console.log('changeselect:', city);
      currentCity.value = city;
    };

    const search = () => {
      console.log('search:', currentCity.value);

      const city = currentCity.value;
      router.push({
        name: 'home',
        params: { city },
      });
    };

    /**
     * @inital get all city name nad city code through remote api.
     */
    onBeforeMount(async () => {
      const result = await hotelService.getCitys();
      options.value.push(...result);
    });

    const back = () => {
      router.push({
        path: '/',
        params: '',
      });
    };

    return {
      inputFilter,
      pickDate,
      options,
      changeSelect,
      search,
      currentCity,
      back,
    };
  },
};
</script>

<style scoped>
.input-city {
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 3px;
  height: 50px;
  width: 88%;
}

input-city input {
  height: 50px !important;
  padding-left: 25px;
}

.date-picker {
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 3px;
  height: 50px !important;
  margin-top: 30px;
  width: 100%;
  background: transparent;
}

.filter-input {
  height: 50px;
  width: calc(100% - 40px) !important;
  border-radius: 3px;
  margin-top: 30px;
}

.filter-input > input {
  height: 50px;
}

.search-button {
  background: #00a1e6;
  border-radius: 3px;
  height: 50px;
  width: calc(50% - 25px);
  border-radius: 3px;
  margin-top: 30px;
  margin-left: 20px;
  float: left;
}

.search-button > span {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  align-items: flex-end;
  text-align: center;
  color: #ffffff;
}

.search-icon {
  position: absolute;
  top: 18px;
  left: 28px;
  z-index: 1001;
}

:deep .el-input__inner {
  height: 50px;
}

:deep .input-city .el-input .el-input__inner {
  margin-left: 10px;
  border: 0;
  border-radius: 0%;
  background: transparent;
  height: 50px;
}

:deep .date-picker .el-range-editor.el-input__inner {
  padding: 0 30px;
}
</style>
