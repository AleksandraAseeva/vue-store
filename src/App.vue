<template>
  <div class="above-nav" v-once>
    <a href="#">Зимний розыгрыш в приложении!</a>
  </div>
  <nav class="navbar">
    <div class="container">
      <div class="nav-links">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/about" class="nav-link">О нас</router-link>
        <router-link to="/catalog" class="nav-link">Каталог</router-link>
        <router-link to="/questions" class="nav-link">Вопросы</router-link>
        <router-link to="/cart" class="nav-link">Корзина</router-link>
        <div class="auth-links">
          <router-link v-if="isLoggedIn" to="/profile" class="nav-link"
            >Мой профиль</router-link
          >
          <router-link v-else to="/entry" class="nav-link">Вход</router-link>
        </div>
      </div>

      <div class="navCont">
        <input type="checkbox" id="active" v-model="isMenuOpen" />
        <label for="active" class="menu-btn"><span></span></label>
        <label for="active" class="close"></label>
        <div class="wrapper">
          <ul>
            <li>
              <router-link to="/" class="nav-link" @click="closeMenu"
                >Главная</router-link
              >
            </li>
            <li>
              <router-link to="/about" class="nav-link" @click="closeMenu"
                >О нас</router-link
              >
            </li>
            <li>
              <router-link to="/catalog" class="nav-link" @click="closeMenu"
                >Каталог</router-link
              >
            </li>
            <li>
              <router-link to="/questions" class="nav-link" @click="closeMenu"
                >Вопросы</router-link
              >
            </li>
            <li>
              <router-link to="/cart" class="nav-link" @click="closeMenu"
                >Корзина</router-link
              >
            </li>

            <div class="auth-links">
              <router-link
                v-if="isLoggedIn"
                to="/profile"
                class="nav-link"
                @click="closeMenu"
                >Мой профиль</router-link
              >
              <router-link
                v-else
                to="/entry"
                class="nav-link"
                @click="closeMenu"
                >Вход</router-link
              >
            </div>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section" v-once>
        <h2>О нас</h2>
        <p>
          Мы — команда профессионалов, предоставляющих лучшие услуги и товары.
        </p>
      </div>
      <div class="footer-section" v-once>
        <h2>Контакты</h2>
        <ul>
          <li>Email: info@example.com</li>
          <li>Телефон: +1 (123) 456-7890</li>
          <li>Адрес: г. Москва, ул. Примерная, д. 1</li>
        </ul>
      </div>
      <div class="footer-section" v-once>
        <h2>Социальные сети</h2>
        <ul class="socials">
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Inspire. Все права защищены.</p>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex";
import store from "./store";

export default {
  data() {
    return {
      isMenuOpen: false,
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  created() {
    store.dispatch("checkAuth");
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap");

:root {
  --color-primary: #002de2;
  --color-secondary: #6994ff;
  --color-accent: #3d4aff;
  --color-text: white;
  --color-background: #f9f9f9;
  --color-shadow: rgba(0, 0, 0, 0.1);
  --color-disabled: #ccc;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Inter", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h1,
h2,
h3 {
  font-family: "Playfair Display", serif;
}

a {
  text-decoration: none;
  color: var(--color-text);
}

.above-nav {
  background-color: var(--color-primary);
  padding: 1rem;
}

.navbar {
  background-color: var(--color-secondary);
  padding: 0.8rem;
  box-shadow: 0 0.125rem 0.25rem var(--color-shadow);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links,
.auth-links {
  display: flex;
  gap: 1.25rem;
  align-items: center;
}

.nav-links {
  width: 100%;
  justify-content: space-between;
}

.nav-link {
  padding: 0.9375rem 1.25rem;
  transition: background-color 0.3s;
  font-weight: bold;
  font-size: 1.2rem;
  font-weight: 300;
}

.nav-link:hover {
  background-color: var(--color-accent);
}

.footer {
  background-color: var(--color-secondary);
  color: var(--color-text);
  padding: 1rem;
  font-size: 0.875rem;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 75rem;
  margin: 0 auto;
  gap: 0.5rem;
}

.footer-section {
  flex: 1;
  min-width: 15.625rem;
  margin-bottom: 0.5rem;
}

.footer-section h2 {
  border-bottom: 0.125rem solid var(--color-primary);
  padding-bottom: 0.625rem;
  margin-bottom: 0.9375rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin: 0.3125rem 0;
}

.footer-section a {
  color: var(--color-primary);
}

.footer-section a:hover {
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  padding: 0.625rem 0;
}

.navCont,
input[type="checkbox"] {
  display: none;
}

.wrapper {
  position: fixed;
  top: 0;
  right: -100%;
  height: 100%;
  width: 100%;
  background: var(--color-primary);
  transition: all 0.6s ease-in-out;
  z-index: 1;
}

#active:checked ~ .wrapper {
  right: 0;
}

.menu-btn {
  position: absolute;
  z-index: 2;
  right: 1.25rem;
  top: 2rem;
  height: 3.125rem;
  width: 3.125rem;
  text-align: center;
  line-height: 3.125rem;
  border-radius: 50%;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.menu-btn span,
.menu-btn:before,
.menu-btn:after {
  content: "";
  position: absolute;
  top: calc(50% - 0.0625rem);
  left: 30%;
  width: 40%;
  border-bottom: 0.125rem solid #000;
  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.menu-btn:before {
  transform: translateY(-0.5rem);
}

.menu-btn:after {
  transform: translateY(0.5rem);
}

.close {
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: background 0.6s;
}

#active:checked + .menu-btn span {
  transform: scaleX(0);
}

#active:checked + .menu-btn:before {
  transform: rotate(45deg);
  border-color: var(--color-text);
}

#active:checked + .menu-btn:after {
  transform: rotate(-45deg);
  border-color: var(--color-text);
}

.wrapper ul {
  position: absolute;
  top: 60%;
  left: 50%;
  height: 90%;
  transform: translate(-50%, -50%);
  list-style: none;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.wrapper ul li {
  height: 10%;
  margin: 0.9375rem 0;
}

.wrapper ul a {
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0.3125rem 1.875rem;
  border-radius: 3.125rem;
  line-height: 3.125rem;
  margin: 0.3125rem 1.875rem;
  transition: all 0.3s ease;
  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

#active:checked ~ .wrapper ul li a {
  opacity: 1;
}

.wrapper ul li a {
  transition: opacity 1.2s, transform 1.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: translateX(6.25rem);
}

#active:checked ~ .wrapper ul li a {
  transform: none;
  transition-timing-function: ease, cubic-bezier(0.1, 1.3, 0.3, 1);
  transition-delay: 0.6s;
  transform: translateX(-6.25rem);
}

@media (max-width: 950px) {
  .nav-link {
    padding: 0.625rem 0.875rem;
    padding-bottom: 0.9375rem;
  }

  a.nav-link {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .navCont {
    display: block;
  }

  .navbar {
    height: 2rem;
  }

  .nav-links {
    display: none;
  }

  .menu-btn span,
  .menu-btn:before,
  .menu-btn:after {
    border-bottom: 2px solid var(--color-text);
  }

  .menu-btn {
    top: 3.5rem;
    height: 3.125rem;
    width: 3.125rem;
    line-height: 3.125rem;
    border-radius: 50%;
    font-size: 1.25rem;
  }
}

@media (max-width: 300px) {
  .footer-section {
    min-width: 220px;
  }

  .above-nav {
    padding: 1rem 0.5rem;
  }
}
</style>
