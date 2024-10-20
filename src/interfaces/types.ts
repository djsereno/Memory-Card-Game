interface ApiData {
  name: string;
  images: {
    small: string;
    large: string;
  };
}

interface ApiResponse {
  data: ApiData[];
}

interface CardData {
  name: string;
  imageUrl: string;
}

export type { ApiData, ApiResponse, CardData };
