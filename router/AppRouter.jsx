import { Routes, Route, Navigate,  } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuths } from '../src/iu/components/CheckingAuths'
import { useAuthentication } from '../hooks/useAuthentication'


export const AppRouter = () => {
  const { status } =  useAuthentication( {} );

  if(status === 'checking'){
    return <CheckingAuths />
  }
  

  return (

    <Routes>
    {
      (status === 'authenticated')
      ? <Route path="/*" element= {< JournalRoutes />} />
      :<>
        <Route path="/auth/*" element= { <AuthRoutes /> } />
        <Route path='/*' element={<Navigate  to='/auth/login' />} />
        </>

    }
    </Routes>
  )
}
