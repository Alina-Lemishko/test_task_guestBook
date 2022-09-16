import { memo, useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import s from './Form.module.css';

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

      if (nameUser.length < 2 || nameUser.length > 20) {
        setIsErrorText(prevState => ({
          ...prevState,
          nameUser:
            'Name must contain at least two characters and no more than 20 characters',
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

      if (message.length < 4 || message.length > 400) {
        setIsErrorText(prevState => ({
          ...prevState,
          message: 'Message must contain at least four characters',
        }));
        isError = true;
      }

      if (!/^[a-zA-Z0-9_]*$/.test(nameUser)) {
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
          onChange={handleChange}
          helperText={isErrorText.nameUser}
          error={isErrorText.nameUser !== ' ' && !!isErrorText.nameUser}
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
          onKeyDown={onKeyPressed}
          tabIndex={0}
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
