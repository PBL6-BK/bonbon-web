import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useContext, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import authApi from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import { AppContext, AppContextType } from 'src/contexts/app.context'
import { LoginImg } from 'src/assets/images'
import HStack from 'src/components/atomic/HStack'
import { setProfileToLS } from 'src/utils/auth'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function Home() {
  const [idToken, setIdToken] = useState<string>('')
  const queryClient = useQueryClient()

  const { setIsAuthenticated, setUser } = useContext<AppContextType>(AppContext)
  const mutationLogin = useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['login']
      })
      const { data } = res

      const user = {
        id: data.id,
        email: data.email,
        fullName: data.full_name,
        avatar: data.avatar
      }

      setIsAuthenticated(true)
      setUser(user)
      setProfileToLS(user)
      toast.success('Login successfully!', {
        position: 'top-right',
        autoClose: 500
      })
    },
    onError: (error: any) => {
      console.log('Login with google error:', error)
    }
  })

  useEffect(() => {
    if (idToken !== '') {
      mutationLogin.mutate({ id_token: idToken })
    }
  }, [idToken])

  return (
    <HStack className='h-screen w-screen'>
      <div className='hidden flex-1 p-8 lg:block'>
        <div className='relative h-full w-full overflow-hidden rounded-xl'>
          <div className='absolute h-full w-full bg-black bg-opacity-5'></div>
          <img className='h-full w-full object-cover' src={LoginImg} alt='' />
        </div>
      </div>
      <div className='flex w-full flex-col items-center justify-center p-8 lg:w-128'>
        <div className='text-center'>
          <h2 className='text-4xl font-bold text-fin'>Welcome to BonBon</h2>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className='mt-4'>
              <GoogleLogin
                onSuccess={(authResponse) => {
                  setIdToken(authResponse.credential as string)
                }}
                text='continue_with'
                size='medium'
                theme='filled_blue'
                width={350}
              />
            </div>
          </GoogleOAuthProvider>
        </div>
      </div>
      <Link to='/faq'>
        <div className='fixed bottom-5 right-5 m-3 flex items-center gap-2 text-xl text-black'>
          <Icon icon='fa:question-circle' />
          <span>Q&A</span>
        </div>
      </Link>
    </HStack>
  )
}
