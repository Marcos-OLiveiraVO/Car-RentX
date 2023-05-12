interface ICreateUserToken {
  refresh_token: string;
  user_id: string;
  expires_dates: Date;
}

export { ICreateUserToken };
