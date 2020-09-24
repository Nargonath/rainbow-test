import React from 'react';
import PropTypes from 'prop-types';
import rainbowSDK from 'rainbow-web-sdk';

import './Chat.scss';

function Message({ content }) {
  return <p className="chat__message">{content}</p>;
}

function Chat({ contact }) {
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    setIsConnecting(true);

    rainbowSDK.conversations
      .openConversationForContact(contact)
      .then((conversation) => {
        console.log(conversation);
        setIsConnecting(false);

        if (conversation.lastMessageText) {
          setMessages((prevState) => [
            ...prevState,
            conversation.lastMessageText,
          ]);
        }
      })
      .catch(console.error);
  }, [setIsConnecting, contact]);

  React.useEffect(() => {
    const onNewMessage = (event) => {
      console.log(event.detail);
      setMessages((prevMessages) => [
        ...prevMessages,
        event.detail.message.data,
      ]);
    };
    window.document.addEventListener(
      rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED,
      onNewMessage,
    );

    return () =>
      window.document.removeEventListener(
        rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED,
        onNewMessage,
      );
  }, [setMessages]);

  return (
    <div className="chat">
      <h2 className="chat__title">Chat with {contact.firstname}</h2>
      {isConnecting ? (
        <p>Connecting...</p>
      ) : messages.length === 0 ? (
        <p>No messages for now</p>
      ) : (
        messages.map((message) => <Message key={message} content={message} />)
      )}
    </div>
  );
}

Chat.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Chat;
