import React from "react";
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Tab } from '@headlessui/react'

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const TabList = () => {
    return (
        <Tab.List className="flex flex-col rounded-md bg-neutral-900/70">
            <Tab
                aria-orientation="vertical"
                className={({ selected }) =>
                    classNames(
                        'w-full flex items-center justify-between rounded-lg p-5 text-base font-medium leading-5 text-neutral-500',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-neutral-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white shadow'
                            : 'text-neutral-100 hover:bg-white/[0.12] hover:text-white'
                    )
                }
            >
                Account info
                <ChevronUpIcon className='rotate-180 sm:rotate-90 transform h-5 w-5 text-neutral-400' />
            </Tab>
            <Tab
                aria-orientation="vertical"
                className={({ selected }) =>
                    classNames(
                        'w-full flex items-center justify-between rounded-lg p-5 text-base font-medium leading-5 text-neutral-500',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-neutral-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white shadow'
                            : 'text-neutral-100 hover:bg-white/[0.12] hover:text-white'
                    )
                }
            >
                Subscription
                <ChevronUpIcon className='rotate-180 sm:rotate-90 transform h-5 w-5 text-neutral-400' />
            </Tab>
            <Tab
                aria-orientation="vertical"
                className={({ selected }) =>
                    classNames(
                        'w-full flex items-center justify-between rounded-lg p-5 text-base font-medium leading-5 text-neutral-500',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-neutral-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white shadow'
                            : 'text-neutral-100 hover:bg-white/[0.12] hover:text-white'
                    )
                }
            >
                Order History
                <ChevronUpIcon className='rotate-180 sm:rotate-90 transform h-5 w-5 text-neutral-400' />
            </Tab>
            <Tab
                aria-orientation="vertical"
                className={({ selected }) =>
                    classNames(
                        'w-full flex items-center justify-between rounded-lg p-5 text-base font-medium leading-5 text-neutral-500',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-neutral-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white shadow'
                            : 'text-neutral-100 hover:bg-white/[0.12] hover:text-white'
                    )
                }
            >
                Devices
                <ChevronUpIcon className='rotate-180 sm:rotate-90 transform h-5 w-5 text-neutral-400' />
            </Tab>
        </Tab.List>
    );
};

export default TabList;