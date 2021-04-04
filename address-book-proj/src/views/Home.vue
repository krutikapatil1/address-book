<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12 mt-5">
        <table class="table">
          <thead>
            <tr>
              <th><input type="checkbox" class="checkbox" @change="checkAll()" :disabled="items.length === 0"></th>
              <th>Id</th>
              <th>Name</th>
              <th>Location</th>
              <th>Building</th>
              <th>Office</th>
              <th>Cell</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key=item.id class="table-row" :class="{'row-selected': selectedItems.find(i => i.id === item.id), 'new-row': item.id === ''}">
              <td>
      <input type="checkbox" class="checkbox" @change="rowSelected(item)" :disabled="item.id === ''">
              </td>
              <td>{{item.id}}</td>
              <td class="name">
                <span v-if="item.id === ''">
                  <input type="text" v-model="item.name">
                </span>
                <span v-else>{{item.name}}</span>
              </td>
              <td class="location">
                <span v-if="item.id === ''">
                  <input type="text" v-model="item.location">
                </span>
                <span v-else>{{item.location}}</span>
              </td>
              <td class="building">
                <span v-if="item.id === ''">
                  <input type="text" v-model="item.building">
                </span>
                <span v-else>{{item.building}}</span>
              </td>
              <td class="office">
                <span v-if="item.id === ''">
                  <input type="text" v-model="item.office">
                </span>
                <span v-else>{{item.office}}</span>
              </td>
              <td class="cell" @dblclick="cellClicked">
                <span v-if="item.id === ''">
                  <input type="text" v-model="item.cell">
                </span>
                <span v-else>{{item.cell}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-3 col-xs-3" style="text-align:right">
        <button class="btn btn-success" @click="addNewItem">Add New</button>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-3" style="text-align:left">
        <button class="btn btn-warning" @click="updateRecords">Update</button>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-3 offset-md-3 offset-sm-3 offset-xs-3">
        <button class="btn btn-danger" @click="deleteRecords">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
      fields: ['check_all', 'id', 'name', 'location', 'building', 'office', 'cell'],
     selectedItems: [],
     unsavedItems: []
    }
  },
  computed: {
    ...mapGetters(['items'])
  },
  methods: {
    cellClicked(event) {
      const cellPhoneEl = event.target;
      const inputEl = document.createElement('input');
      inputEl.style.borderRadius = '2px';
      inputEl.style.border = '1px solid #ddd';
      inputEl.style.textAlign = 'center';
      inputEl.value = cellPhoneEl.textContent;
      cellPhoneEl.textContent = "";
      cellPhoneEl.appendChild(inputEl);
    },
    rowSelected(item) {
      if(this.selectedItems.find(i => i.id === item.id)) {
        this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
      }
      else {
      
      this.selectedItems.push(item);
      }
    },
    checkAll() {
      if (this.selectedItems.length == 0) {
        this.selectedItems = this.items;
      }
      else {
        this.selectedItems = [];
      }
    },
    deleteRecords() {
      this.$store.dispatch('deleteItems', this.selectedItems);
      this.selectedItems = [];
    },
    addNewItem() {
      const newItem = {
        id: '',
        name: '',
        location: '',
        building: '',
        office: '',
        cell: ''
      }
      this.items.push(newItem);
    },
    updateRecords() {
      this.$store.dispatch('addItems');
    }
  }
}
</script>

<style scoped>
.row-selected {
  background-color:#ffa ;
}

.checkbox {
  cursor: pointer;
}

input {
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 80%;
}

input:focus {
    outline: none !important;
    border:1px solid red;
    box-shadow: 0 0 10px #719ECE;
}
</style>