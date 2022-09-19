import { memo, useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import s from './Form.module.css';
import {
  MAX_MESSAGE_SYMBOLS,
  MAX_NAME_SYMBOLS,
  MIN_MESSAGE_SYMBOLS,
  MIN_NAME_SYMBOLS,
} from 'components/helpers/constants';

function Form({ onSubmit }) {
  const [nameUser, setNameUser] = useState(() => {
    return JSON.parse(window.localStorage.getItem('nameUser')) ?? '';
  });
  const [message, setMessage] = useState(() => {
    return JSON.parse(window.localStorage.getItem('message')) ?? '';
  });
  const [isErrorText, setIsErrorText] = useState({
    nameUser: ' ',
    message: ' ',
  });

  useEffect(() => {
    window.localStorage.setItem('nameUser', JSON.stringify(nameUser));
    window.localStorage.setItem('message', JSON.stringify(message));
  }, [nameUser, message]);

  const handleReset = () => {
    setMessage('');
  };

  const handleSubmit = useCallback(
    e => {
      if (e) {
        e.preventDefault();
      }

      let isError = false;

      if (nameUser.trim() === '') {
        setIsErrorText(prevState => ({
          ...prevState,
          nameUser: 'Please fill input Name',
        }));
        isError = true;
      }

      if (
        nameUser.length < MIN_NAME_SYMBOLS ||
        nameUser.length > MAX_NAME_SYMBOLS
      ) {
        setIsErrorText(prevState => ({
          ...prevState,
          nameUser: `Name must contain at least ${MIN_NAME_SYMBOLS} characters and no more than ${MAX_NAME_SYMBOLS} characters`,
        }));
        isError = true;
      }

      if (message.trim() === '') {
        setIsErrorText(prevState => ({
          ...prevState,
          message: 'Please fill input Message',
        }));
        isError = true;
      }

      if (
        message.length < MIN_MESSAGE_SYMBOLS ||
        message.length > MAX_MESSAGE_SYMBOLS
      ) {
        setIsErrorText(prevState => ({
          ...prevState,
          message: `Message must contain at least ${MIN_MESSAGE_SYMBOLS} characters and no more than ${MAX_MESSAGE_SYMBOLS} characters`,
        }));
        isError = true;
      }

      if (!/^[a-zA-Z0-9_\s]*$/.test(nameUser)) {
        setIsErrorText(prevState => ({
          ...prevState,
          nameUser: 'Message may contain only letters, numbers and underscores',
        }));
        isError = true;
      }

      if (isError) {
        return;
      }

      onSubmit({
        nameUser,
        message,
      });

      handleReset();
    },
    [message, nameUser, onSubmit]
  );

  const onKeyPressed = e => {
    if (e.keyCode === 13 && e.ctrlKey) {
      handleSubmit();
      return;
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'nameUser':
        setNameUser(value);
        setIsErrorText(prevState => ({
          ...prevState,
          nameUser: ' ',
        }));
        break;
      case 'message':
        setMessage(value);
        setIsErrorText(prevState => ({
          ...prevState,
          message: ' ',
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form id="form" className={s.form} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          name="nameUser"
          value={nameUser}
          helperText={isErrorText.nameUser}
          error={isErrorText.nameUser !== ' ' && !!isErrorText.nameUser}
          onChange={handleChange}
          sx={{
            marginBottom: '10px',
            width: '100%',
            '& .MuiInputLabel-root': { color: '#4c6a6e' },
            '& .MuiOutlinedInput-root': {
              '& > fieldset': { border: '3px solid #f8e4f6' },
            },
          }}
        />
        <TextField
          label="Message"
          variant="outlined"
          size="small"
          name="message"
          value={message}
          minRows={5}
          maxRows={5}
          helperText={isErrorText.message}
          error={isErrorText.message !== ' ' && !!isErrorText.message}
          onChange={handleChange}
          onKeyDown={onKeyPressed}
          tabIndex={0}
          multiline
          sx={{
            marginBottom: '10px',
            width: '100%',
            '& .MuiInputLabel-root': { color: '#4c6a6e' },
            '& .MuiOutlinedInput-root': {
              '& > fieldset': { border: '3px solid #f8e4f6' },
            },
          }}
        />
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

export default memo(Form);
