export interface SightTypes {
  id: number;
  name: string;
  description: string;
  street: string;
  count_views: number;
  category_id: number;
  count_favorite: number;
  likes: number;
  dislikes: number;
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

export interface MainImgTypes {
  img_name: string;
  location: string;
}

interface MapTypes {
  x: number;
  y: number;
}

export interface PurifyTypes {
  rsp: Rsp;
}

export interface Rsp {
  '@attributes': Attributes;
  method: string;
  lang: string;
  format: string;
  found: string;
  api_key: string;
}

export interface Attributes {
  stat: string;
}
