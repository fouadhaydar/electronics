export const reducer = (
  state: State,
  action: ActionType,
  upperBoundary: number,
  price: number
) => {
  switch (action) {
    case "increment": {
      const newcounter = state.counter + 1;
      let error =
        newcounter > upperBoundary
          ? `we haven't more than  ${upperBoundary}`
          : null;
      return {
        ...state,
        counter: newcounter <= upperBoundary ? newcounter : state.counter,
        totalPrice:
          newcounter < upperBoundary
            ? state.totalPrice + price
            : state.totalPrice,
        error: error,
      };
    }
    case "decrement": {
      const newcounter = state.counter - 1;
      const lowerBoundary = 1;
      let error = newcounter < lowerBoundary ? `you can't buy nothing` : null;
      return {
        ...state,
        counter: newcounter >= lowerBoundary ? newcounter : state.counter,
        totalPrice:
          newcounter >= lowerBoundary
            ? state.totalPrice - price
            : state.totalPrice,
        error: error,
      };
    }
    case "reset-to-one": {
      return {
        ...state,
        counter: 1,
        totalPrice: price,
        error: null,
      };
    }
    case "reset-to-zero": {
      return {
        ...state,
        counter: 0,
        totalPrice: 0,
        error: null,
      };
    }
    default:
      return state;
  }
};
