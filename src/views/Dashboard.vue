<template>
  <div>
    <base-header class="pb-6 pb-2 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Биржи США"
                      class="mb-2" time-zone="NewYork">
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Биржи Европы"
                      class="mb-2" time-zone="Berlin">
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Биржи Россиии"
                      class="mb-2" time-zone="Moscow">
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Биржи Казахстана"
                      class="mb-2" time-zone="Astana">
          </stats-card>
        </b-col>
      </b-row>
    </base-header>


    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row class="pt-4 mt-7">
        <b-tabs content-class="mt-1" style="min-width: 100%">
          <b-tab title="Америка">
            <div style="display: flex">
              <b-card>
                <b-table
                  :items="items"
                  :fields="fields"
                  stacked="md"
                  bordered
                  outlined
                  small
                  table-variant="white"
                  hover
                  style="width: 70%;"
                  @row-clicked="chooseStock"
                >
                </b-table>
              </b-card>
              <b-card
                title="Заявка на покупку / продажу"
                tag="article"
                class="ml-5"
                style="width: 30%"
              >

                <div style="display: flex; justify-content: space-around">
                  <label class="switch">
                    <input type="checkbox" v-model="isSell">
                    <span class="slider"></span>
                  </label>
                  <label>{{ isSell ? "Продать" : "Купить" }}</label>
                </div>

                <b-form-group
                  label="Сумма сделки: "
                  label-for="sum-of-deal"
                  label-cols-sm="6"
                >
                  <b-form-input id="sum-of-deal" type="number" v-model="sumOfDeal"></b-form-input>
                </b-form-group>

                <!--                <b-form-group-->
                <!--                  label="Мультипликатор: "-->
                <!--                  label-cols-sm="6"-->
                <!--                >-->
                <!--                  <b-form-input-->
                <!--                                type="number"-->
                <!--                                v-model="multiplier"-->
                <!--                                style="width: 100px"-->
                <!--                  ></b-form-input>-->
                <!--                  = {{ sumOfDeal * multiplier }}-->
                <!--                </b-form-group>-->

                <div style="display:flex; justify-content: space-between; margin-top: 10px">
                  <div>Мультипликатор:</div>
                  <div style="width: 50%; padding-left: 5px; display:flex; justify-content: space-between">
                    <b-form-input
                      type="number"
                      v-model="multiplier"
                      style="width: 100px;"
                    ></b-form-input>
                    <div>
                      =
                    </div>
                    <div>
                      {{ sumOfDeal * multiplier }}
                    </div>
                  </div>
                </div>

                <details>
                  <summary>Take Profit и Stop Loss</summary>

                  <div style="display:flex; justify-content: space-between; margin-top: 10px">
                    <b-form-checkbox
                      v-model="takeStatus"
                    >
                      Take Profit
                    </b-form-checkbox>

                    <div v-show="takeStatus">+{{ ((takeProfitValue / sumOfDeal) * 100).toFixed(2) }}%</div>
                    <b-form-input type="number"
                                  v-model="takeProfitValue"
                                  :disabled="!takeStatus"
                                  style="width: 100px"
                    ></b-form-input>
                  </div>
                  <div style="display:flex; justify-content: space-between; margin-top: 10px">
                    <b-form-checkbox
                      v-model="stopStatus"
                    >
                      Stop Loss
                    </b-form-checkbox>

                    <div v-show="stopStatus">-{{ ((stopLessValue / sumOfDeal) * 100).toFixed(2) }}%</div>
                    <b-form-input type="number"
                                  v-model="stopLessValue"
                                  :disabled="!stopStatus"
                                  style="width: 100px"
                    ></b-form-input>
                  </div>
                </details>


                <b-button variant="primary" class="mt-4">{{ isSell ? "Продать" : "Купить" }}</b-button>
              </b-card>
            </div>
            <b-card>
              <div style="display: flex; justify-content: space-around">
                <b-form-select v-model="selectedInterval" :options="intervalOptions" size="sm" class="mt-3"
                               style="width: 200px;"></b-form-select>
                <div class="mt-3">Интервал: <strong>{{ selectedInterval }}</strong></div>
              </div>
              <Plotly :data="plotData" :layout="layout" :display-mode-bar="false"></Plotly>
            </b-card>
          </b-tab>
          <b-tab title="Европа"><p>I'm the second tab</p></b-tab>
          <b-tab title="Россия"><p>I'm a disabled tab!</p></b-tab>
          <b-tab title="Казахстан"><p>I'm a disabled tab!</p></b-tab>
        </b-tabs>
      </b-row>

      <b-row>
        <h1 style="margin: 10px">Новости</h1>

        <b-card-group deck>
          <b-card header-bg-variant="secondary" bg-variant="white" text-variant="white"
                  class="text-center">
            <template #header>
              <b-link href="#" style="font-size: 25px; color: black">
                Рынки	&gt;
              </b-link>
            </template>
            <div style="position:relative; height: 100%; overflow-y:scroll;">
              <div style="margin-top: 10px;" v-for="n in newsList" :key="n.id">
                <b-link href="#">{{n.title}}</b-link>
                <div style="margin-top: 10px">{{n.timeNews}}</div>
              </div>
            </div>
          </b-card>

          <b-card header-bg-variant="secondary" bg-variant="white" text-variant="white"
                  class="text-center">
            <template #header>
              <b-link href="#" style="font-size: 25px; color: black">
                Компании &gt;
              </b-link>
            </template>
            <div style="position:relative; height: 100%; overflow-y:scroll;">
              <div style="margin-top: 10px;" v-for="n in newsList" :key="n.id">
                <b-link href="#">{{n.title}}</b-link>
                <div style="margin-top: 10px">{{n.timeNews}}</div>
              </div>
            </div>
          </b-card>
  
          <b-card header-bg-variant="secondary" bg-variant="white" text-variant="white"
                  class="text-center">
            <template #header>
              <b-link href="#" style="font-size: 25px; color: black">
                Биржа	&gt;
              </b-link>
            </template>
            <div style="position:relative; height: 100%; overflow-y:scroll;">
              <div style="margin-top: 10px;" v-for="n in newsList" :key="n.id">
                <b-link href="#">{{n.title}}</b-link>
                <div style="margin-top: 10px">{{n.timeNews}}</div>
              </div>
            </div>
          </b-card>
        </b-card-group>
      </b-row>

      <b-row>
        <b-col xl="8" class="mt-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Sales value</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                    class="mr-2 mr-md-0"
                    :active="bigLineChart.activeIndex === 0"
                    link-classes="py-2 px-3"
                    @click.prevent="initBigChart(0)">
                    <span class="d-none d-md-block">Month</span>
                    <span class="d-md-none">M</span>
                  </b-nav-item>
                  <b-nav-item
                    link-classes="py-2 px-3"
                    :active="bigLineChart.activeIndex === 1"
                    @click.prevent="initBigChart(1)"
                  >
                    <span class="d-none d-md-block">Week</span>
                    <span class="d-md-none">W</span>
                  </b-nav-item>
                </b-nav>
              </b-col>
            </b-row>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </card>
        </b-col>

        <b-col xl="4" class="mt-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </b-col>
            </b-row>

            <bar-chart
              :height="350"
              ref="barChart"
              :chart-data="redBarChart.chartData"
            >
            </bar-chart>
          </card>
        </b-col>
      </b-row>
      <!-- End charts-->

      <!--Tables-->
      <b-row class="mt-5">
        <b-col xl="8" class="mb-5 mb-xl-0">
          <page-visits-table></page-visits-table>
        </b-col>
        <b-col xl="4" class="mb-5 mb-xl-0">
          <social-traffic-table></social-traffic-table>
        </b-col>
      </b-row>
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
// Charts
import * as chartConfigs from '@/components/Charts/config';
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';

// Components
import BaseProgress from '@/components/BaseProgress';
import StatsCard from '@/components/Cards/StatsCard';

// Tables
import SocialTrafficTable from './Dashboard/SocialTrafficTable';
import PageVisitsTable from './Dashboard/PageVisitsTable';
import {Plotly} from 'vue-plotly';

export default {
  components: {
    LineChart,
    BarChart,
    BaseProgress,
    StatsCard,
    PageVisitsTable,
    SocialTrafficTable,
    Plotly
  },
  data() {
    return {
      selectedStock: null,
      stockChartXValues: [],
      stockChartYValues: [],
      plotData: [],
      layout: null,
      intervalOptions: [
        {value: null, text: 'Выберите интервал'},
        {value: '1min', text: '1 минутный интервал'},
        {value: '5min', text: '5 минутный интервал'},
        {value: '15min', text: '15 минутный интервал'},
        {value: '30min', text: '30 минутный интервал'},
        {value: '60min', text: '60 минутный интервал'},
      ],
      selectedInterval: null,
      sumOfDeal: 1000,
      multiplier: 10,
      takeProfitValue: 300,
      stopLessValue: 200,
      isSell: false,
      takeStatus: false,
      stopStatus: false,
      sortBy: 'age',
      sortDesc: false,
      fields: [
        {key: 'action', label: '', sortable: false},
        {key: 'ticker', label: 'Тикер', sortable: true},
        {key: 'name_ru', label: 'Название', sortable: true},
        {key: 'buy', label: 'Покупка', sortable: false},
        {key: 'sell', label: 'Продажа', sortable: false},
        {key: 'deal', label: 'Сделка', sortable: false},
        {key: 'time', label: 'Время', sortable: false},
        {key: 'coefDay', label: 'За день', sortable: false},
        {key: 'procDay', label: '%/ день', sortable: false}
      ],
      items: [
        {
          age: 40,
          action: '',
          ticker: 'AAPL',
          name_ru: 'Apple',
          buy: 163,
          sell: 181,
          deal: 179.58,
          time: '13:38:58',
          coefDay: 5.21,
          procDay: '2%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'MSFT',
          name_ru: 'Microsoft',
          buy: 300.43,
          sell: 312.14,
          deal: 305.56,
          time: '13:38:58',
          coefDay: 4.21,
          procDay: '1.76%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        },
        {
          age: 40,
          action: '',
          ticker: 'KSPI.EU',
          name_ru: 'Kaspi.KZ JSC',
          buy: 47.00,
          sell: 60.00,
          deal: 50.50,
          time: '13:38:58',
          coefDay: 3.10,
          procDay: '6.54%',
          _rowVariant: 'white'
        }
      ],
      newsList: [
        {
          id: 1,
          title: '﻿18 марта значение Индекса KASE выросло на 0,77% до 3 372,76',
          context: 'Первая сделка дня зафиксировала значение индекса на уровне 3 346,87. \n' +
            'В ходе торгов максимальное значение индекса составило 3 378,64. \n' +
            'минимальное – 3 346,87.\n' +
            '\n' +
            'Объем сделок с акциями, включенными в представительский список \n' +
            'Индекса KASE, 18 марта вырос относительно предыдущего торгового дня \n' +
            'в 6,5 раза и составил 2 952,3 млн тенге (5 833,2 тыс. USD).',
          timeNews: '18.03.2022'
        },
        {
          id: 2,
          title: 'Дочерний Банк АО "Сбербанк России" сообщил о понижении агентством Fitch Ratings рейтинговых оценок банка',
          context: 'Долгосрочный рейтинг дефолта эмитента в иностранной и национальной валютах \n' +
            'понижен с "BBВ-" до уровня "В+"; краткосрочный рейтинг дефолта эмитента \n' +
            'в иностранной валюте понижен с "F3" до уровня "В"; национальный долгосрочный \n' +
            'рейтинг понижен с "AA+(kaz)" до уровня "ВВВ-(kaz)"; рейтинг устойчивости \n' +
            'понижен с уровня "bb" до "b+"; присвоен рейтинг поддержки акционеров "b-"; \n' +
            'рейтинг поддержки отозван.',
          timeNews: '18.03.2022'
        },
        {
          id: 3,
          title: 'С 10 марта введено в действие дополнение в Положение о маркет-мейкерах',
          context: 'Дополнением установлено, что в случаях, предусмотренных внутренним \n' +
            'документом KASE "Правила деятельности маркет-мейкеров", Правление \n' +
            'KASE вправе принять решение о неприменении к маркет-мейкеру \n' +
            'соответствующих санкций, в том числе, в случае возникновения \n' +
            'обстоятельств непреодолимой силы.',
          timeNews: '14.03.2022'
        },

      ],
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40]
        ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: 'Performance',
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Sales',
            data: [25, 20, 30, 22, 17, 29]
          }]
        },
        extraOptions: chartConfigs.blueChartOptions
      }
    };
  },
  methods: {
    chooseStock(record, index) {
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      console.log(record); // This will be the item data for the row
      if (record && record.hasOwnProperty('ticker')) {
        this.selectedStock = {
          ticker: record.ticker,
          name_ru: record.name_ru
        }
      }
    },
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            label: 'Performance',
            data: this.bigLineChart.allData[index]
          }
        ],
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    async fetchStock(interval) {
      this.layout = {
        title: this.selectedStock.name_ru
      };
      const pointerToThis = this;
      // console.log(pointerToThis);
      const API_KEY = 'Z0IIDOBOZUY3550O';
      // let StockSymbol = 'FB';
      // let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
      let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.selectedStock.ticker}&interval=${interval}&apikey=${API_KEY}`;
      let stockChartXValuesFunction = [];
      let stockChartYValuesFunction = [];

      await fetch(API_Call)
        .then(
          function (response) {
            return response.json();
          }
        )
        .then(
          function (data) {
            console.log(data);

            for (const key in data[`Time Series (${interval})`]) {
              stockChartXValuesFunction.push(key);
              stockChartYValuesFunction.push(data[`Time Series (${interval})`][key]['1. open']);
            }

            // console.log(stockChartXValuesFunction);
            pointerToThis.stockChartXValues = stockChartXValuesFunction;
            pointerToThis.stockChartYValues = stockChartYValuesFunction;
          }
        )
    }
  },
  mounted() {
    this.initBigChart(0);

  },
  watch: {
    async selectedInterval(newValue) {
      await this.fetchStock(newValue);
      // console.log(this.stockChartXValues)
      // console.log(this.stockChartYValues)
      this.plotData = [{
        x: this.stockChartXValues,
        y: this.stockChartYValues,
        type: 'scatter'
      }]
    }
  }
};
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

input:checked + .slider {
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
