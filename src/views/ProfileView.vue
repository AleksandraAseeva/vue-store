<template>
  <div class="profile">
    <h1 v-once>ЛИЧНЫЙ КАБИНЕТ</h1>
    <div class="profile__content">
      <div class="sidebar">
        <ul>
          <li @click="selectSection('myData')">Мои данные</li>
          <li @click="selectSection('myOrders')">Мои заказы</li>
          <li @click="selectSection('myReturns')">Мои возвраты</li>
          <li @click="selectSection('myDiscounts')">Мои скидки</li>
          <li @click="logout" style="color: #696969FF;">
            <img src="../assets/sign-out.png" alt="">
            <p>Выйти</p>
          </li>
        </ul>
      </div>
      <MyData v-if="selectedSection === 'myData'"/>
      <MyOrders v-if="selectedSection === 'myOrders'"/>
      <MyReturns v-if="selectedSection === 'myReturns'"/>
      <MyDiscounts v-if="selectedSection === 'myDiscounts'"/>
    </div>
  </div>
</template>

<script>
import MyData from "@/components/ProfileComponents/MyData.vue";
import MyOrders from "@/components/ProfileComponents/MyOrders.vue";
import MyReturns from "@/components/ProfileComponents/MyReturns.vue";
import MyDiscounts from "@/components/ProfileComponents/MyDiscounts.vue";

export default {
  name: "ProfileView",
  components: {
   MyData,
   MyOrders,
   MyReturns,
   MyDiscounts,
  },
   data() {
    return {
      selectedSection: 'myData',
    };
  },
  methods: {
     selectSection(section) {
      this.selectedSection = section;
    },
    logout() {
      sessionStorage.removeItem("userId");
      this.$store.dispatch("logout");
      this.$router.push({ name: "entry" });
    },
  },
};
</script>

<style scoped>
.profile {
  margin-top: 3rem;
}

h1 {
  text-align: left;
  margin-left: 2rem;
  margin-bottom: 3rem;
}

h2 {
  text-align: left;
  margin-bottom: 2rem;
}

.profile__content {
  display: grid;
  grid-template-columns: 30% 70%;
  margin-bottom: 2rem;
}

.sidebar {
  text-align: left;
  margin-left: 2rem;
  min-height: 35vh;
}

.sidebar ul li {
  margin-bottom: 1rem;
  display: flex;
}

.sidebar ul li:hover {
 cursor: pointer;
}

.sidebar ul li img {
  width: 1.2rem;
  margin-right: 1rem;
}

@media (max-width: 600px) {
  .profile__content {
  grid-template-columns: 40% 60%;
}
}

@media (max-width: 430px) {
.sidebar {
  margin-left: 1rem;
}

h1 {
  margin-left: 1rem;
  font-size: 1.5rem;
}
}

@media (max-width: 368px) {
.profile__content {
  grid-template-columns: 100%;
}
}
</style>