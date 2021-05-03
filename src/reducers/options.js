const initialState = {

};

export default function options(state = initialState, action){
    if (action.type === 'REDACT_GENERAL_OPTIONS'){
        state.generalOptions = action.payload
        return {
        ...state
        };
    }
    if (action.type === 'ADD_HEADER'){
        const emptyHeader = {
            color:'#000',
            value:''
        }

        state.header = emptyHeader

        return {
        ...state
        };
    }
    if (action.type === 'DELETE_HEADER'){
        state.header = null

        return {
        ...state
        };
    }
    if (action.type === 'REDACT_HEADER'){
        state.header = action.payload

        return {
        ...state
        };
    }
    if (action.type === 'ADD_DESCRIPTION'){
        const emptyDescription = {
            color:'#0000008a',
            value:''
        }

        state.description = emptyDescription

        return {
        ...state
        };
    }
    if (action.type === 'DELETE_DESCRIPTION'){
        state.description = null

        return {
        ...state
        };
    }
    if (action.type === 'REDACT_DESCRIPTION'){
        state.description = action.payload
        return {
        ...state
        };
    }
    

    if (action.type === 'ADD_BUTTON'){
        const emptyHeader = {
            value:''
        }
        state.buttons ? state.buttons.push(emptyHeader) : state.buttons = [emptyHeader]
        
        state = Object.assign({}, state, {...state});

        return {
        ...state
        };
    }
    if (action.type === 'DELETE_BUTTON'){
        state.buttons.splice(action.payload, 1)
        if (state.buttons.length === 0){
            delete state.buttons
        }
        else state.buttons = Object.assign([], state.buttons, [...state.buttons]);

        return {
        ...state
        };
    }
    
    if (action.type === 'REDACT_BUTTON'){
        state.buttons[action.payload.index] = action.payload.data
        state = Object.assign({}, state, {...state});

        return {
        ...state
        };
    }
    if (action.type === 'REDACT_IMAGE'){
        state.image = action.payload
        return {
        ...state
        };
    }

    return state;
}