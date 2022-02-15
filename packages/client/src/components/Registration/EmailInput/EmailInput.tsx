import React, { FC, useEffect, useState } from 'react';
import './EmailInput.scss'

export const EmailInput: FC<{
  isVerificationPending: boolean,
  isVerified: boolean,
  value: string,
  onEmailSubmit: (email: string) => void,
  onEmailVerify: (code: string) => Promise<boolean>
}> = (props) => {
  const [email, setEmailValue] = useState(props.value)
  const [isVerified, setVerified] = useState(props.isVerified)
  const [isVerificationPending, setPending] = useState(props.isVerificationPending)

  const onEmailSubmit = () => {
    props.onEmailSubmit(email)
    setPending(true)
  }

  return (
    <div className={'registration-email'}>
      {
        (!isVerified && !isVerificationPending) ?
          <div className={'registration-email_input'} >
            <span>
              Enter your email
            </span>
            <input
              type={'text'}
              name={'notwidget-email'}
              autoComplete={'off'}
              placeholder={'example@gmail.com'}
              onChange={(e) => {
                if (!isVerificationPending)
                  setEmailValue((e.target as HTMLInputElement).value)
              }}
              onKeyPress={(key) => {
                if (key.key === 'Enter') {
                  onEmailSubmit()
                }
              }}
            />
            <button
              onClick={() => onEmailSubmit()}
              disabled={isVerificationPending}
            >Send code</button>
          </div> :
          null
      }
    </div>
  )
}
