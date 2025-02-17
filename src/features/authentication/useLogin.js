import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as loginApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function useLogin () {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: user => {
      queryClient.setQueryData(['user'], user.user)
      navigate('/dashboard')
      toast.success('Logged in successfully')
    },

    onError: error => {
      console.log('Error', error)

      toast.error('Provided email or password is not correct')
    }
  })
  return { login, isLoading }
}

export default useLogin
