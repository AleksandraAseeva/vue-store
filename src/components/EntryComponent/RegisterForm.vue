<template>
  <div class="register">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <div v-once ><label for="firstName">Ваше имя:</label></div>
        <input v-model="firstName" type="text" id="firstlName" required />
      </div>

      <div class="field">
        <div v-once><label for="lastName">Ваша фамилия:</label></div>
        <input v-model="lastName" type="text" id="lastName" required />
      </div>

      <div class="field">
        <div v-once><label for="password">Пароль:</label></div>
        <input
          v-model="password"
          type="password"
          id="password"
          required
          @input="validatePassword"
        />
        <p v-if="passwordError" class="error-message" style="color: #b1b1b1">{{ passwordError }}</p>
        <p v-else style="color: #b1b1b1">Принято, кэп</p>
      </div>

      <div class="field">
        <div v-once><label for="email">Почта:</label></div>
        <input v-model="email" type="email" id="email" required />
      </div>
      

      <button type="submit" :disabled="loading">
        {{ loading ? "Загрузка..." : "Зарегистрироваться" }}
      </button>
    </form>

    <hr />

    <h2 :class="statusClass">{{ statusMessage }}</h2>

    <pre id="jsonPre">{{ responseJson }}</pre>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["cart"]),
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      loading: false,
      statusMessage: "",
      statusClass: "",
      responseJson: "",
      passwordError: "",
    };
  },
  methods: {
    async onSubmit() {
      if (this.passwordError) {
        this.statusMessage = "Исправьте ошибки в пароле.";
        this.statusClass = "error";
        return;
      }

      this.loading = true;
      this.statusMessage = "";

      try {
        const res = await fetch("https://faa45a9033a909b4.mokky.dev/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            items: this.cart,
          }),
        });

        const json = await res.json();
        this.responseJson = JSON.stringify(json, null, 2);
        this.updateStatus(res.ok, json);

        if (res.ok) {
          const token = json.token;
          localStorage.setItem("authToken", token);

          this.$router.push({ name: "entry" });
        }
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        this.loading = false;
      }
    },
    updateStatus(ok, json) {
      if (ok) {
        this.statusMessage = "Успешно!";
        this.statusClass = "success";
      } else {
        this.statusMessage = "Не зарегистрирован!";
        this.statusClass = "error";
      }
    },
    validatePassword() {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(this.password)) {
        this.passwordError =
          "Пароль должен содержать минимум 8 символов, включая буквы, цифры и специальные символы.";
      } else {
        this.passwordError = "";
      }
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 25rem;
  margin: 0 auto;
  padding: 1.25rem;
  border: 0.0625rem solid var(--color-disabled);
  background-color: var(--color-background);
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  text-align: left;
  font-size: 1.2rem;
}

label {
  font-weight: bold;
}

input {
  padding: .8rem;
  border: 0.0625rem solid var(--color-disabled);
  font-size: 1rem;
}

input:focus {
  border-color: var(--color-primary);
  outline: none;
}

button {
  padding: 1rem;
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  background-color: var(--color-disabled);
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.3125rem;
}

hr {
  margin: 1.25rem 0;
  border: 0;
  border-top: 0.0625rem solid var(--color-disabled);
}

h2 {
  text-align: center;
  font-size: 1.125rem;
}

h2.loading, h2.success {
  color: #42b983;
}

h2.error {
  color: #ff4444;
}

#jsonPre {
  background-color: var(--color-background);
  padding: 0.625rem;
  border-radius: 0.25rem;
  font-family: monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
