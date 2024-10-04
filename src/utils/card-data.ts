import { ApiData, ApiResponse, CardData } from '../interfaces/types';

const API_KEY = import.meta.env.VITE_PTCG_API_KEY;

const fetchApiResponse = async () => {
  try {
    const response = await fetch(
      'https://api.pokemontcg.io/v2/cards?' +
        'page=1&pageSize=250&q=(' +
        'rarity:"Illustration Rare" OR ' +
        'rarity:"Special Illustration Rare")',
      {
        method: 'GET',
        headers: { 'X-Api-Key': API_KEY }
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching the API:', error);
    return null;
  }
};

const getCardData = async (): Promise<CardData[]> => {
  const response: ApiResponse = await fetchApiResponse();
  if (!response) return [];

  const responseData = response.data;
  const cardData = responseData.map((card: ApiData) => ({
    name: card.name,
    image: card.images.small
  }));

  return cardData;
};

// const getRandomCardData = async (numCards: number) => {
//   const apiResponse = await fetchApiResponse();
//   const initialCardData = extractCardData(apiResponse);
//   const randomIndexes = getRandomArray(numCards, initialCardData.length);
//   const cardData = randomIndexes.map((index) => initialCardData[index]);

//   return cardData;
// };

export default getCardData;
// const rarities = [
//   'ACE SPEC Rare',
//   'Amazing Rare',
//   'Classic Collection',
//   'Common',
//   'Double Rare',
//   'Hyper Rare',
//   'Illustration Rare',
//   'LEGEND',
//   'Promo',
//   'Radiant Rare',
//   'Rare',
//   'Rare ACE',
//   'Rare BREAK',
//   'Rare Holo',
//   'Rare Holo EX',
//   'Rare Holo GX',
//   'Rare Holo LV.X',
//   'Rare Holo Star',
//   'Rare Holo V',
//   'Rare Holo VMAX',
//   'Rare Holo VSTAR',
//   'Rare Prime',
//   'Rare Prism Star',
//   'Rare Rainbow',
//   'Rare Secret',
//   'Rare Shining',
//   'Rare Shiny',
//   'Rare Shiny GX',
//   'Rare Ultra',
//   'Shiny Rare',
//   'Shiny Ultra Rare',
//   'Special Illustration Rare',
//   'Trainer Gallery Rare Holo',
//   'Ultra Rare',
//   'Uncommon'
// ];
