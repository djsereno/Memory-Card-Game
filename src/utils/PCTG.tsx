const API_KEY = import.meta.env.VITE_PTCG_API_KEY;

const callApi = async () => {
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

const cleanApiResponse = async () => {
  const apiResponse = await callApi();
  if (!apiResponse) return [];

  const responseData = apiResponse.data;
  const cleanedData = responseData.map((card: { name: string; images: { small: string } }) => ({
    name: card.name,
    image: card.images.small
  }));

  return cleanedData;
};

const shuffle

const getCardData = async (numCards: number) => {
  const cleanedResponse = await cleanApiResponse();
  console.log(cleanedResponse);

  // Step 1: Shuffle the array using Fisher-Yates (Durstenfeld) shuffle algorithm
  for (let i = cleanedResponse.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cleanedResponse[i], cleanedResponse[j]] = [cleanedResponse[j], cleanedResponse[i]]; // Swap elements
  }

  // Step 2: Return the first 'num' elements from the shuffled array
  return cleanedResponse.slice(0, numCards);
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
