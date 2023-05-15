<template>
  <div
    :class="{ animation_moveup: scrollSwitch && isActive, animation_movedown: !isActive }"
  >
    <div class="hidden-xs-only padding-top-10">
      <el-row :gutter="10">
        <el-col :xs="0" :sm="10" :md="10" :lg="10" :xl="10" style="position: relative">
          <img src="../assets/search.png" class="search-icon" />
          <el-select
            filterable
            placeholder="input city"
            remote-show-suffix="false"
            class="city-input"
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
        </el-col>
        <el-col :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
          <el-date-picker
            class="date-picker"
            v-model="pickDate"
            type="daterange"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-value="[new Date(2023, 5, 10), new Date(2023, 5, 20)]"
          />
        </el-col>
        <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <el-input
            v-model="inputFilter"
            placeholder="2 adults, 0 children, 1 room"
            class="filter-input"
          />
        </el-col>
        <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <el-button type="primary" class="search-button" @click="search"
            >Search</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="hidden-sm-and-up search-phone">
      <div style="padding: 25px">
        <img src="../assets/search.png" class="search-icon-phone" />
      </div>
      <div
        style="width: 100%; text-align: left"
        class="padding-top-10"
        @click="GOSearchPage()"
      >
        <span class="font-black-16 display-block">{{ currentCityDisplay }}</span>
        <span class="font-black-12 display-block"
          >Aug 18 - Aug 19 2 adults, 0 children, 1 room</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref, toRefs } from 'vue';
import hotelService from '@/services/hotelService';
import { useRouter } from 'vue-router';

export default {
  props: {
    selectedCity: String,
  },
  setup(props, context) {
    const router = useRouter();
    const pickDate = ['2023-05-10', '2010-05-20'];
    const options = ref([]);
    const inputFilter = ref('');
    const currentCity = ref('');
    const currentCityDisplay = ref('');

    const { selectedCity } = toRefs(props);
    currentCity.value = selectedCity.value;

    const changeSelect = (city) => {
      console.log('changeselect:', city);
      currentCity.value = city;
      // context.emit('getHotels', city);
    };

    const search = () => {
      console.log('search:', currentCity.value);
      context.emit('getHotels', currentCity.value);
    };

    /**
     * @inital get all city name nad city code through remote api.
     */
    onBeforeMount(async () => {
      const result = await hotelService.getCitys();
      options.value.push(...result);

      currentCityDisplay.value = result.find(
        (p) => p.cityCode === currentCity.value
      ).label;
    });

    /**
     * @description add eventlistener to move search bar to top position.
     */
    const scrollSwitch = ref(false);
    const isActive = ref(false);
    onMounted(() => {
      window.scrollTo(0, 0);
      window.addEventListener('scroll', ($event) => {
        if (!scrollSwitch.value && window.pageYOffset >= 35) {
          scrollSwitch.value = true;
        }
        isActive.value = window.pageYOffset >= 35;
      });
    });

    const GOSearchPage = () => {
      router.push('/phoneSearch');
    };

    return {
      inputFilter,
      pickDate,
      options,
      currentCityDisplay,
      changeSelect,
      search,
      currentCity,
      isActive,
      scrollSwitch,
      GOSearchPage,
    };
  },
};
</script>

<style scoped>
.city-input {
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 3px;
  height: 50px;
  width: 80%;
  margin-left: 20%;
}

.city-input input {
  height: 50px !important;
  padding-left: 25px;
}

.date-picker {
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 3px;
  height: 50px;
  width: 50% !important;
}

.filter-input {
  height: 50px;
  width: 100%;
  border-radius: 3px;
}

.filter-input > input {
  height: 50px;
}

.search-button {
  background: #00a1e6;
  border-radius: 3px;
  height: 50px;
  width: 80%;
  margin-right: 20%;
  border-radius: 3px;
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
  width: 15px;
  height: 15px;
  position: absolute;
  top: 18px;
  left: 21%;
  z-index: 1001;
}

.animation_moveup {
  transform: translateY(-70px) !important;
  opacity: 1 !important;
  transition: all 0.3s ease;
}

.animation_movedown {
  transform: translateY(0px) !important;
  opacity: 1 !important;
  transition: all 0.3s ease;
}

.search-phone {
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  display: flex;
  height: 100%;
  background: #ffffff;
}
:deep .el-input__inner {
  height: 50px;
  width: 100%;
}

:deep .city-input .el-input .el-input__inner{
  margin-left: 10px;
  border: 0;
  border-radius: 0%;
  background: transparent;
}
</style>
