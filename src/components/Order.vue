<template>
  <div v-if="currentOrder" class="edit-form">
    <h4>Order</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentOrder.name"
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="currentOrder.address"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentOrder.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentOrder.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteOrder">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateOrder">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Order...</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OrderDataService from "../services/OrderDataService";

@Component
export default class Order extends Vue {
  private currentOrder: any = null;
  private message: string = "";

  getOrder(id: string) {
    OrderDataService.get(id)
      .then((response) => {
        this.currentOrder = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status: boolean) {
    var data = {
      id: this.currentOrder.id,
      name: this.currentOrder.name,
      address: this.currentOrder.address,
      published: status,
    };

    OrderDataService.update(this.currentOrder.id, data)
      .then((response) => {
        this.currentOrder.published = status;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateOrder() {
    OrderDataService.update(this.currentOrder.id, this.currentOrder)
      .then((response) => {
        console.log(response.data);
        this.message = "The order was updated successfully!";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteOrder() {
    OrderDataService.delete(this.currentOrder.id)
      .then((response) => {
        console.log(response.data);
        this.$router.push({ name: "orders" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  mounted() {
    this.message = "";
    this.getOrder(this.$route.params.id);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
