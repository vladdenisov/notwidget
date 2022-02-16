import React, { FC, useEffect, useState } from 'react';
import './EmailInput.scss'
import {IoMdRefresh, MdModeEditOutline} from "react-icons/all";

// eslint-disable-next-line no-control-regex
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/


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
  const [isEmailCorrect, setCorrect] = useState<boolean>()
  const [verificationCode, setCode] = useState('')

  const onEmailSubmit = () => {
    if (isEmailCorrect) {
      props.onEmailSubmit(email)
      setPending(true)
    }
  }

  return (
    <>
      <div className={'registration-email'}>
        {
          (!isVerified && !isVerificationPending) ?
            <div className={'registration-email_input'}>
              <span>
                Enter your email
              </span>
              <input
                type={'text'}
                name={'notwidget-email'}
                autoComplete={'off'}
                defaultValue={email}
                placeholder={'example@gmail.com'}
                className={(isEmailCorrect === null || isEmailCorrect) ? '' : 'incorrect'}
                onChange={(e) => {
                  if (!isVerificationPending) {
                    const value = (e.target as HTMLInputElement).value
                    console.log(EMAIL_REGEX.test(value))
                    setCorrect(EMAIL_REGEX.test(value))
                    setEmailValue(value)
                  }
                }}
                onKeyPress={(key) => {
                  if (key.key === 'Enter' && !isVerificationPending) {
                    onEmailSubmit()
                  }
                }}
              />
              <button
                onClick={() => onEmailSubmit()}
                disabled={isVerificationPending}
              >Send code</button>
            </div> :
            <>
              <div className={'registration-email_confirmation'}>
                <span className={'registration-email_confirmation__email'}>{email}</span>
                <div className={'registration-email_confirmation__bottom'}>
                  <span className={'registration-email_confirmation__bottom___status'}>
                    {isVerified ? 'Email verified' : 'Email verification pending'}
                  </span>
                  <MdModeEditOutline onClick={() => {
                    setVerified(false)
                    setPending(false)

                  }}/>
                </div>
              </div>
           </>
        }
      </div>
      {
        isVerificationPending ?
          <div className={'registration-email_verification'}>
            <div className={'registration-email_verification__code'}>
              <span className={'registration-email_verification__code-label'}>Confirmation code</span>
              <div className={'registration-email_verification__code-input'}>
                <input
                  type={'text'}
                  name={'notwidget-code'}
                  autoComplete={'off'}
                  placeholder={'━ ━ ━ ━'}
                  value={verificationCode}
                  className={(isEmailCorrect === null || isEmailCorrect) ? '' : 'incorrect'}
                  onChange={(e) => {
                    console.log(e)
                    setCode(((e.target) as HTMLInputElement).value.toLocaleUpperCase())
                  }}
                  onKeyPress={(key) => {
                    console.log(key)
                  }}
                />
                <button><IoMdRefresh />Send again</button>
              </div>
              <span className={'registration-email_verification__code-bottomLabel'}> Confirm email with code from message</span>
            </div>
          </div> :
          null
      }
    </>
  )
}
