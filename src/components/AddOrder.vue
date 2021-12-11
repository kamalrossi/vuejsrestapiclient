<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="order.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="order.address"
          name="address"
        />
      </div>

      <button @click="saveOrder" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newOrder">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OrderDataService from "../services/OrderDataService";

@Component
export default class AddOrder extends Vue {
  private order: any = {
    id: null,
    name: "",
    address: "",
    published: false,
  };

  private submitted: boolean = false;

  saveOrder() {
    var data = {
      name: this.order.name,
      address: this.order.address,
    };

    OrderDataService.create(data)
      .then((response) => {
        this.order.id = response.data.id;
        console.log(response.data);
        this.submitted = true;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newOrder() {
    this.submitted = false;
    this.order = {};
  }
}
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
