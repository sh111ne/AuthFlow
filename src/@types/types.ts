export type Profile = {
  blockchain_account_id: null | number;
  created_at: string;
  email: string;
  extension: null; //не уверен
  id: string;
  mailing_agree: number;
  name: string;
  pricing_plan_id: null; //не уверен
  updated_at: string;
};

export type NewUser = {
  userName: string;
  email: string;
  password: string;
  repeat?: string;
  politic?: boolean;
  subscription?: boolean;
};

export type User = {
  username: string;
  password_hash: string;
};

export type PostRegistration = {
  name: string;
  password: string;
  email: string;
  mailing_agree: number;
};

export type SetUser = {
  name: string;
  email: string;
};

export type UserState = {
  user: {
    name: string;
    email: string;
  };
};
