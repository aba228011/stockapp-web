<template>
  <div class="pb-6 pb-2 pt-5 pt-md-8">
    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
        <b-tab title="Личные данные" :title-link-class="linkClass(0)">
          <div style="display: flex; justify-content: space-around">
            <label class="switch" >
              <input type="checkbox" v-model="isCompany">
              <span class="slider"></span>
            </label>
            <label>{{isCompany ? "Юридическое лицо" : "Физическое лицо"}}</label>
          </div>
          <div v-if="isCompany">
            <div style="font-weight: bolder">
              <b-card >
                <b-form-group
                  label-cols-lg="3"
                  label="Данные организации"
                  label-size="lg"
                  label-class="font-weight-bold pt-0"
                  class="mb-0"
                >
                  <b-form-group
                    label="Страна:"
                    label-for="nested-country"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-select id="nested-country" v-model="selected" :options="options"></b-form-select>
                  </b-form-group>

                  <b-form-group
                    label="Полное наименование:"
                    label-for="nested-fullName"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input id="nested-fullName"></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Сокращенное наименование:"
                    label-for="nested-shortName"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input id="nested-shortName"></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Дата регистрации:"
                    label-for="nested-regDate"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input type="date" id="nested-regDate"></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Регистрационный номер :"
                    label-for="test"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input id="nested-regNumber"></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Орган, осуществивший регистрацию компании:"
                    label-for="nested-regOrg"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input id="nested-regOrg"></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Юридический адрес:"
                    label-for="nested-companyAddress"
                    label-cols-sm="3"
                    label-align-sm="right"
                  >
                    <b-form-input id="nested-companyAddress"></b-form-input>
                  </b-form-group>
                </b-form-group>
              </b-card>
            </div>
          </div>
          <div v-else role="group" style="font-weight: bolder">
              <label for="inputName">Имя:</label>
              <b-form-input
                id="inputName"
                v-model="name"
                :state="nameState"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Введите ваше имя"
                trim
              ></b-form-input>

              <!-- This will only be shown if the preceding input has an invalid state -->
              <b-form-invalid-feedback id="input-live-feedback">
                Enter at least 5 letters
              </b-form-invalid-feedback>
              <p></p>
              <label for="inputSurName">Фамилия:</label>
              <b-form-input
                id="inputSurName"
                v-model="surName"
                :state="surNameState"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Введите вашу фамилию"
                trim
              ></b-form-input>

              <!-- This will only be shown if the preceding input has an invalid state -->
              <b-form-invalid-feedback id="input-live-feedback">
                Enter at least 10 letters
              </b-form-invalid-feedback>
              <p/>
              <label for="inputEmail">Почта:</label>
            <b-form-input
                id="inputEmail"
                v-model="email"
                :state="emailState"
                placeholder="Введите вашу почту"
                trim
            ></b-form-input>
              <p></p>
          </div>
          <b-button variant="outline-primary">Перейти к следующиму шагу</b-button>
        </b-tab>
        <b-tab title="Выбор тарифного плана" :title-link-class="linkClass(1)">
            <rate></rate>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>

import Rate from '@/views/Rate'

export default {
  components: {
    Rate,
  },
  data() {
    return {
      tabIndex: 0,
      isCompany: false,
      name: '',
      surName: '',
      email: '',
      selected: null,
      options :[
        { value: null, text: 'Выберите страну' },
        { value: 'kz', text: 'Казахстан' },
        { value: 'rus', text: 'Россия' },
        { value: 'usa', text: 'США' }
      ]
    }
  },
  computed: {
    nameState() {
      return this.name.length > 5
    },

    surNameState() {
      return this.surName.length > 5
    },
    emailState() {
      return this.email.endsWith("@gmail.com")
    }
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-green']
      } else {
        return ['bg-white']
      }
    }
  }
}
</script>

<style>

.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

nput:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
