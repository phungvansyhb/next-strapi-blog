'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';
import {appInfo} from "@/constants/sitemetaData";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Vui lòng nhập tối thiếu 2 ký tự' }),
  email: z.string().email({ message: 'Vui lòng nhập đúng địa chỉ email ' }),
  message: z
    .string()
    .min(10, { message: 'Vui lòng nhập tối thiếu 10 ký tự' }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPageContent() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Ici, vous ajouteriez la logique pour envoyer le message
      toast({
        title: 'Tin nhắn đã được gửi đi',
        description: 'Chúng tôi sẽ phản hồi lại bạn sớm nhất có thể',
      });
      reset();
    } catch (error) {
      toast({
        title: 'Đã xảy ra lỗi',
        description: "Đã xảy ra lỗi trong quá trình gửi tin nhắn",
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-4xl text-center font-semibold mb-6">
          Liên hệ với chúng tôi
        </h1>
        <div className="flex flex-col sm:flex-row sm:space-x-8 lg:items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-full sm:w-3/5 order-2 sm:order-1"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
              >
                Bạn là
              </label>
              <Input id="name" {...register('name')} className="w-full" />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
              >
                Lời nhắn
              </label>
              <Textarea
                id="message"
                {...register('message')}
                className="w-full"
                rows={4}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Gửi
            </Button>
          </form>
          <div className="w-full sm:w-2/5 text-sm font-light text-gray-600 dark:text-gray-400 mb-8 sm:mb-0 order-1 sm:order-2">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Thông tin liên hệ
            </h2>
            <p className="mb-6 text-sm">
              Đội ngũ của chúng tôi luôn sẵn sàng trả lời tất cả các câu hỏi của bạn. Đừng ngần ngại liên hệ với chúng tôi, chúng tôi sẽ cố gắng trả lời trong thời gian sớm nhất.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gray-400" />
                <a
                  href={`mailto:${appInfo.email}`}
                  className="hover:underline"
                >
                  {appInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <p>{appInfo.location}</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gray-400" />
                <p>{appInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
