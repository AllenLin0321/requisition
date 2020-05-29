<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex
        xs12
        sm12
        md3
        :class="{ 'aside-sm': $vuetify.breakpoint.smAndDown }"
      >
        <Aside />
      </v-flex>
      <v-flex xs12 sm12 md9>
        <v-card dark class="order">
          <Main />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Aside from '@/components/order/Aside/Aside';
import Main from '@/components/order/Main/Main';
export default {
  components: {
    Aside,
    Main,
  },
};
</script>

<style scoped>
.aside-sm {
  margin-bottom: 30px;
}
.order {
  background-color: #445175;
}
</style>
