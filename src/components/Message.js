import React from 'react'

const Message = ({ message, checkClicked, starClicked }) => {

    const checkClick = (e) => {
        checkClicked(message.id, message.selected);
    }

    const starClick = (e) => {
        starClicked(message.id, message.starred);
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

export default Message;