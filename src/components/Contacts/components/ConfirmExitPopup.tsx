import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Popup } from '../..';

type Props = {
  onCancel: () => void
};

export const ConfirmExitPopup = (x: Props) => {
  const navigate = useNavigate();

  return (
    <Popup onAccept={() => navigate('/')}
           onCancel={x.onCancel}
           title="Подтвердите выход">
      Вы действительно хотите выйти?
    </Popup>
  );
};
