'use client';

import { Toast, ToastContainer } from 'react-bootstrap';
import { useNotification } from '../context/NotificationContext';

export default function Notification() {
  const { notification, type, clearNotification } = useNotification();
  return (
    <ToastContainer
      className="p-3"
      position="bottom-end"
      containerPosition="fixed"
      style={{ zIndex: 1 }}
    >
      <Toast
        onClose={() => clearNotification()}
        show={notification !== null}
        delay={5000}
        autohide
        bg={type ? type : 'info'}
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{notification}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
