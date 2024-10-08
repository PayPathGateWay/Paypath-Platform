import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SparkleButton from '@/Components/Common/SparkleButton';
import useAuth from '@/hooks/useAuth';

const formSchema = z.object({
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
});

const Login: React.FC | NavigateFunction = () => {

  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = () => {
    navigate('/auth/register'); // Navigate to the register page
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.email === undefined, values.password === undefined) {

    }
    else {
      try {
        await login(values)
        navigate('/dashboard');
        
      } catch (err) {
        console.error('Login failed:', err);
      }
      setIsClicked(true);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[420px] space-y-10">
        <div className="text-center">
          <h2 className="text-white text-3xl font-semibold mb-4">Log in to your account</h2>
          <p className="text-gray-400 mb-6">Welcome back! Please enter your details.</p>
        </div>

        {/* {error && (<h1>{error}</h1>)}
        {isLoading && (<h1>Loaaaaaading</h1>)} */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#20242D] rounded-xl border-[#5B657E] shadow-md focus:shadow-lg text-white placeholder:text-[#5B657E] focus:outline-none p-[22px] w-[420px]"
                      placeholder="example@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="bg-[#20242D] rounded-xl border-[#5B657E] shadow-md focus:shadow-lg text-white placeholder:text-[#5B657E] focus:outline-none p-[22px] w-[420px]"
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SparkleButton onClick={onSubmit} isClicked={isClicked} title={true} />

          </form>
        </Form>

        <div className="text-center mt-4">
          <p className="text-gray-400 text-center">Don't have an account?
            <span onClick={handleRegister} className="text-blue-500 cursor-pointer"> Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
