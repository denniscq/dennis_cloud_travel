<template>
  <div class="filter-block margin-top-10">
    <div class="title">
      <span class="font-black-14 padding-left-10">{{ sectionTitle }}</span>
      <span class="font-blue-12 margin-right-10" @click="clear">CLEAR</span>
    </div>
    <div class='width-100 margin-top-10'>
      <el-checkbox-group v-model="selectReviews" @change="handleChange($event)">
        <div
          v-for="(checkItem, index) in visibleCheckList"
          :key="index"
          style="position: relative"
        >
          <el-checkbox :label="checkItem" style="width: 100%; padding-left: 10px" />
          <span class="position-999">999</span>
        </div>
        <div
          v-if="allCheckList.length - visibleCheckList.length > 0"
          class="show-more padding-left-10"
          @click="showAll"
        >
          <span>show {{ allCheckList.length - visibleCheckList.length }} more</span>
          <el-icon class="padding-top-10"><CaretBottom /></el-icon>
        </div>

        <div v-if="isShowLess" class="show-more padding-left-10" @click="showLess">
          <span>show less</span>
          <el-icon class="padding-top-10"><CaretTop /></el-icon>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { toRefs, ref } from 'vue';

export default {
  name: 'Dropdown',
  props: {
    checkList: Array,
    showCount: Number,
    sectionTitle: String,
  },
  emits: ['filterDropdown'],
  setup(props, content) {
    const selectReviews = ref([]);
    const allCheckList = ref([]);
    const visibleCheckList = ref([]);
    const tempCheckList = ref([]);
    const { checkList, showCount } = toRefs(props);
    const isShowLess = ref(false);

    /**
     * @description logic for show more
     */
    if (showCount.value && checkList.value.length > showCount.value) {
      allCheckList.value = checkList.value;
      visibleCheckList.value = allCheckList.value.slice(0, showCount.value);
    } else {
      visibleCheckList.value = checkList.value;
    }

    const showAll = () => {
      tempCheckList.value = visibleCheckList.value;
      visibleCheckList.value = allCheckList.value;
      isShowLess.value = true;
    };

    const showLess = () => {
      visibleCheckList.value = tempCheckList.value;
      isShowLess.value = false;
    };

    const clear = () => {
      selectReviews.value = [];
    };

    /**
     * @deprecated trigger filter event
     */
    const handleChange = ($event) => {
      console.log($event);
      content.emit(
        'filterDropdown',
        $event.length ? { [props.sectionTitle]: $event } : false
      );
    };

    content.expose({
      clear,
    });

    return {
      selectReviews,
      visibleCheckList,
      allCheckList,
      isShowLess,
      showAll,
      showLess,
      clear,
      handleChange,
    };
  },
};
</script>

<style scoped>
.position-999 {
  position: absolute;
  width: 10px;
  height: 10px;
  top: 10px;
  right: 30px;
  line-height: 14px;
  font-size: 12px;
  font-weight: 400;
  color: #757575;
}

.show-more {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 133% */

  /* blue 1 */

  color: #002d63;
  text-align: left;
  cursor: pointer;
  height: 50px;
}
</style>
