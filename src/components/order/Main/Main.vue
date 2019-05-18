<template>
  <v-container fluid class="table-container">

    <v-layout row align-center mb-3>
      <v-toolbar-title>叫料單</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab dark color="pink" @click="downloadPDF">
      <v-icon dark>cloud_download</v-icon>
    </v-btn>
    </v-layout>

    <MainHeader></MainHeader>
    <MainData
      v-for="(material, index) in materials"
      :key="index"
      :material="material"
      :index="index"
    ></MainData>

  </v-container>
</template>

<script>
import MainHeader from "./MainHeader";
import MainData from "./MainData";

export default {
  computed: {
    materials() {
      return this.$store.getters.materials;
    }
  },
  components: {
    MainHeader,
    MainData
  },
  methods: {
    downloadPDF() {
      alert('Download PDF!!!!!!');
    }
  }
};
</script>

