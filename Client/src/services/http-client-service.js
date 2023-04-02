import http from "./http-common";

class HttpClientService {
  
  createUser(data){
    

    return http.post("/Users", data, {
        headers: {
          
        }       
      });
    }
    login(data){

      return http.post("/Users/Login", data, {
          headers: {
            
          }
          
        });
      }
      SignOut(){

        return http.get("/Users/SignOut", {
            headers: {
              
            }
            
          });
        }
        getOffers(productId)
        {
          return http.get(`/Products/GetOfferByProductId/${productId}`, {
            headers: {
              
            }
            
          });
        }
        putOffer(productId,data)
        {
          return http.put(`/Products/EditOffer/${productId}`,data ,{
            headers: {
              
            }
            
          });
        }
        

  getUser(controllerName) {
    return http.get(controllerName);
  }

  getUserById(){
    return http.get("/users/1");
  }
}

export default new HttpClientService();