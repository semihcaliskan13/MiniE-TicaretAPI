import http from "../http-common";

class OrderService {
  
    createUser(data){
      let formData=new FormData();
      formData.append("data",data);
  
      return http.post("/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }        
        });
      }
  
    getAllOrders() {
      return http.get("/Orders");
    }
  
    getOrderById(id){
      return http.get(`/Orders/${id}`);
    }
    createOrder(data){
        return http.post("/Orders",data
        )
    }
    updateOrder(data){
        return http.put("/Orders",data)       
    }

    deleteOrder(id){
        return http.delete(`/Orders/${id}`)
    }
  }
  
  export default new OrderService();