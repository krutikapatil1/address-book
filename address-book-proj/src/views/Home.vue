<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-md-2 col-sm-2 col-xs-2 mt-2" style="text-align:left">
        <button class="btn btn-success btn-sm" @click="addNewItem">{{localeLabels.buttonLabels.addNew}}</button>
      </div>
      <div class="col-md-1 col-sm-1 col-xs-1 mt-2" style="text-align:left">
        <button id="update-btn" class="btn btn-warning btn-sm" @click="updateRecords" :disabled="!currentlyEditing">{{localeLabels.buttonLabels.update}}</button>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-2 offset-1 mt-2 paginationButtons">
        <button class="btn btn-primary btn-sm" :disabled="(currentPage*pageSize) >= filteredItems.length" @click="nextpage">{{localeLabels.buttonLabels.next}}</button>
        <button class="btn btn-primary btn-sm ml-1" :disabled="currentPage === 1" @click="prevpage">{{localeLabels.buttonLabels.prev}}</button>
      </div>
      <div class="col-md-1 col-sm-1 col-xs-1 mt-2">
        <b-form-select v-model="pageSize" :options="options" size="sm"></b-form-select>
      </div>
      <div class="col-md-3 col-xs-3 col-sm-3 mt-2">
        <b-form-input id="input-small" size="sm" v-model="searchStr" :placeholder="localeLabels.buttonLabels.searchPl"></b-form-input>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-2 mt-2" style="text-align:right">
        <button class="btn btn-danger btn-sm" @click="deleteRecords" :disabled="selectedItems.length === 0">{{localeLabels.buttonLabels.delete}}</button>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-6 col-sm-6 col-lg-6 offset-3">
        <b-alert
      :show="showAlertPanel"
      variant="danger"
    >
      {{alertMessage}}
    </b-alert>

      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <table class="table">
          <thead class="thead">
            <tr>
              <th rowspan="2"><input type="checkbox" class="checkbox" @change="checkAll($event)" :disabled="items.length === 0"></th>
              <th rowspan="2" @click="sort('id')">{{localeLabels.labels.id}} 
                <font-awesome-icon class="icons" v-if="currentSort === 'id' && currentSortDir === 'desc'" icon="sort-down" :class="{'active': currentSort === 'id'}"/>
                <font-awesome-icon class="icons" v-else icon="sort-up" :class="{'active': currentSort === 'id'}"/>
              </th>
              <th rowspan="2" @click="sort('name')">* {{localeLabels.labels.name}}
                <font-awesome-icon class="icons" v-if="currentSort === 'name' && currentSortDir === 'desc'" icon="sort-down" :class="{'active': currentSort === 'name'}"/>
                <font-awesome-icon class="icons" v-else icon="sort-up" :class="{'active': currentSort === 'name'}"/>
              </th>
              <th rowspan="2" @click="sort('location')">{{localeLabels.labels.location}}
                <font-awesome-icon class="icons" v-if="currentSort === 'location' && currentSortDir === 'desc'" icon="sort-down" :class="{'active': currentSort === 'location'}"/>
                <font-awesome-icon class="icons" v-else icon="sort-up" :class="{'active': currentSort === 'location'}"/>
              
              </th>
              <th rowspan="2" @click="sort('building')">{{localeLabels.labels.building}}
                <font-awesome-icon class="icons" v-if="currentSort === 'building' && currentSortDir === 'desc'" icon="sort-down" :class="{'active': currentSort === 'building'}"/>
                <font-awesome-icon class="icons" v-else icon="sort-up" :class="{'active': currentSort === 'building'}"/>
              </th>
              <th colspan="2">{{localeLabels.labels.phone}}</th>
            </tr>
            <tr>
              <th rowspan="1" @click="sort('office')">{{localeLabels.labels.office}}
                <font-awesome-icon class="icons" v-if="currentSort === 'office' && currentSortDir === 'desc'" icon="sort-down" :class="{'active': currentSort === 'office'}"/>
                <font-awesome-icon class="icons" v-else icon="sort-up" :class="{'active': currentSort === 'office'}"/>
              </th>
              <th rowspan="1" @click="sort('cell')">* {{localeLabels.labels.cell}}
                <font-awesome-icon class="icons" v-if="currentSort === 'cell' && currentSortDir === 'desc'" icon="sort-down" :class="{'active': currentSort === 'cell'}"/>
                <font-awesome-icon class="icons" v-else icon="sort-up" :class="{'active': currentSort === 'cell'}"/>
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
                  <input type="text" v-model="item.office" @keyup="formatPhoneNumber($event, item, 'office')">
                </span>
                <span v-else>{{item.office}}</span>
              </td>
              <td class="cell" @dblclick="cellClicked(item)">
                <span v-if="item.id === '' || editingCellPhoneList.find(i => i.id === item.id)">
                  <input type="text" v-model="item.cell" @keyup="formatPhoneNumber($event, item, 'cell')">
                </span>
                <span v-else>{{item.cell}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
     isConfirmModalVisible: false,
     showAlertPanel: false,
     alertMessage: '',
     pageSize: 5,
     currentPage: 1,
     onLastPage: false,
     options: [2, 5, 10, 25, 100],
     searchStr: ''
    }
  },
  computed: {
    ...mapGetters(['items', 'localeLabels']),
    filteredItems() {
      //Logic to filter the records based to on search string
      const searchString = this.searchStr.toLowerCase();
      return this.items.filter(item => {
        if(item.name.toLowerCase().includes(searchString) ||
      item.id.toString() == searchString || item.location.toLowerCase().includes(searchString) ||
      item.building.toLowerCase().includes(searchString) || item.office.includes(searchString) ||
      item.cell.includes(searchString)) {
        return true;
      }
      else {
        return false;
      }
      });
    },
    sortedItems() {
      //disabling sorting if currently editting records
      if (!this.currentlyEditing) {
      return this.filteredItems.sort((a,b) => {
        let modifier = 1;
        if (this.currentSortDir == 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage -1) * this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
      }
      else {
        //If currently editing, just return the records in the present state
        return this.filteredItems.filter((row, index) => {
        let start = (this.currentPage -1) * this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });;
      }
    }
  },
  methods: {
    nextpage() {
      if((this.currentPage*this.pageSize) < this.items.length) this.currentPage++;
    },
    prevpage() {
      if(this.currentPage > 1) this.currentPage--;
    },
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.showAlertPanel = true;
        setTimeout(() => {
          this.showAlertPanel = false;
        }, 5000);
      },
    cellClicked(item) {
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
      this.currentPage = 1;
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
      this.items.unshift(newItem);
      this.currentlyEditing = true;
    },
    updateRecords() {
      //Before saving, delete empty rows (row with both name and cell empty, are considered empty rows)
      this.$store.dispatch('deleteEmptyRows');
      //get a list of unsaved items
      this.unsavedItems = this.items.filter(item => item.id === '');
      this.unsavedItems.push(...this.editingCellPhoneList);
      this.unsavedItems = this.unsavedItems.filter((v, i, a) => a.indexOf(v) === i);
      //If nothing to save, just return
      if(this.unsavedItems.length === 0) {
        return;
      }
      //validte the new entries before saving, if invalid, display an alert panel
      if(!this.areAllNewEntriesValid(this.unsavedItems)) {
        this.showAlert();
      }
      else {
        //after successfully validting the new entries, save the data
      this.isModalVisible = true;
      this.$store.dispatch('addItems', this.unsavedItems);
      this.editingCellPhoneList = [];
      }
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
    formatPhoneNumber(event, item, key) {
      const ASCIICode = event.keyCode;
      if(ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
        event.target.value = event.target.value.substr(0, event.target.value.length -1);
        item[key] = event.target.value;
        return;
      }
      let enteredValue = event.target.value.replace(/[^0-9]/g, '');
      const max_chars = 10;
      if (enteredValue.length > max_chars) {
        item[key] = event.target.value.substr(0, max_chars+4);
        return;
      }
      if(enteredValue.length === 7) {
        item[key] = enteredValue.replace(/(\d{3})(\d{4})/, "$1-$2");
      }
      if(enteredValue.length === 10) {
        item[key] = enteredValue.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      }
    },
    areAllNewEntriesValid(newEntries) {
      let isValid = true;
      //In case 'name' and /or 'cell' entries are missing, invalidate the new entry
      if(newEntries.find(newEntry => newEntry.name === '' || newEntry.cell=== '')) {
        this.alertMessage = 'Name and cell phone number entries cannot be empty!!'
        isValid = false;
      }
      //else, check to make sure the phone numbers are in the correct format. Correct format is all numbers with only 7 or 10 digits
      else if(newEntries.find(newEntry => {
        const officeNumber = newEntry.office.replace(/[^0-9]/g, '');
        const cellNumber = newEntry.cell.replace(/[^0-9]/g, '');
        if (newEntry.office) {
          if((officeNumber.length !== 7 && officeNumber.length !== 10) ||(cellNumber.length !== 10)) {
            return true;
          }
        }
        else {
          if(cellNumber.length !== 10) {
            return true;
          }
        }
      })
      ) {
        this.alertMessage = 'Please enter valid phone numbers!';
        isValid = false;
      }
      else {
        this.alertMessage = '';
      }
      return isValid;
    }
  }
}
</script>

<style scoped>
.row-selected {
  background-color:#DEDEDE;
}

.checkbox {
  cursor: pointer;
}

input {
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 80%;
  text-align: center;
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

.thead {
  background-color:#3366CC;
  color: #ffffff;
}

table {
  box-shadow: 0 0 10px rgba(0, 0,0,1);
  border-radius: 10px;
  font-family: 'Karla' sans-serif;
}

.container {
  margin-bottom: 76px;
}

.icons.active {
  color: #ffffff;
  font-size: 20px;
}

.icons {
  color: #C0C0C0
}

button:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
}

.paginationButtons {
  text-align: right;
  display: flex;
  flex-direction:row-reverse;
}

#input-small {
  text-align: left;;
}
</style>