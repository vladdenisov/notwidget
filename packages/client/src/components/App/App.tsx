import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing } from '../Landing';
import { Registration } from '../Registration';

export const App: FC<unknown> = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path='/register' element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
