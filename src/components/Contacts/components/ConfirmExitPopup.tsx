import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../store';
import { Popup } from '../..';

type Props = {
  onCancel: () => void
};

export const ConfirmExitPopup = (x: Props) => {
  const navigate = useNavigate();

  const handleAccept = () => {
    auth.logout();
    navigate('/');
  };

  return (
    <Popup onAccept={handleAccept}
           onCancel={x.onCancel}
           title="Подтвердите выход">
      Вы действительно хотите выйти?
    </Popup>
  );
};
