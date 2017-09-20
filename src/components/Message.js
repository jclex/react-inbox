import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { messageChecked, messageStarred } from "../actions/index";

const Message = ({ message, messageChecked, messageStarred }) => {

    const checkClick = (e) => {
        messageChecked(message.id, !message.selected);
    }

    const starClick = (e) => {
        messageStarred(message.id, !message.starred);
    }

    return  <div className={ "row message" + ( message.read ? " read" : " unread" ) + ( message.selected ? " selected" : "" ) }>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" checked={ message.selected ? "selected" : "" } onChange={ checkClick } />
                        </div>
                        <div className="col-xs-2">
                            <i className={ message.starred ? "star fa fa-star" : "star fa fa-star-o" } onClick={ starClick }></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    { message.labels.map( ( label, index ) => <span key={ index } className="label label-warning">{ label }</span>) }
                    <a href="">
                        {message.subject}
                    </a>
                </div>
            </div>
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    messageChecked,
    messageStarred,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message)