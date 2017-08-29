import React from 'react'

import Message from './Message'

const MessageList = ({ messages, checkClicked, starClicked }) => (
    <div className="container">
        { messages.map( message => <Message key={ message.id } message={ message } checkClicked={ checkClicked } starClicked={ starClicked } /> ) }
    </div>
)

export default MessageList;