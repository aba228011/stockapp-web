<template>
  <card class="card-stats" :show-footer-line="true">
    <b-row>
      <b-col>
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-0" v-if="title">{{title}}</h5>
        </slot>
      </b-col>
    </b-row>
  </card>
</template>
<script>
  import Card from './Card.vue';

  export default {
    name: 'stats-card',
    components: {
      Card
    },
    props: {
      title: String
    }
  };
</script>
<style></style>
