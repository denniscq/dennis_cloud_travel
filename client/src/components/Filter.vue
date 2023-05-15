<template>
  <!-- map -->
  <div class="map-block hidden-xs-only">
    <img src="../assets/map-bg.jpeg" v-if="!mapFlag" />
    <el-button
      color="#002d63"
      class="showmap-button font-white-14"
      v-if="mapFlag"
      @click="
        () => {
          mapFlag = !mapFlag;
        }
      "
      >Show on map</el-button
    >
  </div>
  <!-- price -->
  <div class="filter-block margin-top-10">
    <div class="title">
      <span class="font-black-14 padding-left-10">Price per night</span>
      <span
        class="font-blue-12 margin-right-10"
        @click="
          () => {
            priceRange = [0, 30000];
            minValue = 0;
            maxValue = 30000;
          }
        "
      >
        CLEAR
      </span>
    </div>
    <el-slider
      v-model="priceRange"
      range
      :max="50000"
      show-input
      style="width: 90%; margin-left: 5%; maring-top: 10px"
      @change="changePrice($event)"
    />
    <div style="width-100">
      <el-input v-model="minValue" style="width: 40%" />
      -
      <el-input v-model="maxValue" style="width: 40%" />
    </div>
  </div>
  <!-- reviews -->
  <Dropdown
    :checkList="filterList.reviewOption"
    sectionTitle="Reviews"
    ref="reviewDropdown"
    @filterDropdown="filter"
  />
  <!-- star rating -->
  <Dropdown
    :checkList="filterList.starOption"
    sectionTitle="Star rating"
    ref="starDropdown"
    @filterDropdown="filter"
  />
  <!-- hotel name -->
  <div class="filter-block margin-top-10">
    <p style="text-align: left" class="padding-left-10">Hotel name</p>
    <div>
      <el-input
        v-model="hotelInput"
        class="w-50 m-2 hotel-input"
        size="large"
        placeholder="e.g. Hilton, lbis..."
        :prefix-icon="Search"
        style="width: 90%"
        @change="changeHotelName($event)"
      />
    </div>
  </div>
  <!--reservation policy-->
  <Dropdown
    :checkList="filterList.reservationOption"
    sectionTitle="Reservation policy"
    ref="reservationDropdown"
  />
  <!-- meal plan -->
  <Dropdown
    :checkList="filterList.mealOption"
    :showCount="2"
    sectionTitle="Meal plan"
    ref="mealDropdown"
  />
  <!-- property type -->
  <Dropdown
    :checkList="filterList.propertyOption"
    :showCount="3"
    sectionTitle="Property type"
    ref="propertyDropdown"
  />
  <!-- facility -->
  <Dropdown
    :checkList="filterList.facilityOption"
    :showCount="3"
    sectionTitle="Facilities"
    ref="facilityDropdown"
  />
</template>

<script>
import { ref, inject, onBeforeMount } from 'vue';
import Dropdown from '@/components/Dropdown.vue';
import initSetting from '@/services/initSetting';
import { Search } from '@element-plus/icons-vue';

export default {
  name: 'Filter',
  components: {
    Dropdown,
  },
  props: {
    msg: String,
  },
  emits: ['filter'],
  setup(props, content) {
    const mapFlag = ref(true);
    const hotelInput = ref('');
    const minValue = ref(0);
    const maxValue = ref(30000);
    const priceRange = ref([0, 30000]);

    const reviewDropdown = ref();
    const starDropdown = ref();
    const reservationDropdown = ref();
    const mealDropdown = ref();
    const propertyDropdown = ref();
    const facilityDropdown = ref();
    const filterList = ref({});

    /**
     * @inital filter setting.
     */
    onBeforeMount(() => {
      filterList.value = initSetting.setupFilter();
    });

    /**
     * @description filter feature.
     * 1. filter reviews
     * 2. filter price
     * 3. filter hotel name
     * 4. filter star rating
     */
    const filterTrigger = inject('getHotels');
    const filter = (filterCondition) => {
      console.log('filter condition is', filterCondition);
      filterTrigger(filterCondition);
    };

    /**
     * @description change price
     * reflect to textbox value.
     */
    const changePrice = (newValue) => {
      filter({ price: newValue });
    };

    /**
     * @deprecated when hotel name textbox lose focus
     * or press enter key will trigger parent filter function.
     */
    const changeHotelName = (hotelName) => {
      filter({ hotelName });
    };

    /**
     * @description reset display
     * reset all section to default.
     */
    const reset = () => {
      mapFlag.value = true;
      minValue.value = 0;
      maxValue.value = 30000;
      priceRange.value = [0, 30000];
      hotelInput.value = '';

      reviewDropdown.value.clear();
      starDropdown.value.clear();
      reservationDropdown.value.clear();
      mealDropdown.value.clear();
      propertyDropdown.value.clear();
      facilityDropdown.value.clear();
    };

    content.expose({
      reset,
    });

    return {
      mapFlag,
      hotelInput,
      priceRange,
      minValue,
      maxValue,
      Dropdown,
      reviewDropdown,
      starDropdown,
      reservationDropdown,
      mealDropdown,
      propertyDropdown,
      facilityDropdown,
      Search,
      changePrice,
      changeHotelName,
      filter,
      filterList,
    };
  },
};
</script>

<style scoped>
.map-block {
  height: 100px;
  width: 80%;
  border-radius: 5px;
  position: relative;
  background: white;
}

.map-block > img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  object-fit: fill;
  border-radius: 5px;
}

.showmap-button {
  box-sizing: border-box;
  border: 1px solid #002d63;
  border-radius: 3px;
  position: absolute;
  width: 170px;
  height: 40px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
