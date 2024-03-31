<template>
  <form class="form" @submit="handleFormSubmit">
    <h1 class="form-title">Форма создания клиента</h1>
    <form-section :title="'Основная информация'">
      <div class="form-controls-wrapper">
        <base-input
          v-model="main.surname"
          id="surname"
          type="text"
          label="Фамилия"
          :errors="errorsMap.surname"
          class="cols-4"
        />
        <base-input
          v-model="main.name"
          id="name"
          type="text"
          label="Имя"
          :errors="errorsMap.name"
          class="cols-4"
        />
        <base-input
          v-model="main.patronymic"
          id="patronymic"
          type="text"
          label="Отчество"
          class="cols-4"
        />
        <base-input
          v-model="main.birthDate"
          id="birth-date"
          type="date"
          label="Дата рождения"
          :errors="errorsMap.birthDate"
          class="cols-3"
        />
        <base-select
          v-model="main.sex"
          id="sex"
          label="Пол"
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
          :errors="errorsMap.phoneNumber"
          class="cols-4"
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
          class="cols-4"
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
          class="cols-4"
        />
        <base-input
          v-model="main.isNotSendTexting"
          id="is-not-send-texting"
          type="checkbox"
          label="Не отправлять СМС"
          :errors="errorsMap.isNotSendTexting"
          class="cols-4 texting-checkbox"
        />
      </div>
    </form-section>
    <form-section :title="'Адрес'">
      <div class="form-controls-wrapper">
        <base-input
          v-model="address.city"
          id="city"
          type="text"
          label="Город"
          :errors="errorsMap.city"
          class="cols-4"
        />
        <base-input
          v-model="address.country"
          id="country"
          type="text"
          label="Страна"
          class="cols-4"
        />
        <base-input
          v-model="address.region"
          id="region"
          label="Область"
          type="text"
          class="cols-4"
        />
        <base-input
          v-model="address.postcode"
          id="postcode"
          label="Индекс"
          type="text"
          class="cols-2"
        />
        <base-input
          v-model="address.house"
          id="house"
          label="Дом"
          type="text"
          class="cols-2"
        />
        <base-input
          v-model="address.street"
          id="street"
          label="Улица"
          type="text"
          class="cols-4"
        />
      </div>
    </form-section>
    <form-section :title="'Паспортные данные'">
      <div class="form-controls-wrapper">
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
          class="cols-4"
        />
        <base-input
          v-model="docs.series"
          id="document-series"
          label="Серия"
          type="text"
          class="cols-4"
        />
        <base-input
          v-model="docs.number"
          id="document-number"
          label="Номер"
          type="text"
          class="cols-4"
        />
        <base-input
          v-model="docs.issuer"
          id="document-issuer"
          label="Кем выдан"
          type="text"
          class="cols-9"
        />
        <base-input
          v-model="docs.issueDate"
          id="document-issue-date"
          label="Дата выдачи"
          type="date"
          :errors="errorsMap.issueDate"
          class="cols-3"
        />
      </div>
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

.form
  margin-bottom: 24px

.form-title
  font-weight: $fw-light
  font-size: $fs-big

.form-controls-wrapper
  display: grid
  grid-template-columns: repeat(12, 1fr)
  row-gap: 10px
  column-gap: 20px

.cols-9
  grid-column: 9 span
.cols-4
  grid-column: 4 span
.cols-3
  grid-column: 3 span
.cols-2
  grid-column: 2 span
.cols-1
  grid-column: 1 span

.sex-select
  min-width: 45px

.texting-checkbox
  align-self: center

.save-button
  margin-top: 24px

@media (max-width: 648px)
  .form-controls-wrapper
    grid-template-columns: repeat(8, 1fr)

  .cols-9
    grid-column: 8 span

@media (max-width: 428px)
  .form-controls-wrapper
    grid-template-columns: repeat(4, 1fr)

  .cols-9
    grid-column: 4 span
</style>
