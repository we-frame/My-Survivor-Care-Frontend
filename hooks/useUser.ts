import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/api';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

// Define user type
interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_registration_completed?: boolean;
  latest_menopause_history?: any;
  menopause_history?: any[];
  [key: string]: any;
}

// Query keys
export const userKeys = {
  all: ['users'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  answers: (key: string) => [...userKeys.all, 'answers', key] as const,
};

export const useUser = () => {
  const queryClient = useQueryClient();

  // Get user profile
  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: userKeys.profile(),
    queryFn: userService.getProfile,
    enabled: !!Cookies.get('access-token'), // Only run if user is logged in
  });

  // Update user profile
  const updateProfile = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      // Invalidate user profile query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
    },
  });

  // Get user answers for a specific key (e.g., 'BI' for background information)
  const getUserAnswers = (key: string) => {
    const userId = (user as User)?.id;
    
    return useQuery({
      queryKey: userKeys.answers(key),
      queryFn: () => userService.getUserAnswers(key, userId),
      enabled: !!userId, // Only run if user ID is available
    });
  };

  // Update user answer
  const updateAnswer = useMutation({
    mutationFn: ({ answerId, data }: { answerId: string; data: any }) =>
      userService.updateAnswer(answerId, data),
    onSuccess: () => {
      // Invalidate all answer queries
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success('Answer updated successfully');
    },
  });

  return {
    user: user as User,
    isLoading,
    error,
    refetch,
    updateProfile,
    getUserAnswers,
    updateAnswer,
  };
};