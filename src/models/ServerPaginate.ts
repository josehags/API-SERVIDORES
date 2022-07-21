export interface ServerPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IServer[];
}

export interface IPhones {
  id: string;
  phone_Number: string;
}

export interface IServer {
  id: string;
  name: string;
  mother: string;
  email: string;
  cpf: string;
  phones?: IPhones[];
  address: string;
  gender: string;
  birthdate: string;
  healthRestrictions: string;
  administrativeRestrictions: string;
}
