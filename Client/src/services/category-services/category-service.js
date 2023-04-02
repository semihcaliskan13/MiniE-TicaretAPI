import http from "../http-common";

class CategoryService {
  
    createUser(data){
      let formData=new FormData();
      formData.append("data",data);
  
      return http.post("/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
          
        });
      }
  
    getAllCategories() {
      return http.get("/Categories");
    }
  
    getCategoryById(id){
      return http.get(`/Categories/${id}`);
    }
    
    createCategory(data){
        return http.post("/Categories",data
        )
    }
    updateCategory(data){
        return http.put("/Categories",data)
    }

    deleteCategory(id){
        return http.delete(`/Categories/${id}`)
    }
  } 
  export default new CategoryService();