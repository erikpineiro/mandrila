import User from "../classes/User"


var initialState = {
  dbStatus: "",
}

export default function reducer(state=initialState, action) {

    switch (action.type) {
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
    }

    return state
}
