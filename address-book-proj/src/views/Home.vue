<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12 mt-5">
        <!-- <b-table hover striped :items="items" :fields="fields">
          <template #thead-top="data">
        <b-tr>
          <b-th colspan="3"></b-th>
          <b-th variant="primary" colspan="2">Location</b-th>
          <b-th variant="success" colspan="2">Phone</b-th>
        </b-tr>
      </template>
        </b-table> -->
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Select</th>
              <th>Id</th>
              <th>Name</th>
              <th>Location</th>
              <th>Building</th>
              <th>Office</th>
              <th>Cell</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key=item.id>
              <td>Select</td>
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
     ]
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
    }
  }
}
</script>
