<template>
  <div class="Home">
    <!-- nav bar -->
    <Top class="Top"></Top>
    <!-- search bar -->
    <Search class="Search" :selectedCity="selectedCity" @getHotels="getHotels"></Search>
    <!-- content area -->
    <Main
      class="Main"
      :isLoading="isLoading"
      :selectedCity="selectedCity"
      :rootSource="rootSource"
      @getHotels="getHotels"
    >
    </Main>
    <!-- bottom bar -->
    <Bottom class="Bottom"></Bottom>
  </div>
</template>

<script>
import Main from '@/components/Main.vue';
import Bottom from '@/components/Bottom.vue';
import Top from '@/components/Top.vue';
import Search from '@/components/Search.vue';
import { ref, onBeforeMount, provide } from 'vue';
import hotelService from '@/services/hotelService';
import filterService from '@/services/filterService';
import { useRoute } from 'vue-router';

export default {
  name: 'Home',
  components: {
    Top,
    Search,
    Main,
    Bottom,
  },
  setup() {
    const route = useRoute();
    const selectedCity = ref('sgsg');
    const rootSource = ref([]);
    const isLoading = ref(true);

    /**
     * @deprecated get all root data source (hotels) through remote API.
     */
    const getHotels = async (newValue) => {
      isLoading.value = true;
      console.log('isloading', isLoading.value);
      let ifRunnFilter = false;
      if (typeof newValue === 'object') {
        ifRunnFilter = true;
      } else if (newValue) {
        // city changed need to get hotels again so that turn on loading mask.
        selectedCity.value = newValue;
        console.log('home:', selectedCity.value);
      }

      await hotelService
        .getHotels(selectedCity.value)
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            rootSource.value = { errorMessage: res.data.message };
          } else if (ifRunnFilter) {
            const filledResults = filterService.filter(
              newValue,
              res.data.outlets.availability
            );
            rootSource.value.results = filledResults;
          } else {
            rootSource.value = res.data.outlets.availability;
          }

          isLoading.value = false;
          console.log('isloading', isLoading.value);
        })
        .catch((error) => {
          isLoading.value = false;
          console.error(
            'an error has been occurred while get profile, the details is %s',
            error
          );
          rootSource.value = { errorMessage: error.message };
        });
    };

    onBeforeMount(async () => {
      console.log('route', route.params.city);
      await getHotels(route.params.city);
    });

    provide('getHotels', getHotels);

    return {
      selectedCity,
      getHotels,
      isLoading,
      rootSource,
    };
  },
};
</script>

<style>
.Home {
  width: 100%;
  height: 100%;
}

.Top {
  width: 100%;
  height: 70px;
  background: #ffffff;
  position: relative;
  text-align: left;
}

.Search {
  width: 100%;
  height: 70px;
  background: #002d63;
  border-radius: 3px;
  position: fixed;
  z-index: 1002;
}

.Main {
  width: 100%;
  min-height: calc(100% - 260px);
  margin-top: 70px;
}

.Bottom {
  width: 100%;
  height: 120px;
  background: #000000;
  position: relative;
}

.title {
  width: 100%;
  height: 30px;
  display: inline-flex;
}

.title > span {
  width: 50%;
  line-height: 30px;
  text-align: left;
  padding-right: 10px;
}

.title > span:last-child {
  text-align: right;
}
</style>
