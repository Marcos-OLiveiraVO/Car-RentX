interface IResponseUserDTO {
  id: string;
  name: string;
  email: string;
  driver_licence: string;
  avatar: string;
  avatar_url(): string;
}

export { IResponseUserDTO };
