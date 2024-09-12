import { z } from 'zod';
import * as yup from 'yup';


export const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
        .matches(/[a-z]/, 'Password must include at least one lowercase letter')
        .matches(/[0-9]/, 'Password must include at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must include at least one special character')
        .required('Password is required'),
    MerchantName: yup.string().required('Merchant name is required'),
    PhoneNumber: yup.string().required('Phone number is required'),
});



export const formSchema = z.object({
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters.' })
        .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter.' })
        .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter.' })
        .regex(/[0-9]/, { message: 'Password must include at least one number.' })
        .regex(/[^a-zA-Z0-9]/, { message: 'Password must include at least one special character.' }),
    email: z
        .string()
        .email({ message: 'Invalid email address.' })
        .min(5, { message: 'Email must be at least 5 characters.' }),
    MerchantName: z
        .string()
        .min(3, { message: 'MerchantName must be at least 3 characters.' })
        .max(20, { message: 'MerchantName must be at most 20 characters.' }),
    platformName: z
        .string()
        .min(3, { message: 'Platform Name must be at least 3 characters.' })
        .max(20, { message: 'Platform Name must be at most 20 characters.' }),
    PlatformLogo: z
        .custom<File>((v) => v instanceof File, {
            message: 'Logo is required',
        }),
    PhoneNumber: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format.' }),
});