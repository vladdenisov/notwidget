import React, { FC, useEffect, useState } from 'react';
import { ProgressBar } from './ProgressBar';
import './Registration.scss'


export const Registration: FC<unknown> = () => {
  const [stage, setStage] = useState(0)
  return (
    <>
      <header><ProgressBar stage={stage} /></header>
    </>
  );
};
