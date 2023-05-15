<template>
  <div>
    <div class="bottom-block">
      <div class="privacy">
        <el-link style="padding: 0 10px" href="https://www.baidu.com" target="_blank"
          >FAQ</el-link
        >
        <el-link style="padding: 0 10px" href="https://www.baidu.com" target="_blank"
          >Terms of use</el-link
        >
        <el-link style="padding: 0 10px" href="https://www.baidu.com" target="_blank"
          >Privacy policy</el-link
        >
        <el-link style="padding: 0 10px" href="https://www.baidu.com" target="_blank"
          >Contact us</el-link
        >
      </div>
    </div>
    <p class="font-grey-12" style="margin: 0; color: #ffffff; padding-top: 15px">
      Copyright CloudTravel 2021
    </p>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  props: {
    msg: String,
  },
};
</script>

<style>
.bottom-block {
  text-align: center;
  background: #333333;
  width: 100%;
  height: 70px;
  position: relative;
}

.privacy {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  padding-top: 25px;
}

.privacy > a {
  color: #ffffff !important;
}
</style>
