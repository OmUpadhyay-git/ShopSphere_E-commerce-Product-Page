import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const signupSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneYup(passwordSchema => passwordSchema.test('value', 'Passwords must match', (value) => value === passwordSchema.parent!.password))
    .required('Confirm password is required'),
});

export const passwordResetSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

export const checkoutSchema = yup.object({
  fullName: yup.string().required('Full name is required').min(2, 'Full name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  address: yup.string().required('Address is required').min(5, 'Address must be at least 5 characters'),
  city: yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
  postalCode: yup.string().required('Postal code is required').min(3, 'Postal code must be at least 3 characters'),
  country: yup.string().required('Country is required').min(2, 'Country must be at least 2 characters'),
});

export const productSearchSchema = yup.object({
  query: yup.string().max(100, 'Search query must not exceed 100 characters'),
  category: yup.string(),
  minPrice: yup.number().min(0, 'Minimum price must be positive'),
  maxPrice: yup.number().min(0, 'Maximum price must be positive'),
});