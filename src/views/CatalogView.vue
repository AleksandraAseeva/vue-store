<template>
  <div class="catalog product-list">
    <ul class="category-buttons">
      <li @click="filterByCategory('pencils')">Карандаши</li>
      <li @click="filterByCategory('brushes')">Кисти</li>
      <li @click="filterByCategory('paper')">Бумага</li>
      <li @click="filterByCategory('palettes')">Палитры</li>
      <li @click="filterByCategory('all')">Все</li>
    </ul>
    <div class="products-and-filter">
      <FilterCatalog @update-price-filter="handlePriceFilterUpdate" />

      <div class="products">
        <div class="product-card-container">
          <ProductCard
            v-for="product in visibleProducts"
            :key="product.id"
            :product="product"
          />

          <button
            class="look-more"
            v-if="moreProductsToShow"
            @click="showMoreProducts"
          >
            ЗАГРУЗИТЬ ЕЩЕ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import FilterCatalog from "../components/FilterCatalog.vue";

export default {
  components: {
    ProductCard,
    FilterCatalog,
  },
  data() {
    return {
      products: [],
      selectedCategory: "all",
      visibleCount: 4,
      minPrice: null,
      maxPrice: null,
    };
  },
  async mounted() {
    try {
      const res = await fetch("https://faa45a9033a909b4.mokky.dev/catalog", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Сервер вернул неверный ответ");
      }

      const json = await res.json();
      this.products = json;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const matchesCategory =
          this.selectedCategory === "all" ||
          product.category === this.selectedCategory;

        const matchesPrice =
          (this.minPrice === null || product.price >= this.minPrice) &&
          (this.maxPrice === null || product.price <= this.maxPrice);

        return matchesCategory && matchesPrice;
      });
    },

    visibleProducts() {
      return this.filteredProducts.slice(0, this.visibleCount);
    },
    moreProductsToShow() {
      return this.filteredProducts.length > this.visibleCount;
    },
  },
  methods: {
    filterByCategory(category) {
      this.selectedCategory = category;
      this.visibleCount = 4;
    },
    showMoreProducts() {
      this.visibleCount += 4;
    },
    handlePriceFilterUpdate({ minPrice, maxPrice }) {
      this.minPrice = minPrice;
      this.maxPrice = maxPrice;
      this.visibleCount = 4;
    },
  },
};
</script>

<style scoped>
.product-list {
  font-family: "Abril-Fatface";
}

.product-list h1 {
  text-align: center;
}

.category-buttons {
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1rem 2rem;
  justify-content: space-between;
  list-style: none;
  padding-left: 30%;
  background-color: #e9e9e9;
}

.category-buttons li {
  font-size: 1.5rem;
  font-family: "Abril-Fatface";
}

.category-buttons li:hover {
  cursor: pointer;
}

.product-card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  align-self: center;
  justify-self: center;
}

.products-and-filter {
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: 30% 70%;
}

.products {
  text-align: left;
}

.product {
  align-self: center;
  justify-self: center;
}

.look-more {
  border: 1px solid var(--color-primary);
  background: none;
  padding: 1rem;
  font-size: 1.3rem;
  color: var(--color-primary);
  height: 4rem;
  margin-bottom: 0.5rem;
  align-self: flex-end;
}

@media (max-width: 1100px) {
  .products-and-filter {
    padding: 1rem;
  }
  .product-card-container {
    gap: 0.8rem;
  }
}

@media (max-width: 950px) {
  .category-buttons {
    gap: 1.5rem;
  }

  .look-more {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .product-card-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .category-buttons li {
    font-size: 1.2rem;
  }

  .look-more {
    font-size: 1.2rem;
  }
}

@media (max-width: 680px) {
  .products-and-filter {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .category-buttons li {
    font-size: 1rem;
  }

  .category-buttons {
    padding-left: 2rem;
  }
}

@media (max-width: 480px) {
  .product-card-container {
    grid-template-columns: 1fr;
  }

  .category-buttons {
    gap: 1rem;
    padding-left: 1rem;
  }
}

@media (max-width: 350px) {
  .category-buttons {
    flex-direction: column;
  }

  .products-and-filter {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>