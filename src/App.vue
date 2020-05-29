<template>
  <div>
    <AppHeader />
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import '@/assets/css/app.scss';
import AppHeader from './layout/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>
