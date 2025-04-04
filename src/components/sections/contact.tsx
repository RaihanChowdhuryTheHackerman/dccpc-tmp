// src/components/sections/contact.tsx
'use client'

import Link from "next/link";
import ContactForm from "@/components/forms/contact-form";
import { MailIcon, MapPin, PhoneCall, Clock, ArrowUpRight, Facebook } from "lucide-react";
import { Fade, Slide } from "react-awesome-reveal";

export default function Contact() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary opacity-5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-5 rounded-full -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <Fade triggerOnce>
            <span className="inline-flex items-center bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              <MailIcon className="w-4 h-4 mr-2" />
              <span>Get In Touch</span>
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Contact <span className="text-primary">Us</span>
            </h2>
            
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or want to join our programming community? Reach out to us directly or fill out the form below.
            </p>
          </Fade>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Slide direction="left" triggerOnce>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="bg-primary text-white p-5">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <p className="text-white/80 mt-1">Reach out and connect with us</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <MailIcon size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Email</p>
                      <Link href="mailto:dccpc.official@gmail.com" className="text-primary hover:underline flex items-center group">
                        dccpc.official@gmail.com
                        <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <PhoneCall size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Phone</p>
                      <Link href="tel:+8801790616537" className="text-primary hover:underline flex items-center group">
                        +8801790616537
                        <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Facebook size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Official Facebook Page</p>
                      <Link 
                        href="https://www.facebook.com/dccProgrammingClub" 
                        target="_blank"
                        className="text-primary hover:underline flex items-center group"
                      >
                        DCC Programming Club
                        <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Club Hours</p>
                      <p className="text-gray-600">
                        Sunday - Thursday ( 10:00 AM - 4:00 PM )
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Address</p>
                      <p className="text-gray-600">
                        Club Room: 210, Professor Md. Hafiz Uddin Building<br />
                        Dhaka City College Campus - 2<br />
                        60 Rd 3A, Dhaka 1205
                      </p>
                      <Link 
                        href="https://maps.app.goo.gl/XJavgL632KaBvnUx9" 
                        target="_blank"
                        className="text-primary text-sm mt-1 hover:underline inline-flex items-center group"
                      >
                        Get directions
                        <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity z-10"></div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d774.1576501603796!2d90.3744814056433!3d23.739682486009166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf000f67f37d%3A0x9b20a8691ad3d551!2sDhaka%20City%20College%20Campus-2!5e0!3m2!1sen!2sbd!4v1735328861651!5m2!1sen!2sbd"
                      allowFullScreen={true}
                      loading="lazy"
                      className="w-full h-[240px] rounded-md border border-gray-200"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          
          <Slide direction="right" triggerOnce>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="bg-primary text-white p-5">
                <h3 className="text-xl font-semibold">Send a Message</h3>
                <p className="text-white/80 mt-1">We&apos;d love to hear from you</p>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Have a question or want to learn more about the club? Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
                <ContactForm />
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
}