<template>
  <div class="about-us" v-once>
    <h1>О нас</h1>

    <section class="introduction">
      <h2>Кто мы?</h2>
      <p>
        Мы — команда профессионалов, посвятивших себя созданию качественных
        продуктов и услуг для наших клиентов. Наша цель — сделать мир лучше через
        инновации и заботу о каждом клиенте.
      </p>
    </section>

    <section class="mission">
      <h2>Наша миссия</h2>
      <p>
        Мы стремимся предоставлять решения, которые вдохновляют, упрощают жизнь и
        помогают нашим клиентам достигать их целей.
      </p>
    </section>

    <section class="history">
      <h2>Наша история</h2>
      <p>
        Основанная в 2020 году, наша компания начала с небольшой команды
        энтузиастов. Сегодня мы гордимся тем, что выросли в крупную организацию с
        сотнями довольных клиентов по всему миру.
      </p>
    </section>

    <section class="contact">
      <h2>Свяжитесь с нами</h2>
      <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
      <p>Телефон: +7 (123) 456-78-90</p>
      <p>Адрес: ул. Примерная, д. 123, г. Москва, Россия</p>
    </section>
  </div>
</template>

<style scoped>
.about-us {
  max-width: 50rem;
  margin: 0 auto;
  padding: 1.25rem;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: var(--color-primary);
}

h2 {
  color: #333;
  margin-top: 1.25rem;
}

p {
  line-height: 1.6;
  color: #555;
}

.introduction,
.mission,
.team,
.history,
.contact {
  margin-bottom: 2.5rem;
}

.team-members {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.team-member {
  text-align: center;
}

.member-photo {
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.625rem;
}

.contact a {
  color: var(--color-primary);
  text-decoration: none;
}

.contact a:hover {
  text-decoration: underline;
}

@media (max-width: 400px) {
  .about-us {
  max-width: 800px;
  margin: 0 auto;
  padding: .5rem;
  font-family: Arial, sans-serif;
}
}
</style>