<template>
  <div>
    <div class="top-right">
      <el-row>
        <el-col :xs="16" :sm="8" :md="8" :lg="8" :xl="8" style="padding-top: 17px">
          <img src="../assets/cloudtravel-logo.jpg" class="logo" />
        </el-col>
        <el-col :xs="8" :sm="16" :md="16" :lg="16" :xl="16" style="padding: 25px">
          <div class="hidden-xs-only" style="padding-right: 100px">
            <el-dropdown>
              English
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="(item, index) in languages" :key="index">{{
                    item
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown>
              USD
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="(item, index) in currency" :key="index">{{
                    item
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>My Account</span>
            <span>Log Out</span>
          </div>
          <div class="hidden-sm-and-up">
            <img
              src="../assets/menu.png"
              class="safe"
              style="width: 18.75px; height: 16.5px"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import initSetting from '@/services/initSetting';

const languages = ref([]);
const currency = ref([]);
onBeforeMount(() => {
  languages.value = initSetting.setupLanguages();
  currency.value = initSetting.setupCurrency();
});
</script>

<style scoped>
.logo {
  object-fit: cover;
  width: 240px;
  height: 36px;
}

.el-row {
  height: 100%;
}

.el-dropdown {
  cursor: pointer;
  color: #000000;
  padding-right: 10px;
}

.top-right {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  align-items: flex-end;
  text-align: right;
  letter-spacing: 0.01em;
  color: #000000;
  border-radius: 3px;
  height: 100%;
}
</style>
