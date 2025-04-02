<template>
  <div class="faq-accordion">
    <div class="faq-list">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="faq-item"
        @click="toggleAccordion(index)"
      >
        <div class="faq-question">
          {{ faq.question }}
          <span class="arrow">{{ isOpen(index) ? "▲" : "▼" }}</span>
        </div>
        <div v-if="isOpen(index)" class="faq-answer">
          {{ faq.answer }}
        </div>
      </div>
    </div>

    <div class="submit-question">
      <h3>Задать вопрос</h3>
      <form @submit.prevent="submitQuestion">
        <div class="form-group">
          <label for="name">Ваше имя:</label>
          <input v-model="formData.name" type="text" id="name" required />
        </div>
        <div class="form-group">
          <label for="email">Ваш email:</label>
          <input v-model="formData.email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="question">Ваш вопрос:</label>
          <textarea
            v-model="formData.question"
            id="question"
            required
          ></textarea>
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? "Отправка..." : "Отправить" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: "Как работает доставка?",
          answer: "Доставка осуществляется в течение 3-5 рабочих дней.",
        },
        {
          question: "Какие способы оплаты доступны?",
          answer: "Мы принимаем карты Visa, MasterCard и PayPal.",
        },
        {
          question: "Могу ли я вернуть товар?",
          answer:
            "Да, вы можете вернуть товар в течение 14 дней с момента получения.",
        },
      ],
      openIndexes: [],
      formData: {
        name: "",
        email: "",
        question: "",
      },
      loading: false,
    };
  },
  methods: {
    toggleAccordion(index) {
      if (this.isOpen(index)) {
        this.openIndexes = this.openIndexes.filter((i) => i !== index);
      } else {
        this.openIndexes.push(index);
      }
    },
    isOpen(index) {
      return this.openIndexes.includes(index);
    },
    async submitQuestion() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        alert("Ваш вопрос успешно отправлен!");
        this.formData = { name: "", email: "", question: "" };
      }, 2000);
    },
  },
};
</script>

<style scoped>
.faq-accordion {
  max-width: 37.5rem;
  margin: 1rem auto;
  padding: 1rem;
  border: 0.0625rem solid var(--color-primary);
  background-color: var(--color-background);
}

.faq-item {
  border-bottom: 0.0625rem solid var(--color-primary);
  padding: 0.625rem 0;
  cursor: pointer;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}

.faq-question .arrow {
  font-size: 0.75rem;
}

.faq-answer {
  margin-top: 0.625rem;
  padding-left: 0.625rem;
  color: #555;
  text-align: left;
}

.submit-question {
  margin-top: 1rem;
}

.submit-question h3 {
  margin-bottom: 0.9375rem;
  color: var(--color-primary);
}

.form-group, .faq-list {
  margin-bottom: 0.8rem;
}

label {
  display: block;
  margin-bottom: 0.3125rem;
  font-weight: bold;
  text-align: left;
  color: #555;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem 0;
  border: 0.0625rem solid var(--color-disabled);
  font-size: 1rem;
}

input:hover {
  border: 0.0625rem solid var(--color-primary);
}

textarea {
  resize: vertical;
  min-height: 6.25rem;
}

button {
  padding: 0.625rem 1.25rem;
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  background-color: var(--color-disabled);
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .faq-accordion {
    margin: 1rem;
  }
}

@media (max-width: 320px) {
  .faq-accordion {
    margin: 0.5rem;
    padding: 0.5rem;
  }
}
</style>
