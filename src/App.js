import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageForm from './components/MessageForm'
import MessageList from './components/MessageList'
import { fetchMessages } from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class App extends Component {

    componentDidMount() {
        this.props.fetchMessages();
    }

    render() {
        return (
            <div className="App">
                <Toolbar />
                { this.props.toolbar.entryVisible ? <MessageForm /> : <div></div> }
                <MessageList />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    toolbar: state.toolbar,
    messages: state.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMessages,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)