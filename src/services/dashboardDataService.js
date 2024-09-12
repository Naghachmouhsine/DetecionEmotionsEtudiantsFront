
export default class DashboardService{

    static async getStatisitque(){

      const url='http://127.0.0.1:5000/getStatistique';
      console.log(url)
      const options = {method: 'GET', headers: {'content-type': 'application/json'}};
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("service")
        console.log(data)
        return data
      } catch (error) {
        console.error(error);
      }
        }
    }



