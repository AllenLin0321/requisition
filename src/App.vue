<template>
  <div>
    <AppHeader />
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
    <Loading />
  </div>
</template>

<script>
import '@/assets/css/app.scss';
import AppHeader from './layout/AppHeader';
import Loading from './components/common/Loading';
export default {
  name: 'App',
  components: {
    AppHeader,
    Loading,
  },
};
</script>
