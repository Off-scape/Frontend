import AuthClient from '@/components/login/authClient'
import React, { Suspense } from 'react'

const Register = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthClient initialMode="register" />
      </Suspense>
    </div>
  )
}

export default Register
