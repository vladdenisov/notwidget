import React, { FC, useEffect, useState } from 'react';
import { ProgressBar } from './ProgressBar';
import './Registration.scss'
import {AiFillLock, AiOutlineClose} from "react-icons/all";
import {EmailInput} from "~/components/Registration/EmailInput/EmailInput";
import { API_URL } from '~/config';

export const Registration: FC<unknown> = () => {
  const [stage, setStage] = useState(localStorage.getItem('emailHash') ? 2 : 0)
  const [isBadgeClosed, setBadgeClosed] = useState(false)
  const [email, setEmail] = useState({
    isVerificationPending: false,
    isVerified: !!localStorage.getItem('emailHash'),
    value: localStorage.getItem('email') ? localStorage.getItem('email') : ''
  })
  return (
    <div className={'registration'}>
      <header>
        <ProgressBar stage={stage}/>
      </header>
      <main>
        <h1>Registration</h1>
        <h2>Fill in the registration data. It will take a couple of minutes.</h2>
        <h2>All you need is a phone number and e-mail</h2>
        {
          !isBadgeClosed ? <div className={'registration-badge'}>
            <AiFillLock />
            <span>We take privacy issues seriously. You can be sure that your personal data is securely protected.</span>
            <AiOutlineClose className={'registration-badge_close'} onClick={() => setBadgeClosed(true)}/>
          </div> : null
        }
        <EmailInput
          isVerificationPending={email.isVerificationPending}
          isVerified={email.isVerified}
          value={email.value}
          onEmailSubmit={async (emailValue) => {
            console.log(emailValue)
            const res = await fetch(`${API_URL}/user/sendcode`, {
              method: 'POST',
              body: JSON.stringify({
                email: emailValue
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            console.log(res)
            setStage(1)
          }}
          onEmailVerify={async (verifyCode, emailValue) => {
            console.log(`Verify: ${verifyCode}`)
            const res: {
              hash: string
            } = await fetch(`${API_URL}/user/verifycode`, {
              method: 'POST',
              body: JSON.stringify({
                email: emailValue,
                code: verifyCode
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => res.json())
            if (res.hash !== '') {
              localStorage.setItem('emailHash', res.hash)
              localStorage.setItem('email', emailValue)
              setStage(2)
              return true
            }
            return false
          }}
        />
      </main>
    </div>
  );
};
