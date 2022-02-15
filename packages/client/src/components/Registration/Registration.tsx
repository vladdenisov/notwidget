import React, { FC, useEffect, useState } from 'react';
import { ProgressBar } from './ProgressBar';
import './Registration.scss'
import {AiFillLock, AiOutlineClose} from "react-icons/all";
import {EmailInput} from "~/components/Registration/EmailInput/EmailInput";


export const Registration: FC<unknown> = () => {
  const [stage, setStage] = useState(0)
  const [isBadgeClosed, setBadgeClosed] = useState(false)
  const [email, setEmail] = useState({
    isVerificationPending: false,
    isVerified: false,
    value: ''
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
          onEmailSubmit={(emailValue) => {
            console.log(emailValue)
          }}
          onEmailVerify={async (verifyCode) => {
            console.log(`Verify: ${verifyCode}`)
            return true
          }}
        />
      </main>
    </div>
  );
};
