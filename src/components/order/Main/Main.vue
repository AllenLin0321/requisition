<template>
  <v-container fluid class="table-container">
    <v-layout row align-center mb-3>
      <!-- File Name on the top -->
      <v-toolbar-title>{{ fileName }}</v-toolbar-title>

      <!-- Change the file Name if clcck the EDIT -->
      <MainDialog/>

      <v-spacer></v-spacer>

      <!-- Download the pdf file -->
      <v-btn fab dark color="pink" @click="downloadPDF">
        <v-icon dark>cloud_download</v-icon>
      </v-btn>
    </v-layout>

    <!-- Data Header -->
    <MainHeader></MainHeader>

    <!-- Data -->
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
import MainDialog from "./MainDialog";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      todos: [
        {
          title: "title 1",
          description: "description 1"
        },
        {
          title: "title 2",
          description: "description 2"
        },
        {
          title: "title 3",
          description: "description 3"
        },
        {
          title: "title 4",
          description: "description 4"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["materials", "fileName"])
  },
  components: {
    MainDialog,
    MainHeader,
    MainData
  },
  methods: {
    downloadPDF() {
      var docDefinition = {
        content: [
          "這是第一個段落",
          "這是第二個段落"
        ],
        defaultStyle: {
          // 微軟正黑體
          font: "myjh"
        }
      };

      pdfMake.fonts = {
        Roboto: {
          normal: "Roboto-Regular.ttf",
          bold: "Roboto-Medium.ttf",
          italics: "Roboto-Italic.ttf",
          bolditalics: "Roboto-Italic.ttf"
        },
        /*这里是加入的微软雅黑字体*/
        myjh: {
          normal: "msjh.ttf",
          bold: "msjh.ttf",
          italics: "msjh.ttf",
          bolditalics: "msjh.ttf"
        }
      };

      //Export the PDF
      pdfMake.createPdf(docDefinition).download(this.fileName);
    }
  }
};
</script>

