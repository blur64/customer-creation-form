<template>
  <div class="container">
    <form @submit="handleFormSubmit">
      <h1>Форма создания клиента</h1>
      <fieldset>
        <legend><h2>Основная информация</h2></legend>

        <label for="surname">Фамилия</label>
        <input v-model="main.surname" id="surname" type="text" />
        <p>{{ allErrorsAsSingleStringMap.surname }}</p>

        <label for="name">Имя</label>
        <input v-model="main.name" id="name" type="text" />
        <p>{{ allErrorsAsSingleStringMap.name }}</p>

        <label for="patronymic">Отчество</label>
        <input v-model="main.patronymic" id="patronymic" type="text" />

        <label for="birth-date">Дата рождения</label>
        <input v-model="main.birthDate" id="birth-date" type="date" />
        <p>{{ allErrorsAsSingleStringMap.birthDate }}</p>

        <label for="sex">Пол</label>
        <select v-model="main.sex" id="sex">
          <option value="0">М</option>
          <option value="1">Ж</option>
        </select>

        <label for="phone-number">Номер телефона</label>
        <input v-model="main.phoneNumber" id="phone-number" type="tel" />
        <p>{{ allErrorsAsSingleStringMap.phoneNumber }}</p>

        <label for="assigned-doctor">Лечащий врач</label>
        <select v-model="main.assignedDoctor" id="assigned-doctor">
          <option value="0">Иванов</option>
          <option value="1">Захаров</option>
          <option value="2">Чернышева</option>
        </select>

        <label for="clents-group">Группа клиентов</label>
        <select v-model="main.clientsGroup" id="clents-group" multiple>
          <option value="0">VIP</option>
          <option value="1">Проблемные</option>
          <option value="2">ОМС</option>
        </select>
        <p>{{ allErrorsAsSingleStringMap.clientsGroup }}</p>

        <input
          v-model="main.isNotSendTexting"
          id="is-not-send-texting"
          type="checkbox"
        />
        <label for="is-not-send-texting">Не отправлять СМС</label>
      </fieldset>
      <fieldset>
        <legend><h2>Адрес</h2></legend>

        <label for="city">Город</label>
        <input v-model="address.city" id="city" type="text" />
        <p>{{ allErrorsAsSingleStringMap.city }}</p>

        <label for="country">Страна</label>
        <input v-model="address.country" id="country" type="text" />

        <label for="region">Область</label>
        <input v-model="address.region" id="region" type="text" />

        <label for="postcode">Индекс</label>
        <input v-model="address.postcode" id="postcode" type="text" />

        <label for="house">Дом</label>
        <input v-model="address.house" id="house" type="text" />

        <label for="street">Улица</label>
        <input v-model="address.street" id="street" type="text" />
      </fieldset>
      <fieldset>
        <legend><h2>Паспортные данные</h2></legend>

        <label for="document-type">Тип документа</label>
        <select v-model="docs.type" id="document-type">
          <option value="0">Паспорт</option>
          <option value="1">Свидетельство о рождении</option>
          <option value="2">Вод. удостоверение</option>
        </select>
        <p>{{ allErrorsAsSingleStringMap.type }}</p>

        <label for="document-series">Серия</label>
        <input v-model="docs.series" id="document-series" type="number" />

        <label for="document-number">Номер</label>
        <input v-model="docs.number" id="document-number" type="number" />

        <label for="document-issuer">Кем выдан</label>
        <input v-model="docs.issuer" id="document-issuer" type="text" />

        <label for="document-issue-date">Дата выдачи</label>
        <input v-model="docs.issueDate" id="document-issue-date" type="date" />
        <p>{{ allErrorsAsSingleStringMap.issueDate }}</p>
      </fieldset>
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { startsWith, equalsLength } from "./customValidators";

export default {
  name: "App",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      main: {
        surname: "",
        name: "",
        patronymic: "",
        birthDate: new Date(0),
        sex: "",
        phoneNumber: "",
        assignedDoctor: "",
        clientsGroup: [],
        isNotSendTexting: false,
      },
      address: {
        city: "",
        country: "",
        region: "",
        postcode: "",
        house: "",
        street: "",
      },
      docs: {
        type: "",
        series: "",
        number: "",
        issuer: "",
        issueDate: new Date(0),
      },
      allErrorsAsSingleStringMap: {},
    };
  },
  validations() {
    return {
      main: {
        surname: {
          required: helpers.withMessage("Это обязательное поле", required),
        },
        name: {
          required: helpers.withMessage("Это обязательное поле", required),
        },
        birthDate: {
          required: helpers.withMessage("Это обязательное поле", required),
        },
        phoneNumber: {
          required: helpers.withMessage("Это обязательное поле", required),
          equalsLength: helpers.withMessage(
            "Длина поля должна быть равна 11",
            equalsLength(11)
          ),
          startsWith: helpers.withMessage(
            "Поле должно начинаться с 7",
            startsWith("7")
          ),
        },
        clientsGroup: {
          required: helpers.withMessage("Это обязательное поле", required),
        },
      },
      address: {
        city: {
          required: helpers.withMessage("Это обязательное поле", required),
        },
      },
      docs: {
        type: {
          required: helpers.withMessage("Это обязательное поле", required),
        },
        issueDate: {
          required: helpers.withMessage("Это обязательное поле", required),
        },
      },
    };
  },
  methods: {
    handleFormSubmit(e) {
      this.v$.$validate().then((isFormValid) => {
        if (!isFormValid) {
          e.preventDefault();
          console.log("Errors:");
          console.log(
            this.v$.$errors
              .map((err) => `${err.$property}: ${err.$message}`)
              .join("\n")
          );
          this.setErrorsMap();
        }
      });
    },
    setErrorsMap() {
      const newErrorsMap = {};
      this.v$.$errors.forEach((errObj) => {
        const currentProp = errObj.$property;
        if (currentProp in newErrorsMap) {
          newErrorsMap[currentProp] += errObj.$message;
        } else {
          newErrorsMap[currentProp] = errObj.$message;
        }
      });
      this.allErrorsAsSingleStringMap = newErrorsMap;
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

p
  color: red
</style>
