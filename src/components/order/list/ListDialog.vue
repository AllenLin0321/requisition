<template>
  <!-- Change the file name -->
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn flat icon color="deep-orange" v-on="on">
        <v-icon>create</v-icon>
      </v-btn>
    </template>

    <v-card>
      <!-- Card Title -->
      <v-card-title class="headline teal lighten-4" primary-title
        >修改檔案名稱</v-card-title
      >

      <!-- Card Content -->
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field
                label="檔案名稱"
                id="newFileName"
                @keyup.enter="changeTitle"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-divider />

      <!-- Card Action -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="pink lighten-1" flat @click="dialog = false">
          <strong>取消</strong>
        </v-btn>
        <v-btn color="teal lighten-1" flat @click="changeTitle">
          <strong>完成</strong>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { CHANGE_FILENAME } from '../../../store/mutation-types';
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapMutations([CHANGE_FILENAME]),
    changeTitle() {
      this.dialog = false;
      this.CHANGE_FILENAME(newFileName.value);
    },
  },
};
</script>
