import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageForm from './components/MessageForm'
import MessageList from './components/MessageList'

class App extends Component {

    state = { entryVisible: false, messages: [] };
    labels = ['dev', 'personal', 'gSchool', 'test'];

	getId = ({ id }) => id;

  enableToolbar = () => (
      this.state.entryVisible ? this.setState({ entryVisible: false }) : this.setState({ entryVisible: true })
  )

  toggleEntryVisibility = () => (
      this.state.entryVisible ? this.setState({ entryVisible: false }) : this.setState({ entryVisible: true })
  )

  showMessageForm = (e) => {
      this.toggleEntryVisibility();
  }

  modifyCheckBoxes = (e) => {
      const selectedCount = this.selectedCount(this.state.messages);

      if ( selectedCount === this.state.messages.length )
          this.setCheckMessages(false);
      else
          this.setCheckMessages(true);
  }

  checkClicked = ( id, selected ) => {
      const message = this.state.messages.find( message => message.id === id );
      message.selected = ( selected ? false : true );
      this.setState({ messages: this.state.messages });
  }

    starClicked = async ( id, starred ) => {

        await fetch('/api/messages', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messageIds: [ id ],
                command: 'star',
                star: !starred
            })
        });

        const message = this.state.messages.find( message => message.id === id );
        message.starred = ( starred ? false : true );
        this.setState({ messages: this.state.messages });
    }

    addMessage = async ( message ) => {

        await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject: message.subject,
                body: message.body
            })
        });

        const response = await fetch('/api/messages');
        const json = await response.json();

        this.setState({ ...this.state, messages: json._embedded.messages });

        this.toggleEntryVisibility();
    }

  selectedCount = (messages) => {
      return messages.reduce( ( total, message ) => total + ( message.selected === true ? 1 : 0 ), 0 )
  }

  unreadCount = (messages) => {
      return messages.reduce( ( total, message ) => total + ( message.read ? 0 : 1 ), 0 )
  }

    setCheckMessages = ( value ) => {
        const messages = this.state.messages.map( message => message = { ...message, selected: value } );
        this.setState({ messages: messages });
    }

    setReadMessages = async ( value ) => {

        const messages = this.state.messages.map( message => message = message.selected ? { ...message, read: value } : message );
        const selectedMessages = messages.filter( message => message.selected )
        const selectedIds =  selectedMessages.map( message => this.getId(message) );

        await fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: selectedIds,
                command: 'read',
                read: value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.setState({ messages: messages });
    }

    addLabel = async ( value ) => {
        const messages = this.state.messages.map( message => message = message.selected ? { ...message, labels: message.labels.some( label => label === value ) ? message.labels : [ ...message.labels, value ] } : message );
        const selectedMessages = messages.filter( message => message.selected )
        const selectedIds =  selectedMessages.map( message => this.getId(message) );

        await fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: selectedIds,
                command: 'addLabel',
                label: value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.setState({ messages: messages });
    }

    removeLabel = async ( value ) => {
        const messages = this.state.messages.map( message => message = message.selected ? { ...message, labels: message.labels.filter( label => label !== value ) } : message );
        const selectedMessages = messages.filter( message => message.selected )
        const selectedIds =  selectedMessages.map( message => this.getId(message) );

        await fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: selectedIds,
                command: 'removeLabel',
                label: value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.setState({ messages: messages });
    }

    deleteMessages = async () => {
        const selectedMessages = this.state.messages.filter( message => message.selected )
        const selectedIds =  selectedMessages.map( message => this.getId(message) );

        await fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: selectedIds,
                command: 'delete'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const messages = this.state.messages.filter( message => message.selected !== true );
        this.setState({ messages: messages });
    }

    async componentDidMount() {
        const response = await fetch('/api/messages');
        const json = await response.json();

        this.setState({ ...this.state, messages: json._embedded.messages });
    }

    render() {
        return (
            <div className="App">
                <Toolbar labels={ this.labels }
                        entryVisible={ this.state.entryVisible }
                        modifyCheckBoxes={ this.modifyCheckBoxes }
                        showMessage={ this.showMessageForm }
                        setReadMessages={ this.setReadMessages }
                        messageCount={ this.state.messages.length }
                        selectedCount={ this.selectedCount(this.state.messages) }
                        unreadCount={ this.unreadCount(this.state.messages) }
                        addLabel={ this.addLabel }
                        removeLabel={ this.removeLabel }
                    deleteMessages={ this.deleteMessages } />
                { this.state.entryVisible ? <MessageForm addMessage={ this.addMessage } /> : <div></div> }
                <MessageList messages={ this.state.messages } checkClicked={ this.checkClicked } starClicked={ this.starClicked } />
            </div>
        );
    }
}

export default App;
