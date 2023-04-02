import productService from "./product-services/product-service";

class DeleteService {

     handleDelete(id){
        productService.deleteProduct(id).then(function (response) {
            //handle success            
            return response.data;   
          })
            .catch(function (error) {
              //handle error
              return error;
            });
    }
}
export default new DeleteService();