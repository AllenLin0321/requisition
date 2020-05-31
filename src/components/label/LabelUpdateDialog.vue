<template>
  <!-- Change the file name -->
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <!-- Card Title -->
      <v-card-title class="headline teal lighten-4" primary-title
        >修改目錄名稱</v-card-title
      >

      <!-- Card Content -->
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field
                label="新目錄名稱"
                v-model="newCatelogName"
                @keyup.enter="newCatelog"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-divider />

      <!-- Card Action -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="pink lighten-1" flat @click="closeDialog">
          <strong>取消</strong>
        </v-btn>
        <v-btn color="teal lighten-1" flat @click="newCatelog">
          <strong>完成</strong>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex';
import { EDIT_CATEGORY } from '../../store/mutation-types';
export default {
  props: ['isShowDialog', 'selectedCategory'],
  data() {
    return {
      newCatelogName: '',
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.isShowDialog;
      },
      set(isShowDialog) {
        if (!isShowDialog) {
          this.closeDialog();
        }
      },
    },
  },
  methods: {
    ...mapMutations([EDIT_CATEGORY]),
    newCatelog() {
      this.EDIT_CATEGORY({
        selectedCategory: this.selectedCategory,
        newCatelogName: this.newCatelogName,
      });
      this.closeDialog();
    },
    closeDialog() {
      this.newCatelogName = '';
      this.$emit('closeDialog');
    },
  },
  created() {},
};
</script>
