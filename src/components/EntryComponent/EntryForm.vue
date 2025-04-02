<template>
  <div class="entry-container">
    <p v-once class="title">
      войдите, чтоб совершать покупки и просматривать историю заказов
    </p>
    <div class="login">
      <h1 v-once>ВХОД</h1>
      <form @submit.prevent="onLogin">
        <div class="field">
          <label for="username">*Имя:</label>
          <input v-model="Firstname" type="text" id="username" required />
        </div>

        <div class="field">
          <label for="password">*Пароль:</label>
          <input v-model="password" type="password" id="password" required />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Загрузка..." : "Войти" }}
        </button>

        <p class="or">или</p>

        <button class="register">
          
          <router-link to="/register">{{ loading ? "Загрузка..." : "Зарегистрироваться" }}</router-link>
        </button>
      </form>

      <hr />

      <h2 :class="statusClass">{{ statusMessage }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Firstname: "",
      password: "",
      loading: false,
      statusMessage: "",
      statusClass: "",
    };
  },
  methods: {
    async onLogin() {
      this.loading = true;
      this.statusMessage = "";

      try {
        const res = await fetch("https://faa45a9033a909b4.mokky.dev/auth", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: this.Firstname,
            password: this.password,
          }),
        });

        const json = await res.json();
        if (res.ok) {
          console.log("Ответ от сервера:", json);

          if (json.data && json.data.id) {
            const id = json.data.id.toString();
            console.log("ID получен:", id);

            sessionStorage.setItem("userId", id);

            this.statusMessage = "Успешно вошли!";
            this.statusClass = "success";

            this.$router.push({ name: "profile" });
          } else {
            console.error("ID пользователя отсутствует в ответе:", json);
            this.statusMessage =
              "Не удалось войти. Проверьте имя пользователя и пароль.";
            this.statusClass = "error";
          }
        } else {
          this.statusMessage =
            json.message ||
            "Не удалось войти. Проверьте имя пользователя и пароль.";
          this.statusClass = "error";
        }
      } catch (error) {
        console.error("Ошибка:", error);
        this.statusMessage = "Произошла ошибка при входе.";
        this.statusClass = "error";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.entry-container {
  padding-bottom: 1rem;
}

.title {
  padding-top: 1rem;
  color: var(--color-primary);
}

.login {
  max-width: 25rem;
  margin: 0.8rem auto;
  padding: 1rem;
  border: 0.0625rem solid var(--color-disabled);
  background-color: var(--color-background);
}

.field {
  margin-bottom: 0.9375rem;
  color: rgb(140, 140, 140);
  font-size: 0.9rem;
}

.field label {
  display: block;
  margin-bottom: 0.3125rem;
  text-align: left;
}

.field input {
  width: calc(100% - 1.6rem);
  padding: 0.8rem;
  border: 0.0625rem solid var(--color-disabled);
  font-size: 0.875rem;
}

.field input:hover {
  border: 0.0625rem solid var(--color-primary);
}

.or {
  margin: 0.8rem;
  color: rgb(140, 140, 140);
}

button {
  padding: 0.8rem;
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

.register a {
  color: var(--color-text);
}

button:disabled {
  background-color: var(--color-disabled);
}

h2 {
  margin-top: 0.625rem;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
