
export default class DashboardService{
    static URL_BASE_API="http://127.0.0.1:5000"

    static async getStatisitque(idUser){
        try {
            const response = await fetch(`${DashboardService.URL_BASE_API}/getStatistique`, {
              method: 'POST',
              body: JSON.stringify({ user : idUser }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json()
          } catch (error) {
            console.error('Failed to fetch', error);
          }
        }
    }
