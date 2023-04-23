export type Artist = {
  join: string;
  name: string;
  anv: string;
  tracks: string;
  role: string;
  resource_url: string;
  id: number;
};

export type Label = {
  name: string;
  entity_type: string; // enum
  catno: string;
  resource_url: string;
  id: number;
  entity_type_name: string;
}


export type DiscogsRelease = {
  instance_id: number;
  rating: number;
  basic_information: {
    labels: Label[];
    formats: [
      {
        descriptions: string[];
        name: string;
        qty: string;
      }
    ];
    thumb: string;
    title: string;
    artists: Artist[];
    resource_url: string;
    year: number;
    id: number;
  };
  folder_id: number;
  date_added: string;
  id: number;
};

export type DiscogsResponse = {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
    urls: {
      last: string;
      next: string;
    };
  };
  releases: DiscogsRelease[];
};
