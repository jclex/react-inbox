import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toolbarCheckboxes, messagesRead, messagesAddLabel, messagesRemoveLabel, messagesDelete } from '../actions'
import { withRouter, Route, Link, Switch } from 'react-router-dom';

const Toolbar = ({ toolbarCheckboxes, messagesRead, messageCount, selectedIds, allIds, selectedCount, unreadCount, messagesAddLabel, messagesRemoveLabel, messagesDelete }) => {

    const labels = ['dev', 'personal', 'gSchool', 'test'];

    const checkBoxesClicked = (e) => {
        toolbarCheckboxes(selectedCount, messageCount, allIds);
    }

    const readClicked = (e) => {
        messagesRead(selectedIds, true);
    }

    const unReadClicked = (e) => {
        messagesRead(selectedIds, false);
    }

    const applyLabelClicked = (e) => {
        messagesAddLabel(selectedIds, e.target.value);
        e.target.selectedIndex = 0;
    }

    const removeLabelClicked = (e) => {
        messagesRemoveLabel(selectedIds, e.target.value);
        e.target.selectedIndex = 0;
    }

    const deleteClicked = (e) => {
        messagesDelete(selectedIds);
    }

    return  <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{ unreadCount }</span>
                        unread messages
                    </p>

                    <Switch>

                        <Route path="/compose" exact render={() => {
                            return  <Link to="/" className="btn btn-danger">
                                <i className="fa fa-minus"></i>
                            </Link>
                        }} />

                        <Route render={() => {
                            return  <Link to="/compose" className="btn btn-danger">
                                <i className="fa fa-plus"></i>
                            </Link>
                        }} />

                    </Switch>

                    <button className="btn btn-default" onClick={ checkBoxesClicked }>
                        <i className={ "fa " + ( selectedCount === 0 ? "fa-square-o" : ( selectedCount === messageCount ? "fa-check-square-o" : "fa-minus-square-o" ))}></i>
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

const mapStateToProps = state => ({
    messageCount: state.messages.all.length,
    selectedIds: state.toolbar.selectedIds,
    allIds: state.messages.all.map( message => { return message.id }),
    selectedCount: state.messages.all.reduce( ( total, message ) => total + ( message.selected === true ? 1 : 0 ), 0 ),
    unreadCount: state.messages.all.reduce( ( total, message ) => total + ( message.read ? 0 : 1 ), 0 ),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toolbarCheckboxes,
    messagesRead,
    messagesAddLabel,
    messagesRemoveLabel,
    messagesDelete,
}, dispatch)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar))