<template>
  <v-container fluid class="table-container">
    <v-layout row align-center mb-3>
      <v-toolbar-title>{{ fileName }}</v-toolbar-title>

      <!-- Change the file name -->
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn flat icon color="deep-orange" v-on="on">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <v-card>
          <!-- Card Title -->
          <v-card-title class="headline teal lighten-4" primary-title>修改檔案名稱</v-card-title>

          <!-- Card Content -->
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex>
                  <v-text-field label="檔案名稱" id="newFileName" @keyup.enter="changeTitle" ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-divider/>

          <!-- Card Action -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue lighten-1" flat @click="changeTitle">
              <strong>完成</strong>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
import jsPDF from "jspdf";

export default {
  data() {
    return {
      fileName: "叫料單",
      dialog: false
    };
  },
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
    changeTitle() {
      this.dialog = false;
      this.fileName = newFileName.value;
    },
    downloadPDF() {
      let pdfName = this.fileName;
      var doc = new jsPDF();
      doc.text("Hello World", 10, 10);
      doc.save(pdfName + ".pdf");
    }
  }
};
</script>

