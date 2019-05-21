<template>
  <v-card dark color="#EEEEEE">
    <v-card-text class="pa-4 mainLabel">
      <Tree :data="tree2data" draggable="draggable" cross-tree="cross-tree">
        <div slot-scope="{data, store}">
          <template v-if="!data.isDragPlaceHolder" class="subItem">
            <b
              v-if="data.children &amp;&amp; data.children.length"
              @click="store.toggleOpen(data)"
            >{{data.open ? '-' : '+'}}&nbsp;</b>
            <span>{{data.text}}</span>
          </template>
        </div>
      </Tree>
    </v-card-text>
  </v-card>
</template>

<script>
import { DraggableTree } from "vue-draggable-nested-tree";
export default {
  components: { Tree: DraggableTree },
  data() {
    return {
      tree2data: [
        { text: "node 1" },
        { text: "node 2" },
        { text: "node 3" },
        { text: "node 4" }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
.mainLabel {
  color: #4e342e;
  font-size: 1.5rem;
}

.subItem {
  cursor: pointer;
}
</style>
