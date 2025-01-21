'use client'

import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/app/context/AuthContext'
import { LoadingButton } from '@/components/ui/LoadingButton'

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  businessType: z.string().min(1, {
    message: "Please select a business type.",
  }),
  otherBusinessType: z.string().optional(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
  tokens: z.number().min(0, {
    message: "Tokens must be at least 0.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})
interface ModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-4">{message}</p>
        <Button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </Button>
      </div>
    </div>
  );
};
export default function SignUp() {
  const t = useTranslations("signup")
  const {signup}=useAuth()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      businessType: "",
      otherBusinessType: "",
      password: "",
      confirmPassword: "",
      terms: false,
      tokens:0,
      analytics: {
        January: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        February: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        March: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        April: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        May: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        June: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        July: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        August: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        September: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        October: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        November: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        December: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
      },
      smsByState: {
        lagos: {
          totalNumberOfSms: 0,

        },
        abuja: {
          totalNumberOfSms: 0,

        },
        portHarcourt: {
          totalNumberOfSms: 0,

        },
        // ... add other states as needed
      },
      shippedSms: false,
      outForDeliverySms: false,
      readyToBePickedSms: false,
      totalOrders:0,
      totalOrdersReturned:0,
    },
  })

  const businessTypes = [
    t('businessTypes.ecommerce'),
    t('businessTypes.retail'),
    t('businessTypes.dropshipping'),
    t('businessTypes.marketplace'),
    t('businessTypes.socialCommerce'),
    t('businessTypes.other')
  ]

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState({ title: '', message: '' }); // State for modal content

  async function onSubmit(values: z.infer<typeof formSchema>) {
     const user=await signup(values)
     if(user){
      console.log('Sign up successful');
      router.push('/dashboard');
      return;
     }else{
      console.error('Sign up error:');
      setModalContent({
        title: 'Sign Up Error',
        message:  'An error occurred during sign up. Please try again.',
      });
      setIsModalOpen(true); // Open the modal
     }

  }

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" />
          {t('backToSignIn')}
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{t('createAccount')}</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('createAccount')}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t('getStarted')}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('firstName')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('phoneNumber')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('companyName')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('businessType')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('businessType') === t('businessTypes.other') && (
                  <FormField
                    control={form.control}
                    name="otherBusinessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('pleaseSpecify')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('password')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('confirmPassword')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {t('terms')}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <LoadingButton type="submit" className="w-full" loading={useForm().formState.isLoading}>
                {t('createAccountButton')}
              </LoadingButton>
            </form>
          </Form>
        </div>
        {isModalOpen && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onClose={handleCloseModal}
        />
      )}
      </div>
    </div>
  )
}

