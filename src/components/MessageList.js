import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Message from './Message'

const MessageList = ({ messages }) => (
    <div className="container">
        { messages.map( message => <Message key={ message.id } message={ message } /> ) }
    </div>
)

const mapStateToProps = state => ({
    messages: state.messages.all,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList)