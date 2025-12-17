export interface PasswordCriteria {
  minLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface PasswordState {
  value: string;
  score: number; // 0 to 5
  criteria: PasswordCriteria;
  hash: string;
}

export interface GeminiResponse {
  content: string;
  type: 'advice' | 'password';
}

export enum StrengthLevel {
  Weak = 'Weak',
  Fair = 'Fair',
  Good = 'Good',
  Strong = 'Strong',
  Excellent = 'Excellent'
}