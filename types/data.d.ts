export interface RegisterFormValuesTypes {
  BackgroundInformation: BackgroundInformationFormValues;
  MedicalInformation: MedicalInformationFormValues;
}

export interface BackgroundInformationFormValues {
  name: string;
  dob: string;
  preferred_pronoun: string;
  ethnic_group: string;
  postcode: number;
}

export interface MedicalInformationFormValues {
  cancer_treatment: string;
  removal_ovaries: string;
  removal_uterus: string;
  treatment_types: string[];
}
