const INITIAL_STATE = {
  pesquisa: '',
  request: '',
  filterLogin: '',
};

function meuReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_USER':
    return {
      ...state,
      pesquisa: action.user,
    }
    case 'SAVE_USERS':
      return {
        ...state,
        request: action.users,
      }
    case 'FILTER_USERS':
      return {
        ...state,
        filterLogin: action.login,
      }
    default:
        return state;
    }
};

export default meuReducer;
//meu Reducer
