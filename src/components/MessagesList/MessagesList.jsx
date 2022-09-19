import * as React from 'react';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './MessagesList.module.css';
import { memo } from 'react';

function MessagesList({ messages, onDelete }) {
  return (
    <div className={s.messagesList}>
      {messages?.map(el => (
        <div key={el._id} className={s.messagesListItem}>
          <div className={s.messagesContainer}>
            <h3>{el.nameUser}</h3>
            <p className={s.message}>{el.message}</p>
            <p>
              {moment.unix(`${el.time}` / 1000).format('DD/MM/YYYY HH:mm:ss')}
            </p>
          </div>
          <IconButton
            aria-label="delete"
            type="button"
            onClick={() => onDelete(el._id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
}

export default memo(MessagesList);
