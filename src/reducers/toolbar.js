import { TOOLBAR_CHECKBOXES_SELECTED, MESSAGE_CREATE, MESSAGES_READ, MESSAGE_CHECKED } from '../actions'

function toolbar(state = { selectedIds: [], refresh: false }, action) {
    switch (action.type) {
        case TOOLBAR_CHECKBOXES_SELECTED:
            if ( action.selectedCount === action.messageCount )
                return {
                    ...state,
                    refresh: true,
                    selectedIds: [],
                }
            else
                return {
                    ...state,
                    refresh: true,
                    selectedIds: action.allIds,
                }
        case MESSAGE_CREATE:
            return {
                ...state
            }
        case MESSAGE_CHECKED:
            if ( action.checked )
                return {
                    ...state,
                    selectedIds: [ ...state.selectedIds, action.id ],
                }
            else
                return {
                    ...state,
                    selectedIds: state.selectedIds.filter( id => id !== action.id ),
                }
        case MESSAGES_READ:
            return {
                ...state,
                refresh: true,
            }
        default:
            return state
    }
}

export default toolbar;