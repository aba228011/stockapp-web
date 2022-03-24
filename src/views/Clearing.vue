<template>
  <div>
    <base-header class="pb-3 pb-3 pt-3 pt-md-4 bg-gradient-success" style="color: white; font-size: 22px">
      Клиринг и расчеты
    </base-header>
    <b-container class="mt-3">
      <b-row>
        <b-tabs class="mt-3">
          <b-tab title="О лицензии" class="mt-4">
            <h3>
              О лицензии на осуществление клиринговой деятельности
            </h3>
            <p>
              С 23 июля 2012 года АО "Казахстанская фондовая биржа" осуществляет клиринговую деятельность на биржевых
              рынках финансовых инструментов на основании лицензии на осуществление деятельности на рынке ценных бумаг
              от 19 июля 2012 года № 4.2.3/1, выданной Комитетом по контролю и надзору финансового рынка и финансовых
              организаций Национального банка Республики Казахстан (клиринговая деятельность по сделкам с финансовыми
              инструментами на рынке ценных бумаг).
            </p>
          </b-tab>
          <b-tab title="Финансовые инструменты" class="mt-4">
            <h3>Список инструментов, принятых на клиринговое обслуживание</h3>
            <b-form-group class="mt-4">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selected"
                :options="options"
                name="flavour-1"
              ></b-form-checkbox-group>
            </b-form-group>
            <hr />

            <div v-for="s in selected" :key="s">
              <div style="display:flex; justify-content: space-between">
                <span @click="toggleShowTable(s)">{{options.find(el => el.value === s).text}}</span>
                <span class="clearing-icon-span" @click="toggleShowTable(s)">
                  <b-icon v-if="options.find(el => el.value === s).btn.show"
                  style="position: absolute; top: 5px; right: 5px;"
                  icon="chevron-up">
                  </b-icon>
                  <b-icon v-else
                  style="position: absolute; top: 5px; right: 5px;"
                  icon="chevron-down">
                  </b-icon>
                </span>
              </div>
              <hr />
              <b-table
                v-if="options.find(el => el.value === s).btn.show && s === 'monetary'"
                :items="monetaryData"
                :fields="finTableField"
                stacked="md"
                bordered
                outlined
                small
              ></b-table>
              <b-table
                v-if="options.find(el => el.value === s).btn.show && s === 'stock'"
                :items="stockData"
                :fields="finTableField"
                stacked="md"
                bordered
                outlined
                small
              ></b-table>
              <b-table
                v-if="options.find(el => el.value === s).btn.show && s === 'derivatives'"
                :items="derivativesData"
                :fields="finTableField"
                stacked="md"
                bordered
                outlined
                small
              ></b-table>
            </div>

          </b-tab>
          <b-tab title="Клиринговые участники" class="mt-4">
            <h3>Чтобы стать клиринговым участником нужно:</h3>
            <div class="mb-3">
              <b-row cols="3">
                <b-col>
                  <div>
                    <img src="img/clearing/clearing-icon-1.svg" alt="clearing-icon-1">
                  </div>
                  <p>Получить статус по выбранной категории</p>
                </b-col>
                <b-col>
                  <div>
                    <img src="img/clearing/clearing-icon-2.svg" alt="clearing-icon-2">
                  </div>
                  <p>Подключиться к системе электронного документооборота</p>
                </b-col>
                <b-col>
                  <div>
                    <img src="img/clearing/clearing-icon-3.svg" alt="clearing-icon-3">
                  </div>
                  <p>Подать заявление на присвоение статуса Клирингового участника</p>
                </b-col>
              </b-row>
              <hr>
              <div>
                <h5>Клиринговые участники</h5>
                <b-table
                  class="mt-2"
                  :items="clearingData"
                  :fields="clearingTableField"
                  stacked="md"
                  bordered
                  outlined
                ></b-table>
              </div>
            </div>
          </b-tab>
<!--          <b-tab title="Порядок Т+2">-->
<!--            ajkdnwd-->
<!--          </b-tab>-->
        </b-tabs>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      options: [
        { text: 'Инструменты валютного рынка', value: 'monetary', btn: {show: false} },
        { text: 'Инструменты фондового рынка', value: 'stock', btn: {show: false} },
        { text: 'Инструменты рынка деривативов', value: 'derivatives', btn: {show: false} }
      ],
      finTableField: [
        {
          key: 'code',
          label: 'Код'
        },
        {
          key: 'title',
          label: 'Наименование'
        }
      ],
      monetaryData: [
        {
          code: 'CNYKZT_0_001',
          title: 'операция валютного свопа в отношении китайского юаня с расчетами в тенге'
        },
        {
          code: 'CNYKZT_TOD',
          title: 'китайский юань с расчетами в тенге'
        },
        {
          code: 'USDKZT_TOD',
          title: 'доллар США с расчетами в тенге'
        }
      ],
      stockData: [
        {
          code: 'HSBK-4.22',
          title: 'фьючерсы'
        },
        {
          code: 'US-5.22',
          title: 'фьючерсы'
        }
      ],
      derivativesData: [
        {
          code: 'AAPL_KZ',
          title: 'простая акция'
        },
        {
          code: 'VZ_KZ',
          title: 'простая акция'
        },
        {
          code: 'SBUX_KZ',
          title: 'простая акция'
        },
        {
          code: 'TSLA_KZ',
          title: 'простая акция'
        },
        {
          code: 'KSPI',
          title: 'простая акция'
        },
        {
          code: 'MSFT_KZ',
          title: 'простая акция'
        }
      ],
      clearingTableField: [
        {
          key: 'title',
          label: 'Наименование'
        },
        {
          key: 'licenceCode',
          label: 'Лицензия, номер'
        },
        {
          key: 'licenceDate',
          label: 'Лицензия, дата выдачи'
        }
      ],
      clearingData: [
        {
          title: 'Bank RBK',
          licenceCode: '№ 1.2.100/245/41',
          licenceDate: '05.04.21'
        },
        {
          title: 'ForteBank',
          licenceCode: '1.2.29/197/36',
          licenceDate: '03.02.20'
        },
        {
          title: 'Альфа-Банк',
          licenceCode: '1.2.61/237',
          licenceDate: '03.02.20'
        },
        {
          title: 'Исламский Банк "Al Hilal"',
          licenceCode: '1.3.69',
          licenceDate: '03.02.20'
        }
      ]
    };
  },
  methods: {
    toggleShowTable(value) {
      const element = this.options.find(el => el.value === value);
      element.btn.show = !element.btn.show;
    }
  }
};
</script>
<style scoped>
.clearing-icon-span{
  width: 32px;
  height: 32px;
  color: #3cbd0d;
  border: 1px solid #3cbd0d;
  border-radius: 50%;
  font-size: 135.71429%;
  position: relative;
}
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
</style>
