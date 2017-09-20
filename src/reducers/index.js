import { combineReducers } from 'redux'

import toolbar from './toolbar'
import messages from './messages'

export default combineReducers({
    toolbar,
    messages,
})