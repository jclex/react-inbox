import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageForm from './components/MessageForm'
import MessageList from './components/MessageList'

class App extends Component {

  labels = ['dev', 'personal', 'gSchool', 'test'];
  messages = [
      {
          "id": 1,
          "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
          "read": false,
          "starred": true,
          "selected": false,
          "labels": ["dev", "personal"]
      },
      {
          "id": 2,
          "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
          "read": false,
          "starred": false,
          "selected": true,
          "labels": []
      },
      {
          "id": 3,
          "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
          "read": false,
          "starred": true,
          "selected": false,
          "labels": ["dev"]
      },
      {
          "id": 4,
          "subject": "We need to program the primary TCP hard drive!",
          "read": true,
          "starred": false,
          "selected": true,
          "labels": []
      },
      {
          "id": 5,
          "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
          "read": false,
          "starred": false,
          "selected": false,
          "labels": ["personal"]
      },
      {
          "id": 6,
          "subject": "We need to back up the wireless GB driver!",
          "read": true,
          "starred": true,
          "selected": false,
          "labels": []
      },
      {
          "id": 7,
          "subject": "We need to index the mobile PCI bus!",
          "read": true,
          "starred": false,
          "selected": false,
          "labels": ["dev", "personal"]
      },
      {
          "id": 8,
          "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
          "read": true,
          "starred": true,
          "selected": false,
          "labels": []
      }
  ];
  state = { entryVisible: false, messages: this.messages };

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

  starClicked = ( id, starred ) => {
      const message = this.state.messages.find( message => message.id === id );
      message.starred = ( starred ? false : true );
      this.setState({ messages: this.state.messages });
  }

  addMessage = ( message ) => {
    message.id = this.state.messages.length + 1;
    this.setState({ messages: [
        ...this.state.messages,
        message
    ]});

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

    setReadMessages = ( value ) => {
        const messages = this.state.messages.map( message => message = message.selected ? { ...message, read: value } : message );
        this.setState({ messages: messages });
    }

    addLabel = ( value ) => {
        const messages = this.state.messages.map( message => message = message.selected ? { ...message, labels: message.labels.some( label => label === value ) ? message.labels : [ ...message.labels, value ] } : message );
        this.setState({ messages: messages });
    }

    removeLabel = ( value ) => {
        const messages = this.state.messages.map( message => message = message.selected ? { ...message, labels: message.labels.filter( label => label !== value ) } : message );
        this.setState({ messages: messages });
    }

    deleteMessages = () => {
        const messages = this.state.messages.filter( message => message.selected === false );
        this.setState({ messages: messages });
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
