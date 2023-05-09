export interface SightTypes {
  id: number;
  name: string;
  description: string;
  street: string;
  count_views: number;
  count_favorite: number;
  imgUrl: string;
  city_id?: number;
  city_name?: string;
  created: string;
  map_points: MapTypes;
}

export interface CityTypes {
  id: number;
  name: string;
  count_sights: number;
  count_people: string;
  count_views: number;
  map_points: MapTypes;
  imgUrl: string;
}

export interface ImgTypes {
  id: number;
  imgUrl: string;
}

interface MapTypes {
  x: number;
  y: number;
}
