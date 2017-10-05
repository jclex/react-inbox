import { MESSAGES_RECEIVED,
         TOOLBAR_CHECKBOXES_SELECTED,
         MESSAGES_READ,
         MESSAGE_CHECKED,
         MESSAGE_STARRED,
         MESSAGE_CREATE,
         MESSAGES_ADD_LABEL,
         MESSAGES_REMOVE_LABEL,
         MESSAGES_DELETE,
         MESSAGE_BODY_RECEIVED } from '../actions'

function messages(state = { all: [] }, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                all: action.messages
            }
        case MESSAGE_BODY_RECEIVED:
            return {
                ...state,
                all: state.all.map( message => {
                    if ( message.id === action.id )
                        return { ...message, body: action.body }
                    else
                        return message;
                })
            }
        case TOOLBAR_CHECKBOXES_SELECTED:
            if ( action.selectedCount === action.messageCount )
                return {
                    ...state,
                    all: state.all.map( message => { return { ...message, selected: false } } )
                }
            else
                return {
                    ...state,
                    all: state.all.map( message => { return { ...message, selected: true } } )
                }
        case MESSAGES_READ:
            return {
                ...state,
                all: state.all.map( message => {
                    if ( action.selectedIds.includes(message.id) )
                        return { ...message, read: action.read }
                    else
                        return message;
                } )
            }
        case MESSAGE_CHECKED:
            return {
                ...state,
                all: state.all.map( message => {
                    if ( message.id === action.id )
                        return { ...message, selected: action.checked }
                    else
                        return message;
                })
            }
        case MESSAGE_STARRED:
            return {
                ...state,
                all: state.all.map( message => {
                    if ( message.id === action.id )
                        return { ...message, starred: action.starred }
                    else
                        return message;
                })
            }
        case MESSAGE_CREATE:
            return {
                ...state,
                all: action.messages
            }
        case MESSAGES_ADD_LABEL:
            return {
                ...state,
                all: state.all.map( message => {
                    if ( action.selectedIds.includes(message.id) )
                        return { ...message, labels: message.labels.some( label => label === action.label ) ? message.labels : [ ...message.labels, action.label ] }
                    else
                        return message;
                } )
            }
        case MESSAGES_REMOVE_LABEL:
            return {
                ...state,
                all: state.all.map( message => {
                    if ( action.selectedIds.includes(message.id) )
                        return { ...message, labels: message.labels.filter( label => label !== action.label ) }
                    else
                        return message;
                } )
            }
        case MESSAGES_DELETE:
            return {
                ...state,
                all: state.all.filter( message => !action.selectedIds.includes(message.id) )
            }
        default:
            return state
    }
}

export default messages;