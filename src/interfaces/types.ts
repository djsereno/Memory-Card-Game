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
  image: string;
}

export type { ApiData, ApiResponse, CardData };
