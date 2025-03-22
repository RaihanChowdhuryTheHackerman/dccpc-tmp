'use client'

import {useForm} from "react-hook-form";
import {z} from "zod";
import {ContactSchema} from "@/lib/validations";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export default function ContactForm() {
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
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6'}>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type={'text'} {...field}/>
            </FormControl>
            <FormDescription/>
            <FormMessage/>
          </FormItem>
        )} name={'name'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type={'email'} {...field}/>
            </FormControl>
            <FormDescription/>
            <FormMessage/>
          </FormItem>
        )} name={'email'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input type={'tel'} {...field}/>
            </FormControl>
            <FormDescription/>
            <FormMessage/>
          </FormItem>
        )} name={'phone'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input type={'text'} {...field}/>
            </FormControl>
            <FormDescription/>
            <FormMessage/>
          </FormItem>
        )} name={'address'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea {...field}/>
            </FormControl>
            <FormDescription/>
            <FormMessage/>
          </FormItem>
        )} name={'message'}/>
        <Button type={'submit'} className={'w-full'} size={'lg'}>Submit</Button>
      </form>
    </Form>
  )
}