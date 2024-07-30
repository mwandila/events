

"use client"
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { FcGoogle } from 'react-icons/fc';

const userTypes = ["User", "Organizer", "Vendor"] as const;

const registerSchema = z.object({
  userType: z.enum(userTypes),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterSchema = z.infer<typeof registerSchema>;

const userTypeToRole = {
  User: "USER",
  Organizer: "ORGANIZER",
  Vendor: "VENDOR",
} as const;

const PasswordStrengthMeter: React.FC<{ password: string }> = ({ password }) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let newStrength = 0;
    if (password.length > 6) newStrength++;
    if (password.match(/[A-Z]/)) newStrength++;
    if (password.match(/[0-9]/)) newStrength++;
    if (password.match(/[^A-Za-z0-9]/)) newStrength++;
    setStrength(newStrength);
  }, [password]);

  const getColor = () => {
    if (strength < 2) return "red";
    if (strength < 3) return "orange";
    return "green";
  };

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
      <div 
        className="h-full rounded-full transition-all duration-300"
        style={{ 
          width: `${(strength / 4) * 100}%`,
          backgroundColor: getColor()
        }}
      />
    </div>
  );
};

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: "User",
      name: '',
      email: '',
      password: '',
    }
  });

  const userType = form.watch("userType");

  const getNameLabel = () => {
    switch (userType) {
      case "Organizer": return "Org. Name";
      case "Vendor": return "Business Name";
      default: return "Name";
    }
  };

  const onSubmit = (values: RegisterSchema) => {
    setError('');
    setSuccess('');
    
    const submitData = {
      ...values,
      role: userTypeToRole[values.userType],
    };

    register(submitData)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <div className="flex">
        <div className="w-2/3 pr-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex space-x-2">
              {userTypes.map((type) => (
                <label key={type} className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-3 w-3"
                    {...form.register("userType")}
                    value={type}
                  />
                  <span className="ml-1 text-xs">{type}</span>
                </label>
              ))}
            </div>

            <div>
              <input
                {...form.register("name")}
                placeholder={getNameLabel()}
                className="block w-full px-3 py-1 text-sm bg-blue-50 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <input
                {...form.register("email")}
                placeholder="Email"
                className="block w-full px-3 py-1 text-sm bg-white border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <input
                type="password"
                {...form.register("password")}
                placeholder="Password"
                className="block w-full px-3 py-1 text-sm bg-blue-50 border border-gray-300 rounded-md"
              />
              <PasswordStrengthMeter password={form.watch("password")} />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <button
              type="submit"
              className="w-full py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create account
            </button>
          </form>
        </div>
        <div className="w-1/3 flex flex-col justify-center">
          <button
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
          >
            <FcGoogle className="mr-2" size={20} />
            Login with Google
          </button>
        </div>
      </div>
    </CardWrapper>
  );
}