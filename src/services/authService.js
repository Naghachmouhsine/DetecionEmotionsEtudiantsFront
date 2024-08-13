import axios from "axios"
export default class AuthService{
    static URL_BASE_API="http://127.0.0.1:5000/auth"
    static async auth(userData,typeRequete){
        try{
            console.log(userData)
            console.log(typeRequete)
            console.log(`${AuthService.URL_BASE_API}/${typeRequete}`)
            const response = await axios.post(`${AuthService.URL_BASE_API}/${typeRequete}`, userData)
            return response;
        }catch(err){
            throw err;
        }
    }
    // static async auth(userData){
    //     try{
    //         console.log(userData)
    //         const response = await axios.post(`${AuthService.URL_BASE_API}/login`,userData)
    //         return response;
    //     }catch(err){
    //         throw err;
    //     }
    // }

}