const API_KEY = import.meta.env.VITE_PTCG_API_KEY;

const getApiResponse = async () => {
  try {
    const response = await fetch(
      'https://api.pokemontcg.io/v2/cards?q=(' +
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

interface CardData {
  name: string;
  images: {
    large: string;
  };
}

const cleanApiResponse = (apiResponse: { data: CardData[] }): object[] => {
  if (!apiResponse) return [];

  const responseData = apiResponse.data;
  const cleanedData = responseData.map((card: CardData) => ({
    name: card.name,
    image: card.images.large
  }));

  return cleanedData;
};

const getCardData = async (numCards: number) => {
  const apiResponse = await getApiResponse();
  const cleanedResponse = cleanApiResponse(apiResponse);
  const shuffledCards = shuffleArray(cleanedResponse);
  const cardData = shuffledCards.slice(0, numCards);

  console.log(cardData);

  return cardData;
};

const shuffleArray = (arr: object[]): object[] => {
  const n = arr.length;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

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
