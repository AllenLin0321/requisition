<template>
  <v-container>
    <v-layout sm6 mb-3>
      <v-flex class="action">
        <v-btn color="blue-grey" class="white--text">
          新增主目錄
          <v-icon right dark>add_circle</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout sm12 mb-3>
      <v-flex>
          <LabelItem/>
      </v-flex>
    </v-layout>
    <v-layout sm12 mb-3>
      <v-flex>
          <LabelItem/>
      </v-flex>
    </v-layout>
    <v-layout sm12 mb-3>
      <v-flex>
          <LabelItem/>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import LabelItem from "./LabelItem";
import { DraggableTree } from "vue-draggable-nested-tree";
export default {
  components: {
    LabelItem
  }
};
</script>


<style lang="scss" scoped>
</style>

