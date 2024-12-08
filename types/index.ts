export interface UserInfo {
  prenom: string;
  nom: string;
  nd: string;
  adresse: string;
  offre: string;
  speed: string;
  credit: string;
  balance: string;
  dateexp: string;
  mobile: string;
  email: string;
  ncli: string;
  status: string;
  type1: string;
}

export interface AccountInfo extends UserInfo {
  listOffreDebit: string;
}

export interface NDFactInfo {
  nd: string;
  credit: string;
}

export interface APIResponse {
  meta_data: {
    original: {
      token: string;
    };
  };
  data: {
    original: UserInfo;
  };
}

export interface NDFactResponse {
  INFO: {
    nd: string;
    credit: string;
  };
}