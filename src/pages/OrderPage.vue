<template>
  <v-container id="order-page" fluid>
    <v-layout row wrap>
      <v-flex
        xs12
        sm12
        md3
        :class="{ 'aside-sm': $vuetify.breakpoint.smAndDown }"
      >
        <CategoryMain />
      </v-flex>
      <v-flex xs12 sm12 md9>
        <v-card dark id="order">
          <ListMain />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CategoryMain from '@/components/order/category/CategoryMain';
import ListMain from '@/components/order/list/ListMain';
import { mapActions } from 'vuex';
export default {
  components: {
    CategoryMain,
    ListMain,
  },
  created() {
    this.fetchCatelog();
  },
  methods: {
    ...mapActions(['fetchCatelog']),
  },
};
</script>
