<template>
  <form @submit="handleFormSubmit">
    <h1>Форма создания клиента</h1>
    <form-section :title="'Основная информация'">
      <base-input
        v-model="main.surname"
        id="surname"
        type="text"
        label="Фамилия"
        :errors="errorsMap.surname"
      />
      <base-input
        v-model="main.name"
        id="name"
        type="text"
        label="Имя"
        :errors="errorsMap.name"
      />
      <base-input
        v-model="main.patronymic"
        id="patronymic"
        type="text"
        label="Отчество"
      />
      <base-input
        v-model="main.birthDate"
        id="birth-date"
        type="date"
        label="Дата рождения"
        :errors="errorsMap.birthDate"
      />
      <base-select
        v-model="main.sex"
        id="sex"
        label="Пол"
        :options="[
          { value: '0', text: 'М' },
          { value: '1', text: 'Ж' },
        ]"
      />
      <base-input
        v-model="main.phoneNumber"
        id="phone-number"
        type="tel"
        label="Номер телефона"
        :errors="errorsMap.phoneNumber"
      />
      <base-select
        v-model="main.assignedDoctor"
        id="assigned-doctor"
        label="Лечащий врач"
        :options="[
          { value: '0', text: 'Иванов' },
          { value: '1', text: 'Захаров' },
          { value: '2', text: 'Чернышева' },
        ]"
      />
      <base-select
        v-model="main.clientsGroup"
        id="clents-group"
        label="Группа клиентов"
        :options="[
          { value: '0', text: 'VIP' },
          { value: '1', text: 'Проблемные' },
          { value: '2', text: 'ОМС' },
        ]"
        :errors="errorsMap.clientsGroup"
        multiple
      />
      <base-input
        v-model="main.isNotSendTexting"
        id="is-not-send-texting"
        type="checkbox"
        label="Не отправлять СМС"
        :errors="errorsMap.isNotSendTexting"
      />
    </form-section>
    <form-section :title="'Адрес'">
      <base-input
        v-model="address.city"
        id="city"
        type="text"
        label="Город"
        :errors="errorsMap.city"
      />
      <base-input
        v-model="address.country"
        id="country"
        type="text"
        label="Страна"
      />
      <base-input
        v-model="address.region"
        id="region"
        label="Область"
        type="text"
      />
      <base-input
        v-model="address.postcode"
        id="postcode"
        label="Индекс"
        type="text"
      />
      <base-input v-model="address.house" id="house" label="Дом" type="text" />
      <base-input
        v-model="address.street"
        id="street"
        label="Улица"
        type="text"
      />
    </form-section>
    <form-section :title="'Паспортные данные'">
      <base-select
        v-model="docs.type"
        id="document-type"
        label="Тип документа"
        :options="[
          { value: '0', text: 'Паспорт' },
          { value: '1', text: 'Свидетельство о рождении' },
          { value: '2', text: 'Вод. удостоверение' },
        ]"
        :errors="errorsMap.type"
      />
      <base-input
        v-model="docs.series"
        id="document-series"
        label="Серия"
        type="text"
      />
      <base-input
        v-model="docs.number"
        id="document-number"
        label="Номер"
        type="text"
      />
      <base-input
        v-model="docs.issuer"
        id="document-issuer"
        label="Кем выдан"
        type="text"
      />
      <base-input
        v-model="docs.issueDate"
        id="document-issue-date"
        label="Дата выдачи"
        type="date"
        :errors="errorsMap.issueDate"
      />
    </form-section>
    <button type="submit">Сохранить</button>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { startsWith, equalsLength } from "../customValidators";
import BaseInput from "./BaseInput";
import BaseSelect from "./BaseSelect";
import FormSection from "./FormSection";

export default {
  name: "AppForm",
  components: { BaseInput, BaseSelect, FormSection },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      main: {
        surname: "",
        name: "",
        patronymic: "",
        birthDate: "",
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
        issueDate: "",
      },
      // If errorsMap doesn't has needed key, it returns undefined, and
      // this undefined passes as prop in BaseInput or BaseSelect, so theese
      // components identify this prop as unpassed and use default value
      // instead. It's ok, but this behavior is not explicit and unobvious.
      errorsMap: {},
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
          newErrorsMap[currentProp].push(errObj.$message);
        } else {
          newErrorsMap[currentProp] = [errObj.$message];
        }
      });
      this.errorsMap = newErrorsMap;
    },
  },
};
</script>

<style lang="sass">
</style>
