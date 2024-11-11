'use client'
import React, { useEffect } from 'react'
import { SessionProvider } from "next-auth/react"
import LoginComponent from './_component/login'

type Props = {}

export default function page({}: Props) {
// useEffect(() => {
//     window.location.replace('https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https:localhost:3000/auth/google/callback&client_id=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&flowName=GeneralOAuthFlow')
// }, [])

  return (
    <SessionProvider>
      <LoginComponent />
    </SessionProvider>

  )
}