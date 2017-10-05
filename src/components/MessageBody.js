import React, { Component } from 'react'
import { messagesRead, fetchMessageBody } from "../actions/index";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class MessageBody extends Component {

    componentDidMount() {
        this.props.messagesRead( [this.props.id], true);
        this.props.fetchMessageBody(this.props.id);
    }

    render() {
        return (
            <div className="col-xs-12 bg-info" style={{ padding: '10px' }}>
                { this.props.message.body }
                this is sample text!!!
            </div>
        );
    }
}

const mapStateToProps = ( state, ownProps ) => ({
    message: state.messages.all.find( (message) => { return message.id === ownProps.id } ),
    messages: state.messages.all,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    messagesRead,
    fetchMessageBody,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageBody)
