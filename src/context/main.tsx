import { message } from "antd";
import * as React from "react";
import { Expense, Friend } from "../models/models";

interface AppContextInterface {
  friends: Friend[];
  expenses: Expense[];
  addDeleteParticipants: (friend: Friend, expense: Expense) => void;
  addExpense: (
    expenseName: string,
    expenseCost: number,
    whoPaid: string
  ) => void;
  addFriend: (newFriend: string) => void;
  calculateOwe: () => void;
}

interface ContextProviderProps {
  children: React.ReactNode;
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export const useAppContext = () => {
  return React.useContext(AppContext);
};

export const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [friends, setFriends] = React.useState<Friend[]>([]);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);

  const addDeleteParticipants = (friend: Friend, expense: Expense) => {
    const expensesClone = expenses;

    expensesClone.forEach((exp, index) => {
      if (expense.name === exp.name) {
        if (expensesClone[index].participants.includes(friend)) {
          expensesClone[index].participants.splice(
            expensesClone[index].participants.indexOf(friend),
            1
          );
        } else {
          expensesClone[index].participants.push(friend);
        }
      }
    });

    setExpenses(expensesClone);
    console.table(expensesClone);
  };

  const participantsQty = (expense: Expense) => {
    return expense.participants.length;
  };

  const calculateOwe = () => {
    friends.forEach((friend, index) => {
      let accum = 0;
      expenses.forEach((expense) => {
        if (expense.participants.includes(friend)) {
          accum += expense.cost / participantsQty(expense);
        }
      });
      friends[index].owes = accum - friend.paid;
    });
    console.log(friends);
  };

  const addFriend = (friendName: string) => {
    const newFriend: Friend = { name: friendName, paid: 0, owes: 0 };
    friends.includes(newFriend)
      ? message.info("friend already exists")
      : setFriends((p) => [...friends, newFriend]);
  };

  const addExpense = (
    expenseName: string,
    expenseCost: number,
    whoPaid: string
  ) => {
    if (
      expenses.filter((expense: Expense) => expense.name === expenseName)
        .length > 0
    ) {
      message.info("Expense already exists");
    } else {
      setExpenses((p) => [
        ...p,
        {
          name: expenseName,
          cost: expenseCost,
          whoPaid: whoPaid,
          participants: [],
        },
      ]);
      const cloneFriends: Friend[] = friends;

      cloneFriends.forEach((friend: Friend, i) => {
        if (friend.name === whoPaid) cloneFriends[i].paid += expenseCost;
      });

      setFriends(cloneFriends);
    }
  };

  return (
    <AppContext.Provider
      value={{
        expenses,
        friends,
        addDeleteParticipants,
        addExpense,
        addFriend,
        calculateOwe,
      }}>
      {children}
    </AppContext.Provider>
  );
};
