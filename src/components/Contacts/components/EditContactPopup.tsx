import React from 'react';
import { Popup } from '../..';

type Props = {
  onAccept: () => void
  onCancel: () => void
};

export const EditContactPopup = (x: Props) => {
  return (
    <Popup onAccept={x.onAccept} onCancel={x.onCancel} title="Редактирование...">
      Редактирование
    </Popup>
  );
};
