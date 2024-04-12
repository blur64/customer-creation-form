<template>
  <form class="form" @submit="handleFormSubmit">
    <h1 class="form-title">Форма создания клиента</h1>
    <form-section :title="'Основная информация'">
      <base-input
        v-model="main.surname"
        id="surname"
        type="text"
        label="Фамилия"
        name="surname"
        :errors="errorsMap.surname"
        class="cols-4"
        isRequired
      />
      <base-input
        v-model="main.name"
        id="name"
        type="text"
        label="Имя"
        name="name"
        :errors="errorsMap.name"
        class="cols-4"
        isRequired
      />
      <base-input
        v-model="main.patronymic"
        id="patronymic"
        type="text"
        label="Отчество"
        name="patronymic"
        class="cols-4"
      />
      <base-input
        v-model="main.birthDate"
        id="birth-date"
        type="date"
        label="Дата рождения"
        name="birth-date"
        :errors="errorsMap.birthDate"
        class="cols-3"
        isRequired
      />
      <base-select
        v-model="main.sex"
        id="sex"
        label="Пол"
        name="sex"
        :options="[
          { value: '0', text: 'М' },
          { value: '1', text: 'Ж' },
        ]"
        class="cols-1 sex-select"
      />
      <base-input
        v-model="main.phoneNumber"
        id="phone-number"
        type="tel"
        label="Номер телефона"
        name="phone-number"
        :errors="errorsMap.phoneNumber"
        class="cols-4"
        maxLength="11"
        placeholder="7XXXXXXXXXX"
        isRequired
      />
      <base-select
        v-model="main.assignedDoctor"
        id="assigned-doctor"
        label="Лечащий врач"
        name="assigned-doctor"
        :options="[
          { value: '0', text: 'Иванов' },
          { value: '1', text: 'Захаров' },
          { value: '2', text: 'Чернышева' },
        ]"
        class="cols-4"
      />
      <base-select
        v-model="main.clientsGroup"
        id="clents-group"
        label="Группа клиентов"
        name="clents-group"
        :options="[
          { value: '0', text: 'VIP' },
          { value: '1', text: 'Проблемные' },
          { value: '2', text: 'ОМС' },
        ]"
        :errors="errorsMap.clientsGroup"
        multiple
        class="cols-4"
        isRequired
      />
      <base-input
        v-model="main.isNotSendTexting"
        id="is-not-send-texting"
        type="checkbox"
        label="Не отправлять СМС"
        name="is-not-send-texting"
        :errors="errorsMap.isNotSendTexting"
        class="cols-4 texting-checkbox"
      />
    </form-section>
    <form-section :title="'Адрес'">
      <base-input
        v-model="address.city"
        id="city"
        type="text"
        label="Город"
        name="city"
        :errors="errorsMap.city"
        class="cols-4"
        isRequired
      />
      <base-input
        v-model="address.country"
        id="country"
        type="text"
        label="Страна"
        name="country"
        class="cols-4"
      />
      <base-input
        v-model="address.region"
        id="region"
        label="Область"
        name="region"
        type="text"
        class="cols-4"
      />
      <base-input
        v-model="address.postcode"
        id="postcode"
        label="Индекс"
        name="postcode"
        type="text"
        class="cols-2"
      />
      <base-input
        v-model="address.house"
        id="house"
        label="Дом"
        name="house"
        type="text"
        class="cols-2"
      />
      <base-input
        v-model="address.street"
        id="street"
        label="Улица"
        name="street"
        type="text"
        class="cols-4"
      />
    </form-section>
    <form-section :title="'Паспортные данные'">
      <base-select
        v-model="docs.type"
        id="document-type"
        label="Тип документа"
        name="document-type"
        :options="[
          { value: '0', text: 'Паспорт' },
          { value: '1', text: 'Свидетельство о рождении' },
          { value: '2', text: 'Вод. удостоверение' },
        ]"
        :errors="errorsMap.type"
        class="cols-4"
        isRequired
      />
      <base-input
        v-model="docs.series"
        id="document-series"
        label="Серия"
        name="document-series"
        type="text"
        class="cols-4"
      />
      <base-input
        v-model="docs.number"
        id="document-number"
        label="Номер"
        name="document-number"
        type="text"
        class="cols-4"
      />
      <base-input
        v-model="docs.issuer"
        id="document-issuer"
        label="Кем выдан"
        name="document-issuer"
        type="text"
        class="cols-9"
      />
      <base-input
        v-model="docs.issueDate"
        id="document-issue-date"
        label="Дата выдачи"
        name="document-issue-date"
        type="date"
        :errors="errorsMap.issueDate"
        class="cols-3"
        isRequired
      />
    </form-section>
    <base-button :text="'Сохранить'" type="submit" class="save-button" />
  </form>
</template>

<script>
// components
import BaseInput from "./BaseInput";
import BaseSelect from "./BaseSelect";
import BaseButton from "./BaseButton";
import FormSection from "./FormSection";
// validation
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { startsWith, equalsLength } from "../customValidators";

export default {
  name: "AppForm",
  components: { BaseInput, BaseSelect, FormSection, BaseButton },
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
          this.setErrorsMap();
        } else {
          alert("Клиент успешно создан.");
        }
      });
    },
    setErrorsMap() {
      this.errorsMap = this.createErrorsMap();
    },
    createErrorsMap() {
      const errorsMap = {};
      this.v$.$errors.forEach((errObj) => {
        const currentProp = errObj.$property;
        currentProp in errorsMap
          ? errorsMap[currentProp].push(errObj.$message)
          : (errorsMap[currentProp] = [errObj.$message]);
      });
      return errorsMap;
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/variables"
@import "../styles/breakpoints"

.form
  margin-bottom: 24px
  display: flex
  flex-direction: column

  &-title
    font-weight: $fw-light
    font-size: $fs-big
    margin-top: 16px
    margin-left: 14px
    margin-bottom: 4px

.sex-select
  min-width: 60px

.texting-checkbox
  align-self: center

.save-button
  margin-top: 24px
  align-self: flex-end

@include mobile
  .save-button
    align-self: stretch
</style>
