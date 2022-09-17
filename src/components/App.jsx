import { memo, useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import { AppBar } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { addMessages, getMessages, removeMessages } from 'services/messagesApi';
import Form from './Form/Form';
import MessagesList from './MessagesList/MessagesList';
import s from './App.module.css';

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages()
      .then(res => {
        setMessages(res);
      })
      .catch(err =>
        Notify.failure(`Something went wrong ${err.message}. Try later`)
      );
  }, []);

  const messageFormSubmit = message => {
    addMessages(message)
      .then(({ data }) => {
        Notify.success('Message was added');
        return setMessages([data.data, ...messages]);
      })
      .catch(err =>
        Notify.failure(`Something went wrong ${err.message}. Try later`)
      );
  };

  const onMessageDelete = messageId => {
    removeMessages(messageId)
      .then(res => {
        if (res.status === 404) {
          return Notify.failure(`Message to delete not found`);
        }
        setMessages(messages => messages.filter(el => el._id !== messageId));
        Notify.success('Message was deleted');
      })
      .catch(err =>
        Notify.failure(`Something went wrong ${err.message}. Try later`)
      );
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{ background: 'rgb(248, 228, 246)', height: '50px' }}
      >
        <h1 className={s.title}>
          Guest Book <AppRegistrationIcon />
        </h1>
      </AppBar>
      <div className={s.container}>
        <h2 className={s.secondTitle}>You can leave your message</h2>
        <Form onSubmit={messageFormSubmit} />
        <h2 className={s.secondTitle}>Messages</h2>
        {messages.length > 0 ? (
          <MessagesList messages={messages} onDelete={onMessageDelete} />
        ) : (
          <p className={s.afterTitle}>
            You can leave the first message in our Guestbook
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(App);
