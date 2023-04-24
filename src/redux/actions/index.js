import * as actions from '../actionsTypes'
import axios from 'axios'

export const getAllPokemons = () => async dispatch => {
    dispatch(setLoader(true))
try{
        const {data} = await axios.get('https://pokeapp-backend-production.up.railway.app/pokemons')

        data && dispatch(setLoader(false))

        dispatch({
            type: actions.GET_ALL_POKEMONS,
            payload: data
        })

    }
catch(error){ console.log(error)}
}

export const getAllTypes = () => async dispatch => {
    try{
            const {data} = await axios.get('https://pokeapp-backend-production.up.railway.app/types')

            dispatch({
                type: actions.GET_ALL_TYPES,
                payload: data
            })
        }
    catch(error){ console.log(error)}
}

// export function filterType(type){
//     return{
//         type: actions.FILTER_BY_TYPE,
//         payload: type
//     }
// }

export function filterType(type,all){
    const filtered = type === 'all' ? all : all.filter(e => e.types.some(e => e.name === type));

    return{
        type: actions.FILTER_BY_TYPE,
        payload: filtered
    }
}


// const order = (array) => {
//     let arr  = array
//     arr.sort((a,b) => {
//         if(a.name === b.name)return 0 // no cambia
//         if(a.name > b.name)return 1// a queda un lugar antes que b
//         return -1// cambiar a por b
//       }
//       )
//     return arr
// }

export const orderPokemonsAsc = () => {

    return{
            type: actions.ORDER_POKEMONS_AZ,
    }

}

export const orderPokemonsDes = () => {

    return{
            type: actions.ORDER_POKEMONS_ZA,
    }

}

export const orderAttackAsc = () => {

    return{
            type: actions.ORDER_ATTACK_AZ,
    }

}

export const orderAttackDes = () => {

    return{
            type: actions.ORDER_ATTACK_ZA,
    }

}

export const getPokemon = (name,setAlert) => async dispatch => {
    dispatch(setLoader(true))
try{
    const {data} = await axios.post(`https://pokeapp-backend-production.up.railway.app/pokemons/search`,{name})
    
    !data && setAlert({error:true, msg:"pokemon not find"})

    data && dispatch(setLoader(false))
    
    data && dispatch({
        type: actions.GET_POKEMON,
        payload: [data]
    })
    }
    catch(error){
     console.log(error);}
    }

    export const getDetails = (id) => async dispatch => {

        try{
                const {data} = await axios.post(`https://pokeapp-backend-production.up.railway.app/pokemons/details`,{id})
                
                
                dispatch({
                    type: actions.GET_POKEMON_DETAILS,
                    payload: data
                })
            }
        catch(error){ 
            console.log(error)}
    }

    export const createPokemon = (form,setAlert) => async () => {

        try{
                const {data} = await axios.post(`https://pokeapp-backend-production.up.railway.app/pokemons`, {...form, name:form.name.toLowerCase()} )
                data && setAlert({msg:"Pokemon successfully created!",error:false})
            }
        catch(error){ 
            console.log(error)}
    }

    export const deleteDetail = ()=> {
        return{
            type: actions.DELETE_DETAIL,
        }

    }

    export const setLoader = (bool)=> {
        return{
          type: actions.SET_LOADER,
          payload: bool,
        };
      };

