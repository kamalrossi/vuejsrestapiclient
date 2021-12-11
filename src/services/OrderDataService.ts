import http from "../http-common";

class OrderDataService {
  getAll() {
    return http.get("/orders");
  }

  get(id: string) {
    return http.get(`/orders/${id}`);
  }

  create(data: any) {
    return http.post("/orders", data);
  }

  update(id: string, data: any) {
    return http.put(`/orders/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/orders/${id}`);
  }

  deleteAll() {
    return http.delete(`/orders`);
  }

  findByTitle(name: string) {
    return http.get(`/orders?name=${name}`);
  }
}

export default new OrderDataService();