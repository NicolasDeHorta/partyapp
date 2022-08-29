export interface Friend {
  name: string;
  paid: number;
  owes: number;
}

export interface Expense {
  name: string;
  cost: number;
  whoPaid: string;
  participants: Friend[];
}
