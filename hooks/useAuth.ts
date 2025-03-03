import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/api';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { userKeys } from './useUser';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Login mutation
  const login = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      // Set cookies
      Cookies.set('access-token', data.access_token);
      Cookies.set('refresh-token', data.refresh_token);
      
      // Invalidate user profile query to fetch the latest data
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      
      toast.success('Login successful');
      router.push('/profile');
    },
  });

  // Register mutation
  const register = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Registration successful');
    },
  });

  // Check if user exists
  const checkUserExists = useMutation({
    mutationFn: (email: string) => authService.checkUserExists(email),
  });

  // Google login
  const googleLogin = useMutation({
    mutationFn: (firebaseUser: any) => 
      authService.login(firebaseUser.email, firebaseUser.uid),
    onSuccess: (data) => {
      // Set cookies
      Cookies.set('access-token', data.access_token);
      Cookies.set('refresh-token', data.refresh_token);
      
      // Invalidate user profile query to fetch the latest data
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      
      toast.success('Login successful');
      router.push('/profile');
    },
  });

  // Google register
  const googleRegister = useMutation({
    mutationFn: (firebaseUser: any) => {
      const userData = {
        first_name: firebaseUser?.displayName?.substring(
          0,
          firebaseUser?.displayName?.indexOf(' ')
        ),
        last_name: firebaseUser?.displayName?.substring(
          firebaseUser?.displayName?.indexOf(' ') + 1
        ),
        email: firebaseUser?.email,
        password: firebaseUser?.uid,
        auth_type: 'google',
        role: '40607d3a-0760-4ae0-b60a-60dfd0fae8ba',
      };
      return authService.register(userData);
    },
    onSuccess: (_, firebaseUser) => {
      // After registration, login the user
      googleLogin.mutate(firebaseUser);
      
      // Store firebase user data in cookie for registration completion
      Cookies.set('google-auth-userData', btoa(JSON.stringify(firebaseUser)));
      
      router.push(`/register?u=${btoa(JSON.stringify(firebaseUser))}`);
    },
  });

  // Logout
  const logout = () => {
    authService.logout();
    // Clear all queries from cache
    queryClient.clear();
    router.push('/login');
  };

  return {
    login,
    register,
    checkUserExists,
    googleLogin,
    googleRegister,
    logout,
  };
};