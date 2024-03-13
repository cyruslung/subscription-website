import React, { useEffect, useCallback, useState, useRef } from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'
import axios from 'axios';
import Image from 'next/image';
import PX1Logo from '@/public/images/PX1_logo.png';
import PX1UI from '@/public/images/PX1_UI.png';
import MultiGPU from '@/public/images/Multi-GPU_fan_control.png';
import OCScanner from '@/public/images/New_OC_scanner.png';

const PX1 = () => {

    const [data, setData] = useState([]); 
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("http://localhost:8000/accordionData/");
            setData(result.data);
            console.log(result.data)
        };
        fetchData();
    }, []);

    return (
        <main>

            <section id="home" className="relative pt-28 md:pt-32 lg:pt-40" >
                <div className="container">
                    <div className="flex flex-wrap items-center -mx-4">
                        <div className="w-full md:w-1/2 lg:w-1/2 px-4">
                            <div className=" text-center max-w-3xl mx-auto " >
                                <div className="relative w-full sm:w-4/5 mx-auto px-4" >
                                    <Image src={PX1Logo} alt="px1 logo" layout="responsive" objectFit="contain" />
                                </div>
                                <p className=" text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed mx-auto mb-10 text-neutral-100 max-w-xl " >
                                    Multidisciplinary Web Template Built with Your Favourite Technology - HTML Bootstrap, Tailwind and React NextJS.
                                </p>
                                <ul className="flex flex-wrap items-center justify-center mb-10">
                                    <li>
                                        <a href="https://www.demo.com/precisionx1/" className=" py-4 px-6 sm:px-10 inline-flex items-center justify-center text-center text-white text-base bg-violet-500 hover:text-violet-300 hover:shadow-lg font-medium rounded-lg transition duration-300 ease-in-out " > Subscription </a>
                                    </li>
                                    <li>
                                        <a href="https://www.demo.com/precisionx1/" target="_blank" className=" text-base font-medium text-white py-4 px-6 sm:px-10 flex items-center hover:opacity-70 transition duration-300 ease-in-out " rel="noreferrer" > Learn more
                                            <span className="pl-2">
                                                <svg width="20" height="8" viewBox="0 0 20 8" className="fill-current" > <path d="M19.2188 2.90632L17.0625 0.343819C16.875 0.125069 16.5312 0.0938193 16.2812 0.281319C16.0625 0.468819 16.0312 0.812569 16.2188 1.06257L18.25 3.46882H0.9375C0.625 3.46882 0.375 3.71882 0.375 4.03132C0.375 4.34382 0.625 4.59382 0.9375 4.59382H18.25L16.2188 7.00007C16.0312 7.21882 16.0625 7.56257 16.2812 7.78132C16.375 7.87507 16.5 7.90632 16.625 7.90632C16.7812 7.90632 16.9375 7.84382 17.0312 7.71882L19.1875 5.15632C19.75 4.46882 19.75 3.53132 19.2188 2.90632Z" /> </svg>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="relative w-full md:w-1/2 lg:w-1/2 p-5">
                            <Image src={PX1UI} alt="px1-ui" layout="responsive" objectFit="contain" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="pt-120">
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="text-center mx-auto mb-15 lg:mb-12 max-w-xl">
                                <h2 className=" text-violet-500 font-bold text-3xl sm:text-4xl md:text-4xl mb-4 " > About </h2>
                                <p className=" text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-white " >
                                    There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center">
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <div className="text-center mt-8 mx-3 py-8 px-5  rounded-lg bg-black hover:bg-violet-900/40 ease-out duration-300">
                                <div className="mt-5">
                                    <h3 className="text-white font-semibold text-xl md:text-3xl">Multi-GPU Fan Control</h3>
                                    <p className="text-white mt-4">Lorem ipsum dolor sit amet, consetetur sadi aliquyam erat, sed diam voluptua. At vero eos accusam et justo duo dolores </p>
                                    <div className="relative p-1 mx-auto max-w-xs">
                                        <Image src={MultiGPU} alt="Multi-GPU Fan Control" layout="responsive" objectFit="contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <div className="text-center mt-8 mx-3 py-8 px-5 rounded-lg bg-black hover:bg-violet-900/40 ease-out duration-300">
                                <div className="mt-5">
                                    <h3 className="text-white font-semibold text-xl md:text-3xl">RGB LED</h3>
                                    <p className="text-white mt-4">Lorem ipsum dolor sit amet, consetetur sadi aliquyam erat, sed diam voluptua. At vero eos accusam et justo duo dolores </p>
                                    <div className="relative p-1 mx-auto max-w-xs">
                                        <Image src={OCScanner} alt="New OC Scanner" layout="responsive" objectFit="contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <div className="text-center mt-8 mx-3 py-8 px-5 rounded-lg bg-black hover:bg-violet-900/40 ease-out duration-300">
                                <div className="mt-5">
                                    <h3 className="text-white font-semibold text-xl md:text-3xl">Popular</h3>
                                    <p className="text-white mt-4">Lorem ipsum dolor sit amet, consetetur sadi aliquyam erat, sed diam voluptua. At vero eos accusam et justo duo dolores </p>
                                    <div className="relative p-1 mx-auto max-w-xs">
                                        <Image src={MultiGPU} alt="Multi-GPU Fan Control" layout="responsive" objectFit="contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="faq" className=" pt-20 lg:pt-32 pb-12 lg:pb-24 relative z-20 overflow-hidden " >
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="text-center mx-auto mb-16 lg:mb-12 max-w-2xl">
                                <h2 className=" text-violet-500 le- font-bold text-3xl sm:text-4xl md:text-5xl mb-4 " >
                                    Any Questions? Answered
                                </h2>
                                <p className=" text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-white " >
                                    There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        {data.map((item: any) => (
                            <Accordion allowMultiple className="w-full md:w-1/2 lg:w-1/2 px-4 mb-8" key={item.id}>
                                <AccordionItem className="border-t-0 border-neutral-700" style={{borderTop: '0', borderColor: 'rgb(64 64 64)'}}>
                                    <h2 className="text-violet-300 border-l-4 border-violet-700">
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left'>
                                                {item.title}
                                            </Box>
                                            <AccordionIcon className="text-violet-300" />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} className="text-neutral-300 border-l-4 border-neutral-700" style={{color: 'rgb(212 212 212)', borderColor: 'rgb(64 64 64)'}}>
                                        {item.content}
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
};

export default PX1;
