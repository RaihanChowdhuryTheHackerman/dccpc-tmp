'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {LoginSchema} from "@/lib/validations";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useTransition} from "react";

export default function Login() {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  return (
    <main className={'min-h-screen flex justify-center items-center'}>
      <Card className={'w-full max-w-lg'}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Access admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-6'}>
              <FormField render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input autoFocus={true} type={'email'} {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )} name={'email'}/>
              <FormField render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type={'password'} {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )} name={'password'}/>
              <Button
                type={'submit'}
                disabled={pending}
                size={'lg'} className={'w-full'}>Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link className={'text-primary'} href={'/'}>Goto home page.</Link>
        </CardFooter>
      </Card>
    </main>
  )
}