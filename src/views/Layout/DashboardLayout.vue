<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item :link="{
          name: 'Рынки и торги',
          icon: 'ni ni-chart-bar-32'
        }">
          <sidebar-item :link="{
            name: 'Начать торговать',
            path: '/start-trading'
          }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Фондовый рынок',
                path: '/dashboard',
                icon: 'ni ni-tv-2 text-primary',
              }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Акции',
                path: '/'
              }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Список инструментов',
                path: '/'
              }"></sidebar-item>
          <!--          <sidebar-item :link="{-->
          <!--                name: 'User Profile',-->
          <!--                path: '/profile'-->
          <!--              }"></sidebar-item>-->
          <!--          <sidebar-item :link="{-->
          <!--                name: 'Tables',-->
          <!--                path: '/tables',-->
          <!--                icon: 'ni ni-bullet-list-67 text-red'-->
          <!--               }"></sidebar-item>-->
          <sidebar-item :link="{
                name: 'Просмотр торгов',
                path: '/',
                icon: 'ni ni-bullet-list-67 text-red'
               }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Регламент торгов и клиринга',
                path: '/',
                icon: 'ni ni-bullet-list-67 text-red'
               }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Клиринг и расчеты',
                path: '/clearing-and-settlement',
                icon: 'ni ni-bullet-list-67 text-red'
               }"></sidebar-item>
        </sidebar-item>

        <sidebar-item :link="{
          name: 'Продукты и услуги',
          icon: 'ni ni-app text-red'
        }">
          <sidebar-item :link="{
                name: 'Листинг',
                path: '/'
              }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Список компаний',
                path: '/'
              }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Рэнкинг активности',
                path: '/'
              }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Клиринговые участники',
                path: '/'
              }"></sidebar-item>
        </sidebar-item>

        <sidebar-item :link="{
          name: 'Правила',
          icon: 'ni ni-ruler-pencil text-brown'
        }">
          <sidebar-item :link="{
                name: 'Правила платформы',
                path: '/'
              }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Законадательство',
                path: '/'
              }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Дополнительные материалы',
                path: '/'
              }"></sidebar-item>
        </sidebar-item>

        <sidebar-item :link="{
          name: 'Пресс центр',
          icon: 'ni ni-tv-2 text-orange'
        }">
          <sidebar-item :link="{
                name: 'Все новости',
                path: '/'
              }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Новости рынков',
                path: '/'
              }"></sidebar-item>
          <sidebar-item :link="{
                name: 'Новости биржы',
                path: '/'
              }"></sidebar-item>
        </sidebar-item>

        <sidebar-item :link="{
                name: 'Брокерам и дилерам',
                path: '/',
                icon: 'ni ni-active-40 text-green'
               }"></sidebar-item>
        <sidebar-item :link="{
                name: 'Инвесторам',
                path: '/',
                icon: 'ni ni-bullet-list-67 text-red'
               }"></sidebar-item>
        <sidebar-item :link="{
                name: 'Компаниям',
                path: '/future-listing-about'
               }"></sidebar-item>
        <sidebar-item :link="{
                name: 'Пользователям рыночной информации',
                path: '/',
                icon: 'ni ni-single-02'
               }"></sidebar-item>

        <sidebar-item :link="{
            name: 'Login',
            path: '/login',
            icon: 'ni ni-key-25 text-info'
          }"></sidebar-item>
        <sidebar-item :link="{
            name: 'Register',
            path: '/register',
            icon: 'ni ni-circle-08 text-pink'
          }"></sidebar-item>
      </template>

      <!--      <template slot="links-after">-->
      <!--        <hr class="my-3">-->
      <!--        <h6 class="navbar-heading p-0 text-muted">Documentation</h6>-->

      <!--        <b-nav class="navbar-nav mb-md-3">-->
      <!--          <b-nav-item-->
      <!--               href="https://www.creative-tim.com/learning-lab/bootstrap-vue/quick-start/argon-dashboard"-->
      <!--               >-->
      <!--              <i class="ni ni-spaceship"></i>-->
      <!--              <b-nav-text class="p-0">Getting started</b-nav-text>-->
      <!--          </b-nav-item>-->
      <!--          <b-nav-item href="https://www.creative-tim.com/learning-lab/bootstrap-vue/colors/argon-dashboard">-->
      <!--              <i class="ni ni-palette"></i>-->
      <!--              <b-nav-text class="p-0">Foundation</b-nav-text>-->
      <!--          </b-nav-item>-->
      <!--          <b-nav-item href="https://www.creative-tim.com/learning-lab/bootstrap-vue/avatar/argon-dashboard">-->
      <!--              <i class="ni ni-ui-04"></i>-->
      <!--              <b-nav-text class="p-0">Components</b-nav-text>-->
      <!--          </b-nav-item>-->
      <!--        </b-nav>-->
      <!--      </template>-->
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
<!--      <content-footer v-if="!$route.meta.hideFooter"></content-footer>-->
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import { FadeTransition } from 'vue2-transitions';

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        initScrollbar('sidenav');
      }
    }
  },
  mounted() {
    this.initScrollbar()
  }
};
</script>
<style lang="scss">
</style>
