import * as Yup from 'yup';

export const employeeValidationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(15).required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  employeeId: Yup.string().min(4).required('Employee ID is required'),
  mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Mobile is required'),
  jobRole: Yup.string().required('Job Role is required'),
});
