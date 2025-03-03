import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { assessmentService } from '@/services/api';
import toast from 'react-hot-toast';
import { userKeys } from './useUser';

// Query keys
export const assessmentKeys = {
  all: ['assessments'] as const,
  questions: (key: string) => [...assessmentKeys.all, 'questions', key] as const,
  menopauseQuestions: () => [...assessmentKeys.all, 'menopauseQuestions'] as const,
  questionDetails: (id: string) => [...assessmentKeys.all, 'questionDetails', id] as const,
  config: () => [...assessmentKeys.all, 'config'] as const,
};

export const useAssessment = () => {
  const queryClient = useQueryClient();

  // Get assessment questions
  const getQuestions = (key: string) => {
    return useQuery({
      queryKey: assessmentKeys.questions(key),
      queryFn: () => assessmentService.getQuestions(key),
    });
  };

  // Get menopause questions
  const getMenopauseQuestions = () => {
    return useQuery({
      queryKey: assessmentKeys.menopauseQuestions(),
      queryFn: assessmentService.getMenopauseQuestions,
    });
  };

  // Get question details
  const getQuestionDetails = (questionId: string) => {
    return useQuery({
      queryKey: assessmentKeys.questionDetails(questionId),
      queryFn: () => assessmentService.getQuestionDetails(questionId),
      enabled: !!questionId, // Only run if questionId is provided
    });
  };

  // Get config (for timer days, etc.)
  const getConfig = () => {
    return useQuery({
      queryKey: assessmentKeys.config(),
      queryFn: assessmentService.getConfig,
    });
  };

  // Submit answers
  const submitAnswers = useMutation({
    mutationFn: assessmentService.submitAnswers,
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success('Answers submitted successfully');
    },
  });

  // Submit menopause history
  const submitMenopauseHistory = useMutation({
    mutationFn: assessmentService.submitMenopauseHistory,
    onSuccess: () => {
      // Invalidate user profile to update latest_menopause_history
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      toast.success('Menopause history submitted successfully');
    },
  });

  return {
    getQuestions,
    getMenopauseQuestions,
    getQuestionDetails,
    getConfig,
    submitAnswers,
    submitMenopauseHistory,
  };
};