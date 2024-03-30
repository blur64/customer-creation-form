<template>
  <div class="container">
    <form @submit="handleFormSubmit">
      <h1>Форма создания клиента</h1>
      <fieldset>
        <legend><h2>Основная информация</h2></legend>

        <label for="surname">Фамилия</label>
        <input id="surname" type="text" />

        <label for="name">Имя</label>
        <input id="name" type="text" />

        <label for="patronymic">Отчество</label>
        <input id="patronymic" type="text" />

        <label for="birth-date">Дата рождения</label>
        <input id="birth-date" type="date" />

        <label for="sex">Пол</label>
        <select id="sex">
          <option value="0">М</option>
          <option value="1">Ж</option>
        </select>

        <label for="phone-number">Номер телефона</label>
        <input id="phone-number" type="tel" />

        <label for="assigned-doctor">Лечащий врач</label>
        <select id="assigned-doctor">
          <option value="0">Иванов</option>
          <option value="1">Захаров</option>
          <option value="2">Чернышева</option>
        </select>

        <label for="clents-group">Группа клиентов</label>
        <select id="clents-group" multiple>
          <option value="0">VIP</option>
          <option value="1">Проблемные</option>
          <option value="2">ОМС</option>
        </select>

        <input id="is-send-texting" type="checkbox" />
        <label for="is-send-texting">Не отправлять СМС</label>
      </fieldset>
      <fieldset>
        <legend><h2>Адрес</h2></legend>

        <label for="city">Город</label>
        <input id="city" type="text" />

        <label for="country">Страна</label>
        <input id="country" type="text" />

        <label for="region">Область</label>
        <input id="region" type="text" />

        <label for="postcode">Индекс</label>
        <input id="postcode" type="text" />

        <label for="house">Дом</label>
        <input id="house" type="text" />

        <label for="street">Улица</label>
        <input id="street" type="text" />
      </fieldset>
      <fieldset>
        <legend><h2>Паспортные данные</h2></legend>

        <label for="document-type">Тип документа</label>
        <select id="document-type">
          <option value="0">Паспорт</option>
          <option value="1">Свидетельство о рождении</option>
          <option value="2">Вод. удостоверение</option>
        </select>

        <label for="document-series">Серия</label>
        <input id="document-series" type="number" />

        <label for="document-number">Номер</label>
        <input id="document-number" type="number" />

        <label for="document-issuer">Кем выдан</label>
        <input id="document-issuer" type="text" />

        <label for="document-issue-date">Дата выдачи</label>
        <input id="document-issue-date" type="date" />
      </fieldset>
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "App",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {};
  },
  validations() {
    return {};
  },
  methods: {
    handleFormSubmit(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="sass">
.container
  max-width: 792px
  margin: 0 auto

input, select
  margin-right: 12px
  margin-bottom: 8px

label
  margin-right: 4px
</style>
