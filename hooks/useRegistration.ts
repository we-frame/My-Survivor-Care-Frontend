import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '@/lib/api';
import { userKeys } from './useUser';
import toast from 'react-hot-toast';

// Query keys for registration
export const registrationKeys = {
  all: ['registration'] as const,
  forms: ['registration', 'forms'] as const,
  form: (key: string) => [...registrationKeys.forms, key] as const,
  menopauseQuestions: ['registration', 'menopauseQuestions'] as const,
  config: ['registration', 'config'] as const,
};

export interface RegistrationFormData {
  key: string;
  data: any[];
}

export const useRegistration = () => {
  const queryClient = useQueryClient();

  // Get form data by key
  const getFormData = (key: string) => {
    return useQuery({
      queryKey: registrationKeys.form(key),
      queryFn: () =>
        makeRequest(
          'GET',
          `/items/form?filter={"key": {"_eq": "${key}"}}&fields=*,form_components.*,form_components.question_id.*,form_components.question_id.options.*,form_components.question_id.options.option_id.*,form_components.question_id.options.option_id.questions.*.*.*`
        ),
    });
  };

  // Get menopause questions
  const getMenopauseQuestions = () => {
    return useQuery({
      queryKey: registrationKeys.menopauseQuestions,
      queryFn: () =>
        makeRequest(
          'GET',
          '/items/form?filter[title][_contains]=Menopause&fields=form_components.question_id.question,Menopause&fields=form_components.question_id.id'
        ),
    });
  };

  // Get config (timer days)
  const getConfig = () => {
    return useQuery({
      queryKey: registrationKeys.config,
      queryFn: () => makeRequest('GET', '/items/config'),
    });
  };

  // Submit answers
  const submitAnswers = useMutation({
    mutationFn: (answers: any[]) => makeRequest('POST', '/items/answers', answers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });

  // Update user profile
  const updateUserProfile = useMutation({
    mutationFn: (data: any) => makeRequest('PATCH', '/users/me', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });

  // Submit menopause history
  const submitMenopauseHistory = useMutation({
    mutationFn: (data: any) =>
      makeRequest('POST', '/items/junction_directus_users_menopause_history', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });

  return {
    getFormData,
    getMenopauseQuestions,
    getConfig,
    submitAnswers,
    updateUserProfile,
    submitMenopauseHistory,
  };
}; 