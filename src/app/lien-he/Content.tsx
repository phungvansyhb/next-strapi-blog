'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Adresse e-mail invalide' }),
  message: z
    .string()
    .min(10, { message: 'Le message doit contenir au moins 10 caractères' }),
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
      console.log('Formulaire soumis:', data);
      toast({
        title: 'Message envoyé',
        description: 'Nous vous répondrons dans les plus brefs délais.',
      });
      reset();
    } catch (error) {
      console.log((error as Error).message);
      toast({
        title: 'Erreur',
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-8 text-center">
          Contactez-nous
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
                Nom
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
                Message
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
              Envoyer
            </Button>
          </form>
          <div className="w-full sm:w-2/5 text-sm font-light text-gray-600 dark:text-gray-400 mb-8 sm:mb-0 order-1 sm:order-2">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Informations
            </h2>
            <p className="mb-6 text-sm">
              Notre équipe est à votre disposition pour répondre à toutes vos
              questions. N&apos;hésitez pas à nous contacter, nous nous efforçons de
              répondre dans les plus brefs délais.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gray-400" />
                <a
                  href="mailto:contact@gederooney.com"
                  className="hover:underline"
                >
                  contact@gederooney.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <p>Paris, France</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gray-400" />
                <p>+33 1 23 45 67 89</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
