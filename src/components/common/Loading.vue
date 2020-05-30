<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="isLoading"
      persistent
      fullscreen
      content-class="loading-dialog"
    >
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <v-progress-circular
            indeterminate
            :size="70"
            :width="7"
            color="purple"
          ></v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Loading',
  computed: {
    ...mapState({ isLoading: ({ isLoading }) => isLoading }),
  },
};
</script>

<style>
.loading-dialog {
  opacity: 0.7;
  background-color: ghostwhite;
}
</style>
