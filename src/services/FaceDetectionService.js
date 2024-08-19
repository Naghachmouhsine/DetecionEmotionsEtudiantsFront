
export default class FaceDetectionService{
    static URL_BASE_API="http://127.0.0.1:5000"
    static async tstCnx(){
        let cnxEtablie=false
        try {
        
        
        const response =await fetch(`${FaceDetectionService.URL_BASE_API}/tstCnx`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        });
        const data=await response.json()
        cnxEtablie=data.cnx
        return cnxEtablie
        } catch (error) {
            return cnxEtablie
        }
    }
    static detectFaces = async (dataURL,idUser,stop) => {
        try {
          console.log("stop : ", stop)
          const response = await fetch(`${FaceDetectionService.URL_BASE_API}/detect`, {
            method: 'POST',
            body: JSON.stringify({ image: dataURL,user : idUser,isStop : !stop }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
        //   const data = await response.json();
          return response
        //   return data
        } catch (error) {
          console.error('Failed to fetch', error);
          // this.stopCamera()
        }
      }
      
      static insertNewSeance = async (seance) => {
        try {
          const response = await fetch(`${FaceDetectionService.URL_BASE_API}/insertNewSeance`, {
            method: 'POST',
            body: JSON.stringify(seance),
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
        //   const data = await response.json();
          return response
        //   return data
        } catch (error) {
          console.error('Failed to fetch', error);
          // this.stopCamera()
        }
      }
}
