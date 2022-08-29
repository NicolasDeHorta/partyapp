import React, { useState } from "react";
import { Input, Button, Select, message } from "antd";

import "./TopInputs.scss";
import { useAppContext } from "../../context/main";

const { Option } = Select;

export const TopInputs = () => {
  const [friendInput, setFriendInput] = useState<string>();
  const [expenseName, setExpenseName] = useState<string>();
  const [expenseCost, setExpenseCost] = useState<number>();
  const [whoPaidInput, SetWhoPaidInput] = useState<string>();

  const context = useAppContext();

  const handleAddExpense = () => {
    if (expenseName && expenseCost && whoPaidInput) {
      context?.addExpense(expenseName, expenseCost, whoPaidInput);
      setExpenseCost(0);
      setExpenseName("");
      SetWhoPaidInput(undefined);
    } else {
      message.error("Add all 3 fields to add the expense");
    }
  };

  const handleAddFriend = () => {
    if (friendInput) {
      context?.addFriend(friendInput);
      setFriendInput("");
    } else {
      message.error("Add a valid friend name");
    }
  };

  const handleExpenseName = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseName(currentTarget.value);
  };

  const handleExpenseCost = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseCost(parseInt(currentTarget.value));
  };

  const handlefriendInput = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFriendInput(currentTarget.value);
  };

  const handleWhoPaid = (value: string) => {
    SetWhoPaidInput(value);
  };

  return (
    <div className="inputs">
      <Input.Group compact>
        <Select style={{ width: 120 }} onChange={handleWhoPaid}>
          {context?.friends.map((friend) => (
            <Option value={friend.name}>{friend.name}</Option>
          ))}
        </Select>
        <Input
          placeholder="Expense name..."
          style={{ width: "calc(80% - 200px)" }}
          value={expenseName}
          name="expenseName"
          onChange={handleExpenseName}
        />
        <Input
          prefix="$"
          placeholder="Cost"
          style={{ width: "calc(20%)" }}
          type="Number"
          value={expenseCost}
          name="expenseCost"
          onChange={handleExpenseCost}
        />
        <Button type="primary" onClick={handleAddExpense}>
          Submit
        </Button>
      </Input.Group>
      <Input.Group compact>
        <Input
          placeholder="Friend name..."
          style={{ width: "calc(100% - 200px)" }}
          value={friendInput}
          name="friendName"
          onChange={handlefriendInput}
        />
        <Button type="primary" onClick={handleAddFriend}>
          Submit
        </Button>
      </Input.Group>
    </div>
  );
};
