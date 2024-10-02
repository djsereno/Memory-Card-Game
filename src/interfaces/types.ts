interface ApiData {
  name: string;
  images: {
    large: string;
  };
}

interface ApiResponse {
  data: ApiData[];
}

interface CardData {
  name: string;
  image: string;
}

export type { ApiData, ApiResponse, CardData };
