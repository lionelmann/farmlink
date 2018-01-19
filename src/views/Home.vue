<template>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item item7">7</div>
  <div class="item">8</div>
  <div class="item">9</div>
  <div class="item">10</div>
  <div class="item">11</div>
  <div class="item">12</div>
  <div class="item">13</div>
</div>
</template>

<style lang="scss" scoped>

.item {
  background-color: #ccc;
}

.container {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 100px 500px; // explicit rows
  grid-gap: 20px;
  grid-auto-rows: 100px; //for any implicit rows that the browser creates
}

.item7 {
  background: blue;
  grid-column: span 2; // span columns
  grid-row: span 2;
}
</style>