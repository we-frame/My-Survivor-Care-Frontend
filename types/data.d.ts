// Interface for the overall register form values
export interface RegisterFormValuesTypes {
  // Object containing background information form values
  BackgroundInformation: BackgroundInformationFormValues;
  // Object containing medical information form values
  MedicalInformation: MedicalInformationFormValues;
  // Object containing Menopause Assessment information form values
  MenopauseAssessment: MenopauseAssessmentTypes;
}

// Interface for background information form values
export interface BackgroundInformationFormValues {
  name: string;
  dob: string;
  preferred_pronoun: string;
  ethnic_group: string;
  postcode: number;
}

// Interface for medical information form values
export interface MedicalInformationFormValues {
  cancer_treatment: string;
  removal_ovaries: string;
  removal_uterus: string;
  treatment_types: string[];
  cancer_type: string;
  type_of_breast_cancer: string;
  other_cancers: string;
}

export interface MenopauseAssessmentTypes {
  work: number;
  social_activities: number;
  leisure_activities: number;
  sleep: number;
  mood: number;
  concentration: number;
  relations_with_others: number;
  sexuality: number;
  enjoyment_of_life: number;
  quality_of_life: number;
}
