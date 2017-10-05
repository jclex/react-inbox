import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageForm from './components/MessageForm'
import MessageList from './components/MessageList'
import { fetchMessages } from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

    componentDidMount() {
        this.props.fetchMessages();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/" component={Toolbar} />
                    <Route path="/compose" component={MessageForm} />
                    <MessageList />
                </div>
            </Router>
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