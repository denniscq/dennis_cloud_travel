<template>
  <router-view />
</template>

<style>
#app {
  width: 100%;
  height: 100%;
}

html {
  height: 100%;
  width: 100%;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  background: #e5e5e5;
  text-align: center;
}

.margin-right-10 {
  margin-right: 10px;
}

.margin-top-10 {
  margin-top: 10px;
}

.padding-top-10 {
  padding-top: 10px;
}

.font-white-14 {
  color: #ffffff;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
}

.font-blue-14 {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  align-items: flex-end;
  color: #002d63;
}

.font-white-18 {
  color: #ffffff;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
}

.filter-block {
  background: white;
  min-height: 120px;
  width: 80%;
  border-radius: 5px;
  display: inline;
}

.margin-right-10 {
  margin-right: 10px;
}

.margin-top-10 {
  margin-top: 10px;
}

.margin-left-10 {
  margin-left: 10px;
}

.padding-top-10 {
  padding-top: 10px;
}

.padding-left-10 {
  padding-left: 10px;
}

.padding-right-10 {
  padding-right: 10px;
}

.font-blue-12 {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */
  text-transform: uppercase;
  /* blue 1 */
  color: #002d63;
  cursor: pointer;
}

.font-grey-12 {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */
  color: #757575;
}

.font-black-12 {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */
  color: #000000;
}

.font-black-16 {
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  color: #000000;
}

.font-blue-16 {
  /* H3 */

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  display: flex;
  align-items: flex-end;

  /* blue 1 */

  color: #002d63;
}

.display-block {
  display: block;
}

.position-r {
  position: relative;
}

.position-a {
  position: absolute;
}

.text-align-left {
  text-align: left;
}
.text-align-center {
  text-align: center;
}

.width-100 {
  width: 100%;
}

.exit-block {
  width: 100%;
  background: #ffffff;
  height: 55px;
  text-align: left;
  position: relative;
}
.exit-block > img {
  position: absolute;
  left: 18px;
  top: 18px;
  height: 14px;
  width: 14px;
  color: #002d63;
}

.exit-block > span {
  padding-left: 50px;
  line-height: 50px;
}
</style>
