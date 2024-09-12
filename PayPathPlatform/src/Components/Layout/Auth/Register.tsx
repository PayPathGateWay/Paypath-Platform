import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { PhoneInput } from '../Utils/PhoneInput';
import UploadFile from '../Utils/UploadFile';
import { motion } from 'framer-motion';
import { formSchema, validationSchema } from '@/Utils/FromUtils';

const Register: React.FC = () => {

  // ! when press next the data should be wipe of the UI but saved 
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isValid, setIsValid] = useState<boolean | undefined>(false);
  const [file, setFile] = useState<File | null>(null);  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      MerchantName: '',
      PhoneNumber: '',
      platformName: '',
      PlatformLogo: null,
    },
  });

  const { handleSubmit, control, watch, setValue } = form;
  const formValues = watch();

  const validateForm = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log(error.errors);
        return false;
      }
    }
  };

  const onFileChange = (selectedFile: File ) => {
    setFile(selectedFile);
    setValue('PlatformLogo', selectedFile); // Update form value with the file
  };

  useEffect(() => {
    const checkFormValidity = async () => {
      const isFormValid = await validateForm();
      setIsValid(isFormValid);
    };
    checkFormValidity();
  }, [formValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (step === 0) {
      setStep(1);
    } else {
      console.log('Form submitted:', values);
      console.log('File submitted:', values.PlatformLogo.name, values.PlatformLogo.type);

    }
  };

  const handleLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%] max-w-[600px] space-y-10">
        <div className="text-center">
          <h2 className="text-white text-3xl font-semibold mb-4">Create a merchant account</h2>
          <p className="text-gray-400 mb-6">Please enter your details to register.</p>
        </div>

        <Form {...form}>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {step === 0 ? (
              <>
                <FormField
                  control={control}
                  name="MerchantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Merchant Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#20242D] rounded-xl border-[#5B657E] shadow-md focus:shadow-lg text-white placeholder:text-[#5B657E] focus:outline-none p-[22px] w-[450px]"
                          placeholder="Merchant Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="PhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput {...field} placeholder="Phone Number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="bg-[#20242D] rounded-xl border-[#5B657E] shadow-md focus:shadow-lg text-white placeholder:text-[#5B657E] focus:outline-none p-[22px] w-[450px]"
                          placeholder="Email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          className="bg-[#20242D] rounded-xl border-[#5B657E] shadow-md focus:shadow-lg text-white placeholder:text-[#5B657E] focus:outline-none p-[22px] w-[450px]"
                          placeholder="Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  <Button
                    type="button"
                    className={`w-[450px] ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'} text-white`}
                    onClick={() => setStep(1)}
                    disabled={!isValid}
                  >
                    Next
                  </Button>
                </div>
              </>
            ) : (
              <>
                <FormField
                  control={control}
                  name="platformName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Platform Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#20242D] rounded-xl border-[#5B657E] shadow-md focus:shadow-lg text-white placeholder:text-[#5B657E] focus:outline-none p-[22px] w-[450px]"
                          placeholder="Platform Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="PlatformLogo"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-white">Platform Logo</FormLabel>
                      <FormControl>
                        <UploadFile onFileChange={onFileChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  <Button type="submit" className="w-[450px] bg-blue-600 hover:bg-blue-700 text-white">
                    Register
                  </Button>
                </div>
              </>
            )}
          </motion.form>
        </Form>

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button onClick={handleLogin} className="text-blue-500 hover:underline">
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
