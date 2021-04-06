<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12 mt-5">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th rowspan="2"><input type="checkbox" class="checkbox" @change="checkAll($event)" :disabled="items.length === 0"></th>
              <th rowspan="2" @click="sort('id')">{{localeLabels.labels.id}} 
                <i v-if="currentSort === 'id' && currentSortDir === 'desc'" 
              class='fas fa-sort-down' 
              :class="{'active': currentSort === 'id'}"></i>
              <i v-else class='fas fa-sort-up' 
              :class="{'active': currentSort === 'id'}"></i>
              </th>
              <th rowspan="2" @click="sort('name')">{{localeLabels.labels.name}}
                <i v-if="currentSort === 'name' && currentSortDir === 'desc'" 
              class='fas fa-sort-down' 
              :class="{'active': currentSort === 'name'}"></i>
              <i v-else class='fas fa-sort-up' :class="{'active': currentSort === 'name'}"></i>
              </th>
              <th rowspan="2" @click="sort('location')">{{localeLabels.labels.location}}
                <i v-if="currentSort === 'location' && currentSortDir === 'desc'" 
              class='fas fa-sort-down' 
              :class="{'active': currentSort === 'location'}"></i>
              <i v-else class='fas fa-sort-up' :class="{'active': currentSort === 'location'}"></i>
              </th>
              <th rowspan="2" @click="sort('building')">{{localeLabels.labels.building}}
                <i v-if="currentSort === 'building' && currentSortDir === 'desc'" 
              class='fas fa-sort-down' 
              :class="{'active': currentSort === 'building'}"></i>
              <i v-else class='fas fa-sort-up' :class="{'active': currentSort === 'building'}"></i>
              </th>
              <th colspan="2">{{localeLabels.labels.phone}}</th>
            </tr>
            <tr>
              <th rowspan="1" @click="sort('office')">{{localeLabels.labels.office}}
                <i v-if="currentSort === 'office' && currentSortDir === 'desc'" 
              class='fas fa-sort-down' 
              :class="{'active': currentSort === 'office'}"></i>
              <i v-else class='fas fa-sort-up' :class="{'active': currentSort === 'office'}"></i>
              </th>
              <th rowspan="1" @click="sort('cell')">{{localeLabels.labels.cell}}
                <i v-if="currentSort === 'cell' && currentSortDir === 'desc'" 
              class='fas fa-sort-down' 
              :class="{'active': currentSort === 'cell'}"></i>
              <i v-else class='fas fa-sort-up' :class="{'active': currentSort === 'cell'}"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, name, index) in sortedItems" :key=index class="table-row" :class="{'row-selected': selectedItems.find(i => i.id === item.id), 'new-row': item.id === ''}">
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
        <button class="btn btn-success" @click="addNewItem">{{localeLabels.buttonLabels.addNew}}</button>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-3" style="text-align:left">
        <button class="btn btn-warning" @click="updateRecords" :disabled="!currentlyEditing">{{localeLabels.buttonLabels.update}}</button>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-3 offset-md-3 offset-sm-3 offset-xs-3">
        <button class="btn btn-danger" @click="deleteRecords" :disabled="selectedItems.length === 0">{{localeLabels.buttonLabels.delete}}</button>
      </div>
      <Flyout v-show="isModalVisible" @close="modalHidden" :confirmButtonText="localeLabels.buttonLabels.ok" :displayCancelButton="false">
      <template v-slot:header>
        <h5>{{localeLabels.flyoutLabels.header}}</h5>
      </template>

      <template v-slot:body>
        <table class="table">
          <thead>
            <tr>
              <th>{{localeLabels.labels.name}}</th>
              <th>{{localeLabels.labels.location}}</th>
              <th>{{localeLabels.labels.building}}</th>
              <th>{{localeLabels.labels.office}}</th>
              <th>{{localeLabels.labels.cell}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, name, index) in unsavedItems" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.location}}</td>
              <td>{{item.building}}</td>
              <td>{{item.office}}</td>
              <td>{{item.cell}}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </Flyout>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Flyout from '@/components/Flyout.vue';
export default {
  name: 'Home',
  components: {
    Flyout
  },
  data() {
    return {
     selectedItems: [],
     unsavedItems: [],
     editingCellPhoneList: [],
     currentSort: 'id',
     currentSortDir: 'asc',
     currentlyEditing: false,
     isModalVisible: false,
     isConfirmModalVisible: false
    }
  },
  computed: {
    ...mapGetters(['items', 'localeLabels']),
    sortedItems() {
      if (!this.currentlyEditing) {
      return this.items.sort((a,b) => {
        let modifier = 1;
        if (this.currentSortDir == 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      })
      }
      else {
        return this.items;
      }
    }
  },
  methods: {
    cellClicked(item) {
      console.log(item);
      this.editingCellPhoneList.push(item);
      this.currentlyEditing = true;
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
      this.currentlyEditing = true;
    },
    updateRecords() {
      this.unsavedItems = this.items.filter(item => item.id === '');
      this.unsavedItems.push(...this.editingCellPhoneList);
      this.unsavedItems = this.unsavedItems.filter((v, i, a) => a.indexOf(v) === i);
      if(this.unsavedItems.length === 0) {
        return;
      }
      this.isModalVisible = true;
      this.$store.dispatch('addItems', this.unsavedItems);
      this.editingCellPhoneList = [];
    },
    modalHidden() {
      this.isModalVisible = false;
      this.currentlyEditing = false;
      setTimeout(() => {
        this.unsavedItems = [];
      }, 300);
    },
    sort(s) {
      if (!this.currentlyEditing) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
      }
    },
    getFields() {
      return [
       this.localeLabels.labels.id, 
     this.localeLabels.labels.name, 
     this.localeLabels.labels.location, 
     this.localeLabels.labels.building,
     this.localeLabels.labels.office, 
     this.localeLabels.labels.cell
     ];
    },
    getItems() {
      let unsavedItems = [...this.unsavedItems];
      return unsavedItems;
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
  cursor: pointer;
}

table {
  box-shadow: 0 0 10px darkslateblue;
  border-radius: 10px;
}

.container-fluid {
  margin-bottom: 76px;
}

i {
  color: #ccc;
}

i.active {
  color: #000000;
}

button:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
}
</style>