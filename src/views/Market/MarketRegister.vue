<template>
  <div>
    <base-header class="pb-6 pb-2 pt-5 pt-md-8 bg-gradient-success">
    </base-header>

    <b-form-group label="Radios using options and slots" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-slots"
        v-model="selectedType"
        :aria-describedby="ariaDescribedby"
        name="radio-options-slots"
      >
        <b-form-radio :value="{ isCompany: true, isBroker: false, isDealer: false }">Компания</b-form-radio>
        <b-form-radio :value="{ isCompany: false, isBroker: true, isDealer: false }">Брокер</b-form-radio>
        <b-form-radio :value="{ isCompany: false, isBroker: false, isDealer: true }">Дилер</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Название:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Описание:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.descr"
          placeholder="Enter description"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Сектор:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="number"
          v-model="form.sector"
          placeholder="Enter sector"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Количество сотрудников:" label-for="input-3">
        <b-form-input
          id="input-2"
          type="number"
          v-model="form.employees"
          placeholder="Employees"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Актив:" label-for="input-3">
        <b-form-input
          id="input-2"
          type="number"
          v-model="form.assets"
          placeholder="Assets"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Комиссия:" label-for="input-3">
        <b-form-input
          id="input-2"
          type="float"
          v-model="form.commission"
          placeholder="Assets"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";

export default {
  name: "MarketRegister",
  data() {
    return {
      form: {
        name: '',
        descr: '',
        sector: 0,
        employees: 0,
        assets: 0,
        commission: 0
      },
      types: [{text: 'Компания', value: 'isCompany'},
        {text: 'Брокер', value: 'isBroker'},
        {text: 'Дилер', value: 'isDealer'}
      ],
      selectedType: null,
      show: true
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        const requestData = {
          name: this.form.name,
          description: this.form.descr,
          sector: parseInt(this.form.sector),
          employees: parseInt(this.form.employees),
          assets: parseFloat(this.form.assets),
          commission: parseFloat(this.form.commission),
          ...this.selectedType,
        };
        const resp = await axios.post('api/market/register', requestData, {
          headers: authHeader(),
          'Content-Type': 'application/json'
        });
      } catch (error) {
        this.makeToast('danger', 'Ошибка запроса market/register', error.toString());
      }
    },
    onReset(event) {
      event.preventDefault()
      this.form.name = ''
      this.form.descr = ''
      this.form.sector = ''
      this.form.employees = 0
      this.form.assets = 0
      this.form.commission = 0

      this.selectedType = null;

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

    makeToast(variant, title, tostbody) {
      this.$bvToast.toast(tostbody, {
        title: title,
        variant: variant,
        toaster: 'b-toaster-top-center',
        autoHideDelay: 5000,
        appendToast: true
      });
    } // сообщение
  }
}
</script>

<style scoped>

</style>
