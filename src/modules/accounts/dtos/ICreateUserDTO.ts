interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_licence: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
