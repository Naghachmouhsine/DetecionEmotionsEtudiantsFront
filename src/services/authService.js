import axios from "axios"
export default class AuthService{
    static URL_BASE_API="http://127.0.0.1:5000/"
    static async auth(userData,typeRequete){
        try{
            console.log(userData)
            console.log(typeRequete)
            console.log(`${AuthService.URL_BASE_API}/${typeRequete}`)
            const response = await axios.post(`${AuthService.URL_BASE_API}/auth/${typeRequete}`, userData)
            return response;
        }catch(err){
            throw err;
        }
    }
    static async getAllUsers(){
        try{
            const response = await axios.get(`${AuthService.URL_BASE_API}/getAllUsers`)
            return response.data;
        }catch(err){
            throw err;
        }
    }

}