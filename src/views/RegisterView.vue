<template>
  <div class="redister">
    <RegisterForm/>
  </div>
</template>

<script>
import RegisterForm from '@/components/EntryComponent/RegisterForm.vue'

export default {
  name: 'RegisterView',
  components: {
   RegisterForm
  }
}
</script>

<style scoped>
.redister {
  padding: 1rem 0;
}
</style>