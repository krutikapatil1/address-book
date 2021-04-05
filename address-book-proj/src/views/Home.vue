<template>
  <div class="container-fluid">
    <b-modal id="modal-xl" size="xl" ok-only v-model="modalShow" @hide="modalHidden" title="Updated the following items" header-bg-variant="primary" header-text-variant="light" footer-bg-variant="warning">
    <b-table :items="unsavedItems"></b-table>
  </b-modal>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12 mt-5">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th rowspan="2"><input type="checkbox" class="checkbox" @change="checkAll($event)" :disabled="items.length === 0"></th>
              <th rowspan="2">ID</th>
              <th rowspan="2">Name</th>
              <th rowspan="2">Location</th>
              <th rowspan="2">Office</th>
              <th colspan="2">Phone</th>
            </tr>
            <tr>
              <th>Office</th>
              <th>Cell</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, name, index) in items" :key=index class="table-row" :class="{'row-selected': selectedItems.find(i => i.id === item.id), 'new-row': item.id === ''}">
              <td>
      <input type="checkbox" class="checkbox" @change="rowSelected($event, item)" :disabled="item.id === ''" :checked="selectedItems.find(i => i.id === item.id)">
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
              <td class="cell" @dblclick="cellClicked(item)">
                <span v-if="item.id === '' || editingCellPhoneList.find(i => i.id === item.id)">
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
     selectedItems: [],
     unsavedItems: [],
     editingCellPhoneList: [],
     modalShow: false
    }
  },
  computed: {
    ...mapGetters(['items'])
  },
  methods: {
    cellClicked(item) {
      console.log(item);
      this.editingCellPhoneList.push(item);
    },
    rowSelected(event, item) {
      if(event.target.checked && !this.selectedItems.find(i => i.id === item.id)) {
        this.selectedItems.push(item);
      }
      else {
        this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
        document.querySelector('thead').querySelector('.checkbox').checked = false;
      }
    },
    checkAll(event) {
      if(event.target.checked) {
        this.selectedItems = this.items;
      }
      else {
        this.selectedItems = [];
      }
    },
    deleteRecords() {
      this.$store.dispatch('deleteItems', this.selectedItems);
      this.selectedItems = [];
      this.resetCheckBoxes();
    },
    resetCheckBoxes() {
      const thead = document.querySelector('thead');
      const tbody = document.querySelector('tbody');
      let checkBoxList = tbody.querySelectorAll('.checkbox');
      checkBoxList.forEach(checkbox => checkbox.checked = false);
      thead.querySelector('.checkbox').checked = false;
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
      this.unsavedItems = this.items.filter(item => item.id === '');
      this.unsavedItems.push(...this.editingCellPhoneList);
      this.unsavedItems = this.unsavedItems.filter((v, i, a) => a.indexOf(v) === i);
      this.modalShow = true;
      this.$store.dispatch('addItems', this.unsavedItems);
      this.editingCellPhoneList = [];
      // this.unsavedItems = [];
    },
    modalHidden() {
      this.unsavedItems = [];
      this.modalShow = false;
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

table th[rowspan] {
  vertical-align: middle;
  text-align: center;
}

table {
  box-shadow: 0 0 10px darkslateblue;
  border-radius: 10px;
}

.container-fluid {
  margin-bottom: 76px;
}
</style>