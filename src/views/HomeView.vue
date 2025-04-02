<template>
  <div class="home">
    <p v-once class="title">
      Погрузитесь в мир уникальных коллекций вместе с нашим брендом Inspire.
      Представляем вам наборы цветных карандашей по мотивам великих классиков
      живопси. Дайте своей жизни яркие цвета и вдохновение!
    </p>
    <section class="carousel">
      <div
        class="paineis"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >        
        <article
          v-for="(slide, index) in slides"
          :key="index"
          :class="slide.class"
        >
          <img :src="slide.image" :alt="slide.alt" />
          <p class="painting">{{ slide.description }}</p>
        </article>

      </div>
      <button class="prev" @click="prevSlide">&lt;</button>
      <button class="next" @click="nextSlide">&gt;</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      slides: [
        {
          image: require("../assets/starry-night.jpeg"),
          alt: "Starry Night",
          class: "page1",
          description:
            "Набор цветных карандашей по мотивам легендарной «Звёздной ночи» Винсента Ван Гога уже в продаже!",
        },
        {
          image: require("../assets/nine-val.jpg"),
          alt: "Девятый вал",
          class: "page2",
          description:
            "Почувствуйте себя Айвазовским с нашим набором карандашей 'Девятый вал'!",
        },
        {
          image: require("../assets/morning.jpg"),
          alt: "Утро в сосновом лесу",
          class: "page3",
          description:
            "Набор 'Утро в сосновом лесу' отлично подойдет в подарок любителям природы",
        },
      ],
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % 3;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + 3) % 3;
    },
  },
  mounted() {
    setInterval(this.nextSlide, 6000);
  },
};
</script>

<style scoped>
@keyframes carousel {
  0% {
    left: 0;
  }
  11% {
    left: 0;
  }
  12.5% {
    left: -100%;
  }
  23.5% {
    left: -100%;
  }
  25% {
    left: -200%;
  }
  36% {
    left: -200%;
  }
  37.5% {
    left: -300%;
  }
  48.5% {
    left: -300%;
  }
  50% {
    left: -400%;
  }
}
html,
body {
  height: 100%;
  margin: 0;
}

.title {
  padding: 1.2rem 10rem;
  font-size: 1.1rem;
  font-family: "Playfair Display", serif;
  font-weight: 600;
}

.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.paineis {
  display: flex;
  transition: transform 0.5s ease;
}
article {
  min-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}
img {
  max-height: 71vh;
  max-width: 70vw;
  width: 100%;
  height: 100%;
  z-index: 1;
}

input[type="checkbox"]:checked ~ .paineis {
  animation-play-state: paused;
  animation: go 10s;
}

article p {
  position: absolute;
  bottom: 2rem;
  color: white;
  right: 20vw;
  max-width: calc(100% - 65%);
  text-align: right;
  z-index: 1;
}

.page1,
.page2,
.page3 {
  position: relative;
  z-index: 1;
}

.page1::before {
  background-image: url("../assets/starry-night.jpeg");
}

.page2::before {
  background-image: url("../assets/nine-val.jpg");
}

.page3::before {
  background-image: url("../assets/morning.jpg");
}

.page1::before,
.page2::before,
.page3::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  z-index: -1;
}

.page1::after,
.page2::after,
.page3::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.3rem;
  background: none;
  color: white;
}

.prev {
  left: 1rem;
}

.next {
  right: 1rem;
}

@media (max-width: 1100px) {
  .title {
    padding: 1.2rem 6rem;
  }
}

@media (max-width: 880px) {
  .title {
    padding: 1rem 4rem;
  }

  img {
    max-width: 80vw;
  }

  article p {
    right: 15vw;
    max-width: 55%;
    bottom: 1.5rem;
  }
}

@media (max-width: 520px) {
  .title {
    padding: 1rem;
    font-size: 1rem;
  }

  img {
    max-width: 100vw;
  }

  article p {
    right: 5vw;
    max-width: 65%;
    bottom: 1rem;
  }
}

@media (max-width: 350px) {
  article p {
    right: 5vw;
    max-width: 100%;
    bottom: 0.5rem;
  }
  .title {
    padding: 0.5rem;
  }
}
</style>