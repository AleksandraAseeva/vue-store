<template>
  <div class="filter">
    <h3 v-once>Цена:</h3>
    <div class="price-filter">
      <label v-once>Ценовой диапазон:</label>
      <div class="slider-container">
        <span class="min-price">{{ minPrice }}₽</span>
        <input
          type="range"
          v-model="maxPrice"
          :min="minPrice"
          :max="10000"
          @input="updateFilters"
          class="slider"
        />
        <span class="max-price">{{ maxPrice }}₽</span>
      </div>
        <p>Искать товары до {{ maxPrice }}₽</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minPrice: 0,
      maxPrice: 10000,
    };
  },
  methods: {
    updateFilters() {
      this.$emit("update-price-filter", {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
      });
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: left;
  font-size: 2rem;
}

p, span {
  font-size: 1.2rem;
}

.filter {
  margin: 1rem;
  padding-right: 1rem;
}

.price-filter {
  margin-top: 1rem;
}

.slider-container {
  display: flex;
  align-items: center;
  position: relative;
}

.slider {
  width: 100%;
  height: 0.625rem;
  background: #ddd;
  border-radius: 0.3125rem;
  outline: none;
  position: relative;
  margin: 0 0.625rem;
}
.slider::before {
  left: calc((100% - 0.625rem) * (minPrice / 10000));
}

.slider::after {
  left: calc((100% - 0.625rem) * (maxPrice / 10000));
}

.min-price,
.max-price {
  width: 3.125rem;
  text-align: center;
}

@media (max-width: 1100px) {
  .filter {
  margin: 0.2rem;
}

.slider {
  height: .4rem;
  margin: 0 .4rem;
}

p, span {
  font-size: 1rem;
}
}

@media (max-width: 850px) {
.slider {
  height: .3rem;
  margin: 0;
}

.min-price,
.max-price {
  width: 40px;
}
}
</style>
