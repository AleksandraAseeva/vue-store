<template>
      <div class="mydata">
        <h3 v-once>Мои данные</h3>
        <p v-once style="marginBottom: 1.5rem;">Личная информация</p>
        <div class="profile-details__block">
          <label for="name"
            >имя
            <p id="name">{{ firstName }}</p></label
          >
          <label for="name"
            >фамилия
            <p id="name">{{ lastName }}</p></label
          >
          <label for="name"
            >почта
            <p id="name">{{ email }}</p></label
          >
        </div>
      </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: ""
    };
  },
  async mounted() {
    try {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const res = await fetch(`https://faa45a9033a909b4.mokky.dev/users?id=${userId}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Сервер вернул неверный ответ");
      }

      const json = await res.json();

      if (json.length > 0) {
        this.firstName = json[0].firstName
        this.lastName = json[0].lastName
        this.email = json[0].email
      }

    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }
};
</script>

<style scoped>
.mydata {
  text-align: left;
  margin-left: 2rem;
}

h3 {
  margin-bottom: 1rem;
}

.profile-details__block {
  flex-direction: unset;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

label {
  max-width: 200px;
  width: 100%;
  color: #636363;
}

.profile-details__block p {
  font-size: 1rem;
  border: 1px solid rgb(66, 66, 66);
  padding: 0.5rem 0.8rem;
  color: black;
}

@media (max-width: 430px) {
.mydata {
  margin-left: 1rem;
  margin-right: 1rem;
}
}

@media (max-width: 368px) {
label {
  max-width: 250px;
}
}
</style>