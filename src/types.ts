export interface UserProfile {
  username: string;
  displayName: string;
  robux: number;
  friends: string;
  followers: string;
  following: string;
  bio: string;
  badge: 'none' | 'plus' | 'pro';
}

export interface WearingItem {
  id: string;
  name: string;
  price: string;
  imgUrl: string;
}

export interface Transaction {
  id: string;
  type: string;
  details: string;
  amount: number;
}
