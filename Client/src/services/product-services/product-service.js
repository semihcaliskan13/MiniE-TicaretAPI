import http from "../http-common";

class ProductService {
  
    createImage(data,id,name){
      let formData=new FormData();
      formData.append("data",data);
  
      return http.post(`/Products/ProductImage/${id}?productName=${name}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }         
        });
      }
  
    getAllProducts() {
      return http.get("/Products");
    }
  
    getProductById(id){
      return http.get(`/Products/${id}`);
    }
    createProduct(data){
        return http.post("/Products",data
        )
    }
    updateProduct(data){
        return http.put("/Products",data)       
    }

    deleteProduct(id){
        return http.delete(`/Products/${id}`)
    }
    getImage(id,name){
      return http.get(`/Products/GetProductImage/${id}?productName=${name}`)
  }
  

  }
  
  export default new ProductService();