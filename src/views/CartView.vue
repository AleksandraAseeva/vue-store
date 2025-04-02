<template>
  <div class="cart">
    <h1 v-once>Корзина</h1>
  </div>
  <CartComponent/>
</template>

<script>
import CartComponent from "@/components/CartComponent.vue";

export default {
  name: "CartView",
  components: {
   CartComponent,
  },
};
</script>
