const API_KEY = import.meta.env.VITE_PTCG_API_KEY;

const callAPI = async () => {
  fetch('https://api.pokemontcg.io/v2/sets', {
    method: 'GET',
    headers: {
      'X-Api-Key': API_KEY
    }
  })
    .then((response) => {
      console.log('Status Code:', response.status);
      return response.json();
    })
    .then((data) => {
      console.log('API response:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error fetching the API:', error);
      return null;
    });
};

export default callAPI;
