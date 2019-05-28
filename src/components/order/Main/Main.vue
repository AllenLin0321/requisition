<template>
  <v-container fluid class="table-container">
    <v-layout row align-center mb-3>
      <!-- File Name on the top -->
      <v-toolbar-title>{{ fileName }}</v-toolbar-title>

      <!-- Change the file Name if clcck the EDIT -->
      <MainDialog/>

      <v-spacer></v-spacer>

      <!-- Download the pdf file -->
      <v-btn fab dark color="pink" @click="downloadPDF" :small="$vuetify.breakpoint.smAndDown">
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
  computed: {
    ...mapGetters(["materials", "fileName", "header"])
  },
  components: {
    MainDialog,
    MainHeader,
    MainData
  },
  methods: {
    downloadPDF() {
      let docDefinition = {
        content: [
          {
            layout: "lightHorizontalLines", // optional
            table: {
              // Declare how many rows should be treated as headers
              headerRows: 1,
              widths: ["auto", "*", "10%", "10%", "*"],

              // Table Header
              body: [
                [
                  this.header.order,
                  this.header.item,
                  this.header.quantity,
                  this.header.unit,
                  this.header.note
                ]
              ]
            },
            style: "table"
          }
        ],
        styles: {
          table: {
            fontSize: 16,
            bold: true
          }
        },
        defaultStyle: {
          // 微軟正黑體
          font: "myjh"
        }
      };

      this.materials.forEach((element, index) => {
        const data = [];
        data.push(index + 1);
        data.push(element.item);
        data.push(element.quantity);
        data.push(element.unit);
        data.push(element.note ? element.note : " ");
        docDefinition.content[0].table.body.push(data);
      });

      pdfMake.fonts = {
        Roboto: {
          normal: "Roboto-Regular.ttf",
          bold: "Roboto-Medium.ttf",
          italics: "Roboto-Italic.ttf",
          bolditalics: "Roboto-Italic.ttf"
        },
        myjh: {
          normal: "msjh.ttf",
          bold: "msjh.ttf",
          italics: "msjh.ttf",
          bolditalics: "msjh.ttf"
        }
      };

      //Export the PDF
      pdfMake.createPdf(docDefinition).download(this.fileName);
      console.log(this.materials);
    }
  }
};
</script>

