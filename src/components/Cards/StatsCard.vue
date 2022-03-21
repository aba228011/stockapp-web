<template>
  <card class="card-stats" :show-footer-line="true">
    <b-row>
      <b-col>
        <div style="display: flex; justify-content: space-around; align-items: center">
        <svg width="100" height="100" viewBox="-100 -100 200 200">
          <circle class="minute_marker" r="90" pathLength="60" />
          <circle class="hour_marker" r="90" pathLength="60" />

          <g id="hour_hand" ref="hourHand">
          <line class="hand" x1="0" y1="0" x2="0" y2="-50" />
          <line class="hand hand--thick" x1="0" y1="-12" x2="0" y2="-50" />
          </g>

          <g id="minute_hand" ref="minuteHand">
          <line class="hand" x1="0" y1="0" x2="0" y2="-80" />
          <line class="hand hand--thick" x1="0" y1="-12" x2="0" y2="-80" />
          </g>

          <g id="second_hand" ref="secondHand">
          <line class="hand hand--second" x1="0" y1="12" x2="0" y2="-80" />
          </g>
        </svg>
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-0" v-if="title">{{title}}</h5>
        </slot>
        </div>
      </b-col>
    </b-row>
  </card>
</template>
<script>
  import Card from './Card.vue';
  import moment from 'moment-timezone';

  export default {
    name: 'stats-card',
    components: {
      Card
    },
    props: {
      title: String,
      timeZone: String
    },
    methods: {
      animate() {
        const date = new Date();

        const hoursElement = this.$refs.hourHand
        const minutesElement = this.$refs.minuteHand
        const secondsElement = this.$refs.secondHand

        let hour = null;
        let minute = null;
        let second = null;
        switch (this.timeZone) {
          case 'NewYork':
            if (date.getHours() > 0 && date.getHours() <= 10) {
              hour = (24 + (date.getHours() - 10)) % 12;
            } else {
              hour = (date.getHours() - 10) % 12;
            }
            minute = date.getMinutes();
            second = date.getSeconds();
            break;
          case 'Berlin':
            if (date.getHours() > 0 && date.getHours() <= 5) {
              hour = (24 + (date.getHours() - 5)) % 12;
            } else {
              hour = (date.getHours() - 5) % 12;
            }
            minute = date.getMinutes();
            second = date.getSeconds();
            break;
          case 'Moscow':
            if (date.getHours() > 0 && date.getHours() <= 3) {
              hour = (24 + (date.getHours() - 3)) % 12;
            } else {
              hour = (date.getHours() - 3) % 12;
            }
            minute = date.getMinutes();
            second = date.getSeconds();
            break;
          case 'Astana':
            hour = date.getHours() % 12;
            minute = date.getMinutes();
            second = date.getSeconds();
            break
          default:
            console.log('Please register your timezone here');

        }

        hoursElement.setAttribute("transform", `rotate(${(360 / 12) * hour})`);
        minutesElement.setAttribute("transform", `rotate(${(360 / 60) * minute})`);
        secondsElement.setAttribute("transform", `rotate(${(360 / 60) * second})`);

        requestAnimationFrame(this.animate);
      }
    },
    mounted() {
      this.animate();
      // const n_y = moment().tz("America/New_York").format();
      // const hour = n_y.split('T')[1].split('-')[0].split(':')[0];
      // console.log(hour)
      // const hour = n_y.split('T')[1].split('-')[0].split(':')[0];
      // console.log(hour)
      // const hour = n_y.split('T')[1].split('-')[0].split(':')[0];
      // console.log(hour)
      // console.log(moment().tz("America/New_York").format())
      // console.log(typeof moment().tz("America/New_York").format())
    }
  };
</script>
<style scoped>
.hand {
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
}

.hand--thick {
  stroke-width: 7;
}

.hand--second {
  stroke: yellow;
}
</style>
