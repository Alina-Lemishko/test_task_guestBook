import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import { AppBar } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import s from './App.module.css';
import Form from './Form/Form';
import MessagesList from './MessagesList/MessagesList';
import { addMessages, getMessages, removeMessages } from 'services/messagesApi';

export const App = () => {
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
      .then(({ data }) => setMessages([data.data, ...messages]))
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
        if (res.status === 500) {
          return Notify.failure(`Internal Server Error`);
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
        <MessagesList messages={messages} onDelete={onMessageDelete} />
      </div>
    </div>
  );
};
