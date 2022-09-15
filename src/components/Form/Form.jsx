import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import moment from 'moment';
import { Button, TextareaAutosize } from '@mui/material';
import s from './Form.module.css';

export default function Form({ onSubmit }) {
  const [nameUser, setNameUser] = useState(() => {
    return JSON.parse(window.localStorage.getItem('nameUser')) ?? '';
  });
  const [message, setMessage] = useState(() => {
    return JSON.parse(window.localStorage.getItem('message')) ?? '';
  });

  useEffect(() => {
    window.localStorage.setItem('nameUser', JSON.stringify(nameUser));
    window.localStorage.setItem('message', JSON.stringify(message));
  }, [nameUser, message]);

  const handleReset = () => {
    setMessage('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (nameUser.trim() === '') {
      return Notify.warning('Please fill input Name');
    }

    if (message.trim() === '') {
      return Notify.warning('Please fill input Message');
    }

    onSubmit({
      nameUser,
      message,
    });
    Notify.success('Message was added');
    handleReset();
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setNameUser(value);
        break;
      case 'text':
        setMessage(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={nameUser}
            placeholder="name"
            onChange={handleChange}
            pattern="^[a-zA-Z0-9_]{1,2}*$"
            title="Name may contain only letters, numbers, underscores"
            required
          />
        </label>
        <label>
          Message
          <TextareaAutosize
            aria-label="minimum height"
            className={s.input}
            name="text"
            value={message}
            minRows={5}
            maxRows={5}
            placeholder="Your message"
            title="Please write your message"
            onChange={handleChange}
            required
          />
        </label>
        <Button
          variant="outlined"
          type="submit"
          size="large"
          style={{
            border: '3px solid rgb(248, 228, 246)',
            borderRadius: '8px',
            fontSize: '14px',
            minWidth: '50%',
            color: 'rgb(76, 106, 110)',
            position: 'static',
          }}
        >
          Send message
        </Button>
      </form>
    </div>
  );
}
