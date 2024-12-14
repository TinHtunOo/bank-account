import { useReducer } from "react";
const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};
// openAccount,deposit, withdraw, requestloan, payloan, closeAccount
function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, isActive: true, balance: state.balance + 500 };
    case "closeAccount":
      return {
        ...state,
        isActive: (state.balance === 0) & (state.loan === 0) ? false : true,
      };
    case "requstLoan":
      return {
        ...state,
        balance: state.loan > 0 ? state.balance : state.balance + 5000,
        loan: state.loan > 0 ? state.loan : state.loan + 5000,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.loan > 0 ? state.balance - 5000 : state.balance,
        loan: state.loan > 0 ? state.loan - 5000 : state.loan,
      };
    case "deposit":
      return { ...state, balance: state.balance + 150 };
    case "withdraw":
      return {
        ...state,
        balance: state.balance > 0 ? state.balance - 50 : state.balance,
      };
    default:
  }
}
function App() {
  const [{ isActive, balance, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="app">
      <h1>Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <div>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isActive}
        >
          Open Account
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "deposit" });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "withdraw" });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "requstLoan" });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!isActive}
        >
          Pay Loan
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </div>
    </div>
  );
}
export default App;
