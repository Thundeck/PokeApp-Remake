import * as actions from '../actionsTypes'

const initialState = {
    allPokemons : [],
    pokemons: [],
    allTypes:[],
    detail:{},
    loader:false

}

const rootReducer = (state = initialState, action) =>{
    switch (action.type) {
    case actions.GET_ALL_POKEMONS:
            return{
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload
            }
    case actions.GET_POKEMON:
        return{
            ...state,
            pokemons: action.payload
        }
    case actions.GET_ALL_TYPES:
        return{
            ...state,
            allTypes: action.payload
        }
    case actions.FILTER_BY_TYPE:

    return{
        ...state,
        pokemons: action.payload
    }
    case actions.ORDER_POKEMONS_AZ:
        let aZ = [
            ...state.pokemons.sort((a, b) => a.name.localeCompare(b.name)),
          ];
          return {
            ...state,
            pokemons: aZ,
          };
    case actions.ORDER_POKEMONS_ZA:
        let zA = [
            ...state.pokemons.sort((a, b) => b.name.localeCompare(a.name)),
          ];
          return {
            ...state,
            pokemons: zA,
          };
        case actions.ORDER_ATTACK_AZ:
        let asc = [
            ...state.pokemons.sort((a, b) => b.attack - a.attack),
            ];
            return {
            ...state,
            pokemons: asc,
            };
    case actions.ORDER_ATTACK_ZA:
        let des = [
            ...state.pokemons.sort((a, b) => a.attack - b.attack),
            ];
            return {
            ...state,
            pokemons: des,
            };
        case actions.GET_POKEMON_DETAILS:
        return{
            ...state,
            detail: action.payload,
        }
        case actions.DELETE_DETAIL:
            return{
                ...state,
                detail: initialState.detail,
            }
        case actions.SET_LOADER:
            return {
                ...state,
                loader:action.payload
            };
    
        default: return state
    }

}

export default rootReducer