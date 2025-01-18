export type Customer = {
  id: number,
  created_at: number,
  firstname: string,
  lastname: string,
  email: string,
  phone_number: string,
  state: string,
  active: boolean,
  details: string
}

export enum Mode {
  List,
  Create,
  Edit
}