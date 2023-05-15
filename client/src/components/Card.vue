<template>
  <div class="card-left">
    <div style="width: 100%; height: 180px">
      <img :src="cardInfo.property.heroImage.url" class="img-top" />
    </div>
    <div style="display: flex; flex-wrap: wrap" class="hidden-xs-only">
      <template v-for="(gallery, index) in cardInfo.property.gallery" :key="index">
        <template v-if="index < 4">
          <img
            class="img-bottom"
            v-if="gallery.xs"
            :src="gallery.xs.url"
            :alt="gallery.xs.caption"
          />
          <img
            class="img-bottom"
            v-else-if="gallery.s"
            :src="gallery.s.url"
            :alt="gallery.s.caption"
          />
          <img
            class="img-bottom"
            v-else-if="gallery.m"
            :src="gallery.m.url"
            :alt="gallery.m.caption"
          />
          <img
            class="img-bottom"
            v-else-if="gallery.l"
            :src="gallery.l.url"
            :alt="gallery.l.caption"
          />
          <img
            class="img-bottom"
            v-else
            :src="gallery.xl.url"
            :alt="gallery.xl.caption"
          />
        </template>
      </template>
    </div>
  </div>
  <div class="card-middle">
    <div class="row-1 text-align-left margin-top-10 padding-left-10 font-black-16">
      {{ cardInfoRef.property.name }}
      {{ starStr }}
    </div>
    <div class="row-2 text-align-left padding-left-10 font-grey-12">
      {{ cardInfoRef.property.location.address }}.
      {{ cardInfoRef.property.location.city }}.
      {{ cardInfoRef.property.location.country }}.
      {{ cardInfoRef.property.location.postalCode }}
      (<span style="color: #002d63 !important; cursor: pointer" class="font-grey-12"
        >View map</span
      >)
    </div>
    <div class="row-3 text-align-left padding-left-10 font-grey-12">
      <span v-if="cardInfoRef.property.reviews && cardInfoRef.property.reviews.summary">{{
        cardInfoRef.property.reviews.summary.text
      }}</span>
    </div>
    <div class="row-4 text-align-left" style="padding-left: 5px">
      <el-tag class="tag" v-for="tag in displaytags" :key="tag.code">
        {{ tag.displayName }}
      </el-tag>
      <el-tooltip class="box-item" effect="dark" placement="bottom">
        <template #content>
          <div style="width: 200px; display: flex; flex-wrap: wrap">
            <span
              v-for="(tag, index) in alltags"
              :key="index"
              style="width: 100px; color: #ffffff; text-align: left"
              class="font-grey-12 padding-left-10px"
            >
              <el-icon style="color: #019501"><Check /></el-icon>
              {{ tag }}
            </span>
          </div>
        </template>
        <el-tag class="tag" v-show="displaytags.length >= 3"> +1 </el-tag>
      </el-tooltip>
    </div>
    <div class="row-5 text-align-left font-grey-12 padding-left-10">
      <img src="../assets/safe.png" class="safe" />
      <span v-if="cardInfoRef.property.covidSafety" style="padding-left: 25px"
        >{{ cardInfoRef.property.covidSafety }}
      </span>
    </div>

    <div class="hidden-xs-only" style="position: absolute; top: 10px; right: 3%">
      <img src="../assets/excellent.png" alt="Excellent" />
    </div>

    <div class="discount-panel">
      <p v-show="discountRate" class="font-grey-12">SAVE {{ discountRate }}% TODAY!</p>
      <p class="font-grey-12">Nightly avg.</p>
      <p>
        <span
          v-show="discountRate"
          class="font-grey-12"
          style="text-decoration-line: line-through"
          >SGD {{ cardInfoRef.packages[0].displayRate.value }}</span
        >
        <span
          style="
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 30px;
            text-align: right;
          "
          >SGD {{ cardInfoRef.packages[0].adjustedDisplayRate.value }}</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, computed, onMounted } from 'vue';

export default {
  name: 'Card',
  props: {
    cardInfo: Object,
  },
  setup(props) {
    const cardInfoRef = ref({});
    const { id, cardInfo } = toRefs(props);
    cardInfoRef.value = cardInfo.value;

    /**
     * @description convert star rating to graph.
     */
    const starStr = computed(() => {
      let star = '';
      for (let i = 0; i < cardInfoRef.value.property.starRating; i++) {
        star = `${star}⭐`;
      }
      return star;
    });

    /**
     * @description order tag.
     */
    const displaytags = ref([]);
    const alltags = ref([]);
    onMounted(() => {
      const foodMap = {
        1: 'Room Only',
        2: 'Breakfast',
        3: 'Lunch',
        4: 'Dinner',
        5: 'Half board',
        6: 'Full board',
        7: 'All inclusive',
      };

      const tagMap = [
        { displayName: 'Breakfast', isChecked: false, code: 'Breakfast' },
        { displayName: 'Free concellation', isChecked: false, code: 'nonRefundable' },
        { displayName: 'Lunch', isChecked: false, code: 'Lunch' },
        { displayName: 'Pay later', isChecked: false, code: 'payLater' },
        { displayName: 'Dinner', isChecked: false, code: 'Dinner' },
        { displayName: 'Pay at hotel', isChecked: false, code: 'payAtHotel' },
        { displayName: 'Half board', isChecked: false, code: 'Half board' },
        { displayName: 'Full board', isChecked: false, code: 'Full board' },
      ];

      // ? packages should be an object insead of an array,
      // I used first one (packages[0]) as the active one.
      const activePackage = cardInfo.value.packages[0];
      const validKeys = [];
      const keys = Object.keys(activePackage);
      keys.forEach((key) => {
        if (key === 'foodCode') {
          const foodCode = foodMap[activePackage[key]];
          validKeys.push(foodCode);
        } else if (activePackage[key] === true) {
          validKeys.push(key);
        }
      });
      tagMap.forEach((tag) => {
        if (validKeys.indexOf(tag.code) > -1) {
          if (displaytags.value.length < 3) {
            tag.isChecked = true; //eslint-disable-line
            displaytags.value.push(tag);
          }
          alltags.value.push(tag.displayName);
        }
      });
    });

    const activePackage = cardInfo.value.packages[0];
    const realValue = ref(activePackage.displayRate.value);
    const discountValue = ref(activePackage.adjustedDisplayRate.value);

    /**
     * @description calcudlate discount
     */
    const discountRate = computed(
      () => ((realValue.value - discountValue.value) / realValue.value).toFixed(2) * 100 // eslint-disable-line
    ); // eslint-disable-line

    return {
      cardInfoRef,
      starStr,
      displaytags,
      alltags,
      realValue,
      discountValue,
      discountRate,
    };
  },
};
</script>

<style scoped>
.card-left {
  width: 26%;
  height: 100%;
}

.card-middle {
  width: 74%;
  height: 100%;
  position: relative;
}

.card-right {
  width: 14%;
  height: 100%;
  position: relative;
}

.row-1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333333 !important;
  max-height: 32px;
  max-width: 80%;
}

.row-2 {
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-height: 32px;
  color: #333333 !important;
  max-width: 80%;
}
.row-3 {
  line-height: 32px;
  max-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 80%;
}
.row-4 {
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-height: 32px;
  max-width: 80%;
}
.row-5 {
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-height: 32px;
  color: #333333 !important;
  position: relative;
  max-width: 80%;
}

.tag {
  border: 1px solid #00a1e6;
  margin-left: 5px;
  background: #ffffff;
}

.tag:last-child {
  cursor: pointer;
}

.safe {
  height: 20px;
  width: 16px;
  position: absolute;
  top: 5px;
}

.img-top {
  object-fit: fill;
  width: 100%;
  height: 170px;
}

.img-bottom {
  width: 47px;
  height: 50px;
  object-fit: cover;
  padding: 0 1px;
}

p {
  margin: 0;
  line-height: 16px;
}

p:first-child {
  background: #00a1e6;
  color: #ffffff !important;
  width: fit-content;
  margin-bottom: 10px;
}

.discount-panel {
  height: 100px;
  width: 100%;
  position: absolute;
  bottom: 10px;
  right: 3%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
