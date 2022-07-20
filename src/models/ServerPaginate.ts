export interface ServerPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IServer[];
}

export interface IServer {
  id: string;
  name: string;
  mother: string;
  email: string;
  cpf: string;
  phone_Number: string[];
  address: string;
  gender: string;
  birthdate: string;
  healthRestrictions: string;
  administrativeRestrictions: string;
}
