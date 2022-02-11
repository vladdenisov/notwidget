import React, { FC } from 'react';


export const ProgressBar: FC<{stage: number}> = (props: {stage: number}) => { 
  const s = props.stage
  return (
    <>
      <div className="progress-bar">
        <div className={`dot active`} />
        <div className={`line ${s > 0 ? 'active' : ''}`} />
        <div className={`dot ${s > 0 ? 'active' : ''}`} />
        <div className={`line ${s > 1 ? 'active' : ''}`} />
        <div className={`dot ${s > 1 ? 'active' : ''}`} />
      </div>
    </>
  );
};
