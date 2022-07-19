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
  phone: string;
  cpf: string;
  address: string;
  gender: string;
  birthdate: string;
  healthRestrictions: string;
  administrativeRestrictions: string;
}
