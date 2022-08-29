import { useAppContext } from "../../context/main";
import { Expense, Friend } from "../../models/models";

import "./Grid.scss";

export const Grid = () => {
  const context = useAppContext();

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th></th>
            {context?.expenses.map((expense: Expense) => (
              <th>
                {expense.name} <span>${expense.cost}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {context?.friends.map((friend: Friend) => (
            <tr>
              <td>{friend.name}</td>
              {context?.expenses.map((expense: Expense) => (
                <td>
                  <input
                    type="checkbox"
                    onClick={() =>
                      context.addDeleteParticipants(friend, expense)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="summaryButton" onClick={context?.calculateOwe}>
        Summary
      </div>
    </div>
  );
};
