<template>
    <div v-show="!loading">
      <Header />
      <h3>Trading Dashboard</h3>
      <table>
        <thead>
          <th v-for="(item, index) in tableHeader" v-bind:key="index">{{item}}</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in finacialData" v-bind:key="index">
            <td v-for="(value, idx) in item" v-bind:key="idx">
              {{value}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from 'axios';
import Header from './Header';

export default {
  name: 'Dashboard',
  components: {
    Header,
  },
  data() {
    return {
      finacialData: [],
      tableHeader:[],
      loading: false,
    }
  },
  mounted() {
    this.$vs.loading();
    this.loading = true;
    axios({
      url: 'https://cors-owner.herokuapp.com/https://tools.dxfeed.com/ipf?TYPE=STOCK',
      method: 'get',
      headers: {
        Authorization: 'Basic ZGVtbzpkZW1v'
      }
    }).then( response => {
      let data = response.data.split('\n');
      this.tableHeader = data[0].split(',');
      var temp = this.tableHeader[0].split('#STOCK::=');
      this.tableHeader[0] = temp[1];
      for (var i=1; i<data.length; i++) {
        let value = data[i].split(',');
        if (value[2].includes('"')) {
          value[2] += value[3];
          value.splice(3, 1);
          value[2] = value[2].slice(1, value[2].length - 2);
        }
        temp = value[5].split(';');
        value[5] = temp.join(",\n");
        temp = value[9].split(';');
        value[9] = temp.join(",\n");
        this.finacialData.push(value);
      }
      const length = this.finacialData.length;
      this.finacialData.splice(length-2, 2);
      this.$vs.loading.close();
      this.loading = false;
    }).catch( error => {
      this.$vs.loading.close();
      this.loading = false;
      console.error(error);
    });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: rgb(57, 51, 77);
}
td, th {
  border: 1px solid black;
  padding: 3px;
  white-space: pre;
  text-align: center !important;
}
</style>
