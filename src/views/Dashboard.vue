<template>
  <div>
    <base-header class="pb-6 pb-2 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Биржи США"
                      class="mb-2">
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Биржи Европы"
                      class="mb-2">
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Биржи России"
                      class="mb-2">
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Биржи Казахстана"
                      class="mb-2">
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
                >
                </b-table>
              </b-card>
              <b-card
                title="Заявка на покупку / продажу"
                tag="article"
                class="ml-5"
                style="width: 30%"
              >
<!--                <b-card-text>-->
<!--                  Some quick example text to build on the card title and make up the bulk of the card's content.-->
<!--                </b-card-text>-->

                <div style="display: flex; justify-content: space-around">
                  <label class="switch">
                    <input type="checkbox" v-model="isSell">
                    <span class="slider"></span>
                  </label>
                  <label>{{isSell ? "Продать" : "Купить"}}</label>
                </div>

                <b-button href="#" variant="primary">Go somewhere</b-button>
              </b-card>
            </div>
          </b-tab>
          <b-tab title="Европа"><p>I'm the second tab</p></b-tab>
          <b-tab title="Россия"><p>I'm a disabled tab!</p></b-tab>
          <b-tab title="Казахстан"><p>I'm a disabled tab!</p></b-tab>
        </b-tabs>
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

export default {
  components: {
    LineChart,
    BarChart,
    BaseProgress,
    StatsCard,
    PageVisitsTable,
    SocialTrafficTable
  },
  data() {
    return {
      isSell: false,
      sortBy: 'age',
      sortDesc: false,
      fields: [
        {key: 'delete', label: 'Удалить', sortable: true},
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
          delete: '',
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
    }
  },
  mounted() {
    this.initBigChart(0);
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
