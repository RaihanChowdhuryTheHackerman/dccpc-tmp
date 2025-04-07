// src/components/forms/contact-form.tsx
'use client'

import { FieldPath, useForm } from "react-hook-form";
import { z } from "zod";
import { ContactSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";

export default function ContactForm() {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      address: '',
    }
  });

  const onSubmit = (data: z.infer<typeof ContactSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/contact/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          toast({
            title: 'Message Sent Successfully!',
            description: 'We will get back to you soon.',
          });
          form.reset();
        } else if (res.status === 400) {
          const errors = await res.json();
          for (const key in errors) {
            const field = key as FieldPath<z.infer<typeof ContactSchema>>;
            form.setError(field, {
              message: (errors[key] as string[]).join(''),
            }, { shouldFocus: true });
          }

          toast({
            title: 'Validation Error',
            description: 'Please check the form details.',
            variant: 'destructive'
          });
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        toast({
          title: 'Error Sending Message',
          description: 'Please try again later or contact us directly.',
          variant: 'destructive'
        });
        console.error(err);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6'}>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel className="text-gray-700">Name*</FormLabel>
            <FormControl>
              <Input 
                type={'text'} 
                {...field} 
                className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                placeholder="Your full name"
              />
            </FormControl>
            <FormMessage className="text-xs mt-1"/>
          </FormItem>
        )} name={'name'}/>
        
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel className="text-gray-700">Email*</FormLabel>
            <FormControl>
              <Input 
                type={'email'} 
                {...field} 
                className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                placeholder="your.email@example.com"
              />
            </FormControl>
            <FormMessage className="text-xs mt-1"/>
          </FormItem>
        )} name={'email'}/>
        
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel className="text-gray-700">Phone</FormLabel>
            <FormControl>
              <Input 
                type={'tel'} 
                {...field} 
                className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                placeholder="+880 1XXX-XXXXXX"
              />
            </FormControl>
            <FormMessage className="text-xs mt-1"/>
          </FormItem>
        )} name={'phone'}/>
        
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel className="text-gray-700">Address</FormLabel>
            <FormControl>
              <Input 
                type={'text'} 
                {...field} 
                className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                placeholder="Your current address"
              />
            </FormControl>
            <FormMessage className="text-xs mt-1"/>
          </FormItem>
        )} name={'address'}/>
        
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel className="text-gray-700">Message*</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                className="rounded-md border-gray-300 focus:ring-primary focus:border-primary min-h-[120px]"
                placeholder="Write your message here..."
              />
            </FormControl>
            <FormMessage className="text-xs mt-1"/>
          </FormItem>
        )} name={'message'}/>
        
        <Button 
          type={'submit'} 
          className={'w-full bg-primary hover:bg-primary/90 transition-colors'} 
          size={'lg'}
          disabled={pending}
        >
          {pending ? (
            <>
              <RefreshCw className="animate-spin mr-2 w-4 h-4" />
              Sending...
            </>
          ) : (
            'Submit Message'
          )}
        </Button>
      </form>
    </Form>
  )
}