import React from 'react'

const Toolbar = ({ labels, entryVisible, modifyCheckBoxes, showMessage, setReadMessages, messageCount, selectedCount, unreadCount, addLabel, removeLabel, deleteMessages }) => {

    const readClicked = (e) => {
        e.preventDefault();
        setReadMessages(true);
    }

    const unReadClicked = (e) => {
        e.preventDefault();
        setReadMessages(false);
    }

    const applyLabelClicked = (e) => {
        e.preventDefault();
        addLabel(e.target.value);
        e.target.selectedIndex = 0;
    }

    const removeLabelClicked = (e) => {
        e.preventDefault();
        removeLabel(e.target.value);
        e.target.selectedIndex = 0;
    }

    const deleteClicked = (e) => {
        e.preventDefault();
        deleteMessages();
    }

    return  <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{ unreadCount }</span>
                        unread messages
                    </p>

                    <a className="btn btn-danger">
                        <i className={ entryVisible ? "fa fa-minus" : "fa fa-plus" } onClick={ showMessage }></i>
                    </a>

                    <button className="btn btn-default">
                        <i className={ "fa " + ( selectedCount === 0 ? "fa-square-o" : ( selectedCount === messageCount ? "fa-check-square-o" : "fa-minus-square-o" ))}
                           onClick={ modifyCheckBoxes }></i>
                    </button>

                    <button className="btn btn-default" disabled={ selectedCount > 0 ? "" : "disabled" } onClick={ readClicked }>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" disabled={ selectedCount > 0 ? "" : "disabled" } onClick={ unReadClicked }>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select" disabled={ selectedCount > 0 ? "" : "disabled" } onChange={ applyLabelClicked }>
                        <option>Apply label</option>
                        { labels.map( ( label, index ) => <option key={ index } value={ label }>{ label }</option>)}
                    </select>

                    <select className="form-control label-select" disabled={selectedCount > 0 ? "" : "disabled"} onChange={ removeLabelClicked }>
                        <option>Remove label</option>
                        { labels.map( ( label, index ) => <option key={ index } value={ label }>{ label }</option>)}
                    </select>

                    <button className="btn btn-default" disabled={ selectedCount > 0 ? "" : "disabled" } onClick={ deleteClicked }>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
}

export default Toolbar;