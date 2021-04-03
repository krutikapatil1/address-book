<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12 mt-5">
        <table class="table">
          <thead>
            <tr>
              <th><input type="checkbox" class="checkbox" @change="checkAll()"></th>
              <th>Id</th>
              <th>Name</th>
              <th>Location</th>
              <th>Building</th>
              <th>Office</th>
              <th>Cell</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key=item.id :class="{'row-selected': selectedItems.find(i => i.id === item.id)}">
              <td>
      <input type="checkbox" class="checkbox" @change="rowSelected(item)">
              </td>
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.location}}</td>
              <td>{{item.building}}</td>
              <td>{{item.office}}</td>
              <td @dblclick="cellClicked">{{item.cell}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-3 col-xs-3">
        <button class="btn btn-success">Add New</button>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-3">
        <button class="btn btn-warning">Update</button>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-3 offset-md-3 offset-sm-3 offset-xs-3">
        <button class="btn btn-danger" @click="deleteRecords">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      fields: ['check_all', 'id', 'name', 'location', 'building', 'office', 'cell'],
     items: [
       {id: '1', name: 'John Smith', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3432', cell: '(408)-345-9067'},
       {id: '2', name: 'Tamara Landry', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3434', cell: '(408)-335-9067'}
     ],
     selectedItems: []
    }
  },
  computed: {
    isSelected(id) {
      const item = this.selectedItems.find(item => item.id === id);
      if (item) {
        return true;
      }
      return false;
    }
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
      this.items = this.items.filter(item => !this.selectedItems.find(selectedItem => selectedItem.id === item.id));
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
</style>