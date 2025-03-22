// src/components/forms/membership-form.tsx
'use client'

import { FieldPath, useForm } from "react-hook-form";
import { z } from "zod";
import { MembershipSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { CheckCircle2, RefreshCw, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const problemSolvingExperienceLevels: string[] = [
  'None ( 0 <= Problem Solved )',
  'Newbie ( 0 < Problem Solved <= 100 )',
  'Beginner ( 1 * 10 ^ 2 < Problem Solved <= 3*10^2  + 50)',
  'Intermediate (  0b101011110 < Problem Solved <= 0b10000000000  )',
  'Advance ( −999998983  mod (10^9 + 7) < Problem Solved )'
];

export default function MembershipForm() {
  const [pending, startTransition] = useTransition();

  // Hopefully this is the new batch :3
  const newBatch = new Date().getFullYear() - 1999;

  const form = useForm<z.infer<typeof MembershipSchema>>({
    resolver: zodResolver(MembershipSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      education: 'CSE',
      batch: newBatch,
      roll: 1,
      problem_solving_experience: '',
      expectation: '',
      facebook: '',
      linkedin: '',
      github: '',
      transaction_id: '',
      image: null
    }
  });

  const onSubmit = (data: z.infer<typeof MembershipSchema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.set('image', data.image[0]);

    startTransition(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/members/`, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          }
        });

        if (res.ok) {
          toast({
            title: 'Welcome to DCC Programing Club!',
            description: 'Please follow the instructions provided in your mail.'
          });
          form.reset();
        } else if (res.status == 400) {
          const errors = await res.json();
          for (const key in errors) {
            const field = key as FieldPath<z.infer<typeof MembershipSchema>>;
            form.setError(field, {
              message: (errors[key] as string[]).join(''),
            }, {shouldFocus: true});
          }

          toast({
            title: 'Validation error!',
            variant: 'destructive'
          });
        }
      } catch (err) {
        toast({
          title: 'Something went wrong!',
          description: 'Please contact the club secretary.',
          variant: 'destructive'
        });
        console.log(err);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
        <div className="bg-primary/5 p-4 rounded-lg mb-6 border border-primary/10">
          <p className="text-sm text-gray-700 flex items-center">
            <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
            Fields marked with an asterisk (*) are required
          </p>
        </div>
        
        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-medium text-primary">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Name*</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    {...field} 
                    className="rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Your full name"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="name"/>
            
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Email*</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    {...field} 
                    className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                    placeholder="your.email@example.com"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="email"/>
            
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Phone*</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    {...field} 
                    className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="phone"/>
            
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Address*</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    {...field} 
                    className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                    placeholder="Your current address"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="address"/>
          </div>
        </div>
        
        {/* Academic Information Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-medium text-primary">Academic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <FormField render={({field}) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Education Level*</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2 mt-1"
                    >
                      <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200 hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="CSE" id="cse" className="text-primary" />
                        <FormLabel htmlFor="cse" className="font-normal cursor-pointer">
                          Computer Science and Engineering
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200 hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="HSC" id="hsc" className="text-primary" />
                        <FormLabel htmlFor="hsc" className="font-normal cursor-pointer">
                          Higher Secondary Certificate
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )} name="education"/>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <FormField render={({field}) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Batch*</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )} name="batch"/>
              
              <FormField render={({field}) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Roll*</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )} name="roll"/>
            </div>
          </div>
        </div>
        
        {/* Programming Experience Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-medium text-primary">Programming Experience</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Problem Solving Experience Level*</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="rounded-md border-gray-300 focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {problemSolvingExperienceLevels.map((level, index) => (
                        <SelectItem 
                          value={level} 
                          key={index}
                          className="hover:bg-primary/10 cursor-pointer"
                        >
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="problem_solving_experience"/>
            
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Expectations*</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    className="rounded-md border-gray-300 focus:ring-primary focus:border-primary min-h-[120px]"
                    placeholder="Tell us about your programming journey and what you expect from the club"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500 mt-1">
                  Tell us about your programming journey and what do you expect from the club?
                </FormDescription>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="expectation"/>
          </div>
        </div>
        
        {/* Social Links Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-medium text-primary">Social Links <span className="text-xs font-normal text-gray-500">(Optional)</span></h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Facebook</FormLabel>
                <FormControl>
                  <Input 
                    type="url" 
                    {...field} 
                    className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                    placeholder="https://facebook.com/username"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="facebook"/>
            
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">LinkedIn</FormLabel>
                <FormControl>
                  <Input 
                    type="url" 
                    {...field} 
                    className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                    placeholder="https://linkedin.com/in/username"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="linkedin"/>
            
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">GitHub</FormLabel>
                <FormControl>
                  <Input 
                    type="url" 
                    {...field} 
                    className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                    placeholder="https://github.com/username"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="github"/>
          </div>
        </div>
        
        {/* Payment and Photo Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-medium text-primary">Additional Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Transaction ID</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    {...field} 
                    className="rounded-md border-gray-300 focus:ring-primary focus:border-primary"
                    placeholder="Enter your payment transaction ID"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="transaction_id"/>
            
            <FormField render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Your Photo*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                      className="rounded-md border-gray-300 focus:ring-primary focus:border-primary hidden"
                      id="photo-upload"
                    />
                    <label 
                      htmlFor="photo-upload"
                      className="flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-md p-4 w-full cursor-pointer hover:bg-primary/5 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-primary" />
                      <span className="text-gray-700 text-sm truncate">
                        {field.value && field.value[0] ? field.value[0].name : "Click to upload formal photo"}
                      </span>
                    </label>
                  </div>
                </FormControl>
                <FormDescription className="text-xs text-gray-500 mt-1">
                  Maximum file size: 2MB (JPG or PNG only)
                </FormDescription>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )} name="image" />
          </div>
        </div>
        
        <div className="pt-8 flex justify-center">
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={pending}
            className="px-8 py-6 text-base font-medium transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] flex items-center justify-center gap-2 bg-primary"
          >
            {pending ? (
              <>
                <RefreshCw className="animate-spin w-5 h-5" />
                Processing...
              </>
            ) : (
              <>Submit Application</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}