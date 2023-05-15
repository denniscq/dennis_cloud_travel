<template>
  <div class="main-block">
    <div class="hidden-sm-and-up sort-filter-phone font-white-14">
      <div @click="GOSortPage()">
        <!-- <img src="../assets/sort.png" /> image invalid -->
        <el-icon><Sort /></el-icon>
        Sort & Filter
      </div>
      <div @click="GOMapPage()">
        <!-- <img src="../assets/position.png"  /> -->
        <el-icon><Location /></el-icon>
        Map View
      </div>
    </div>
    <div class="hidden-sm-and-up select-phone font-white-14">
      <span class="margin-left-10">Select One</span>
      <img src="../assets/arrow_down.png" class="arrow_down" />
    </div>

    <el-row>
      <el-col :xs="0" :sm="8" :md="8" :lg="8" :xl="8" class="left-panel hidden-xs-only">
        <Filter ref="filterComponent"></Filter>
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" class="right-panel">
        <div class="display-panel">
          <div class="bar">
            <div style="width: 90%; margin-left: 4%" v-if="root">
              <span v-if="isLoading" class="font-black-16 display-block text-align-left">
                Finding the best deals...
              </span>
              <span v-else class="font-black-16 display-block text-align-left"
                >{{ selectedCity }}:
                {{ root && root.results ? root.results.length : 0 }} properties found
              </span>

              <div class="sort-panel hidden-xs-only">
                <span
                  v-bind:class="{ selected_sort: currentSort.isPopular }"
                  @click="sortCard('isPopular')"
                  >Popularity</span
                >
                <span
                  v-bind:class="{ selected_sort: currentSort.isPrice }"
                  @click="sortCard('isPrice')"
                  >Price(lowest first)
                  <el-icon><CaretBottom /> </el-icon>
                </span>
                <span
                  v-bind:class="{ selected_sort: currentSort.isReview }"
                  @click="sortCard('isReview')"
                  >Reviews</span
                >
                <span
                  v-bind:class="{ selected_sort: currentSort.isDiscount }"
                  @click="sortCard('isDiscount')"
                  >Discount</span
                >
              </div>
            </div>
          </div>

          <div class="cards">
            <!-- loading -->
            <Loading v-if="isLoading"></Loading>
            <!-- error display -->
            <template v-if="!isLoading">
              <!-- error page -->
              <div
                v-if="root && !!root.errorMessage"
                class="font-black-16"
                style="color: #757575; padding-top: 50px"
              >
                <el-icon><Warning /></el-icon>
                <p>Opps, something went wrong.</p>
                <p>{{ root.errorMessage }}</p>
              </div>
              <!-- have data to display -->
              <div v-else-if="root.results.length">
                <div
                  class="card margin-top-10"
                  v-for="(item, index) in root.results"
                  :key="index"
                >
                  <Card :cardInfo="item"></Card>
                </div>
              </div>
              <!-- no data to display -->
              <div v-else class="font-black-16" style="color: #757575; padding-top: 50px">
                <el-icon><Search /></el-icon>
                <p>Sorry! We cloudn't find any properties for your search.</p>
              </div>
            </template>
            <!-- 分页 -->
            <div
              v-if="
                !isLoading &&
                root &&
                !root.errorMessage &&
                root.results &&
                root.results.length
              "
              style="margin: 10px 4% 0"
            >
              <span class="font-blue-12" style="float: left" @click="goTop($event)">
                Back to top
              </span>
              <span class="font-grey-12" style="color: #cccccc" v-if="root.pagination">
                Showing Results {{ root.pagination.showing[0] }} -
                {{ root.pagination.showing[1] }} of {{ root.pagination.totalItems }}
              </span>
              <el-pagination
                small
                layout="prev, pager, next"
                :total="100"
                v-model:current-page="currentPage"
                @current-change="switchPage($event)"
              />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  watch,
  toRefs,
  watchEffect,
  ssrContextKey,
  getCurrentInstance,
} from 'vue';
import { Search } from '@element-plus/icons-vue';
import Filter from '@/components/Filter.vue';
import Loading from '@/components/Loading.vue';
import Card from '@/components/Card.vue';
import sortService from '@/services/sortService';
import { useRouter } from 'vue-router';

export default {
  name: 'Main',
  components: {
    Filter,
    Loading,
    Card,
  },
  emits: ['getHotels'],
  props: {
    selectedCity: String,
    rootSource: Object,
    isLoading: Boolean,
  },
  setup(props, content) {
    console.log('main:', props);
    const router = useRouter();
    const filterComponent = ref();
    const { rootSource, selectedCity, isLoading } = toRefs(props);
    const root = ref({});
    root.value = rootSource.value;
    watchEffect(() => {
      root.value = rootSource.value;
    });

    /**
     * @description change sort approach and reload card dispaly.
     * highlight select sort approach.
     */
    const currentSort = reactive({
      isPopular: true,
      isPrice: false,
      isReview: false,
      isDiscount: false,
    });
    const sortCard = (sortName) => {
      currentSort.isPopular = false;
      currentSort.isPrice = false;
      currentSort.isReview = false;
      currentSort.isDiscount = false;

      currentSort[sortName] = true;
      try {
        const sortedReuslt = sortService.sort(sortName, rootSource.value);
        root.value.results = sortedReuslt;
      } catch (error) {
        console.log(
          `an error has been occurred while filtering data by condition, details is ${error}`
        );
        root.value = { errorMessage: error.message };
      }
    };

    /**
     * @description simulate change page action, mock data
     * @param {} newPage
     */
    const currentPage = ref(1);
    const switchPage = (newPage) => {
      console.log('go to last page', newPage);
      currentPage.value = newPage;
      content.emit('getHotels', false);
    };

    /**
     * @description back to top
     * @param {*} $event
     */
    const goTop = ($event) => {
      let targetPoint = 0;
      let speed = 1;
      const goSpeed = setInterval(() => {
        speed++;
        targetPoint = window.pageYOffset - 10 * speed;
        window.scrollTo(window.pageXOffset, targetPoint);
        if (window.pageYOffset < 100) {
          clearInterval(goSpeed);
          console.log('go to top');
        }
      }, 10);
    };

    /**
     * @description GOSortPage
     */
    const GOSortPage = () => {
      console.log('go to map page');
      router.push('/phoneSort');
    };

    /**
     * @description GOMapPage
     */
    const GOMapPage = () => {
      console.log('go to map page');
      // router.push('/phoneMap');
    };

    /**
     * @description watach city change
     * reset filter condition
     */
    watch(
      () => props.selectedCity,
      (newvalue, oldvalue) => {
        console.log('main watch:', newvalue);
        if (newvalue !== oldvalue) {
          currentSort.isPopular = true;
          currentSort.isPrice = false;
          currentSort.isReview = false;
          currentSort.isDiscount = false;
          filterComponent.value.reset();
        }
      }
    );

    return {
      filterComponent,
      Search,
      root,
      currentSort,
      sortCard,
      currentPage,
      switchPage,
      goTop,
      GOSortPage,
      GOMapPage,
    };
  },
};
</script>

<style scoped>
.font-black-14 {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
}

.main-block {
  position: relative;
}
.left-panel {
  display: inline-flex;
  height: 100%;
  width: 80%;
  flex-direction: column;
  align-items: flex-end;
  background: transparent;
}
.right-panel {
  display: inline;
  height: 100%;
  width: 80%;
  float: right;
}
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.display-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sort-panel {
  display: flex;
  justify-content: space-between;
}

.sort-panel > span {
  line-height: 44px;
  width: 210px;
  background: #ffffff;
  display: inline-block;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #dddddd;
  cursor: pointer;
}

.selected_sort {
  border: 1px solid #dddddd;
  background: #002d63 !important;
  color: #ffffff;
}

.hotel-input {
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 3px;
  width: 250px;
  height: 40px;
}

.bar {
  width: 100%;
  /* background-color: aquamarine; */
  height: 80px;
}

.cards {
  width: 100%;
}

.card {
  height: 230px;
  width: 90%;
  margin-left: 4%;
  background: #ffffff;
  display: flex;
  border-radius: 5px;
}

.card:hover {
  box-shadow: 2px 2px 2px #cccccc;
}

::v-deep .el-pagination button:disabled {
  background-color: transparent !important;
}

::v-deep .el-pagination .btn-next,
::v-deep .el-pagination .btn-prev {
  background-color: transparent !important;
}

::v-deep .el-pager li {
  background-color: transparent !important;
}

::v-deep .el-pager li.active {
  background-color: #002d63 !important;
  color: #ffffff;
}

.sort-filter-phone {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 20px;
  text-align: center;
  color: #002d63 !important;
  background: #ffffff;
}

.sort-filter-phone > div {
  width: 50%;
  position: relative;
  padding-top: 15px;
}

.sort-filter-phone > div:first-child {
  border-right: 1px solid #dddddd;
}

.select-phone {
  width: 100%;
  background: #002d63;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
}

.arrow_down {
  width: 12px;
  height: 10px;
  margin-top: 10px;
  margin-right: 10px;
}
</style>
