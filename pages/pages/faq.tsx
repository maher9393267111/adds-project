import Link from 'next/link';
import { useState, useEffect } from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '@/store';

const Faq = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('FAQ'));
    });
    const [activeTab, setActiveTab] = useState<String>('general');
    const [active1, setActive1] = useState<any>(1);
    const [active2, setActive2] = useState<any>(1);

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    return (
        <div>
            <div className="relative rounded-t-md bg-primary-light bg-[url('/assets/images/knowledge/pattern.png')] bg-contain bg-left-top bg-no-repeat px-5 py-10 dark:bg-black md:px-10">
                <div className="absolute -bottom-1 -end-6 hidden text-[#DBE7FF] rtl:rotate-y-180 dark:text-[#1B2E4B] lg:block xl:end-0">
                    <img src={isDark ? '/assets/images/faq/faq-dark.svg' : '/assets/images/faq/faq-light.svg'} alt="faqs" className="w-56 object-cover xl:w-80" />
                </div>
                <div className="relative">
                    <div className="flex flex-col items-center justify-center sm:-ms-32 sm:flex-row xl:-ms-60">
                        <div className="mb-2 flex gap-1 text-end text-base leading-5 sm:flex-col xl:text-xl">
                            <span>It's free </span>
                            <span>For everyone</span>
                        </div>
                        <div className="me-4 ms-2 hidden text-[#0E1726] rtl:rotate-y-180 dark:text-white sm:block">
                            <svg width="111" height="22" viewBox="0 0 116 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 xl:w-28">
                                <path
                                    d="M0.645796 11.44C0.215273 11.6829 0.0631375 12.2287 0.305991 12.6593C0.548845 13.0898 1.09472 13.2419 1.52525 12.9991L0.645796 11.44ZM49.0622 20.4639L48.9765 19.5731L48.9765 19.5731L49.0622 20.4639ZM115.315 2.33429L105.013 3.14964L110.87 11.6641L115.315 2.33429ZM1.52525 12.9991C10.3971 7.99452 17.8696 10.3011 25.3913 13.8345C29.1125 15.5825 32.9505 17.6894 36.8117 19.2153C40.7121 20.7566 44.7862 21.7747 49.148 21.3548L48.9765 19.5731C45.0058 19.9553 41.2324 19.0375 37.4695 17.5505C33.6675 16.0481 30.0265 14.0342 26.1524 12.2143C18.4834 8.61181 10.3 5.99417 0.645796 11.44L1.52525 12.9991ZM49.148 21.3548C52.4593 21.0362 54.7308 19.6545 56.4362 17.7498C58.1039 15.8872 59.2195 13.5306 60.2695 11.3266C61.3434 9.07217 62.3508 6.97234 63.8065 5.35233C65.2231 3.77575 67.0736 2.6484 69.8869 2.40495L69.7326 0.62162C66.4361 0.906877 64.1742 2.26491 62.475 4.15595C60.8148 6.00356 59.703 8.35359 58.6534 10.5568C57.5799 12.8105 56.5678 14.9194 55.1027 16.5557C53.6753 18.1499 51.809 19.3005 48.9765 19.5731L49.148 21.3548ZM69.8869 2.40495C72.2392 2.2014 75.0889 2.61953 78.2858 3.35001C81.4816 4.08027 84.9116 5.09374 88.4614 6.04603C91.9873 6.99189 95.6026 7.86868 99.0694 8.28693C102.533 8.70483 105.908 8.67299 108.936 7.75734L108.418 6.04396C105.72 6.85988 102.621 6.91239 99.2838 6.50981C95.9496 6.10757 92.4363 5.25904 88.9252 4.31715C85.4382 3.38169 81.9229 2.34497 78.6845 1.60499C75.4471 0.865243 72.3735 0.393097 69.7326 0.62162L69.8869 2.40495Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <div className="mb-2 text-center text-2xl font-bold dark:text-white md:text-5xl">FAQs</div>
                    </div>
                    <p className="mb-9 text-center text-base font-semibold">Search instant answers & questions asked by popular users</p>
                    <form action="" method="" className="mb-6">
                        <div className="relative mx-auto max-w-[580px]">
                            <input type="text" placeholder="Ask a question" className="form-input py-3 ltr:pr-[100px] rtl:pl-[100px]" />
                            <button type="button" className="btn btn-primary absolute top-1 shadow-none ltr:right-1 rtl:left-1">
                                Search
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-wrap items-center justify-center gap-2 font-semibold text-[#2196F3] sm:gap-5">
                        <div className="whitespace-nowrap font-medium text-black dark:text-white">Popular topics :</div>
                        <div className="flex items-center justify-center gap-2 sm:gap-5">
                            <Link href="#" className="duration-300 hover:underline">
                                Sales
                            </Link>
                            <Link href="#" className="duration-300 hover:underline">
                                Charts
                            </Link>
                            <Link href="#" className="duration-300 hover:underline">
                                Finance
                            </Link>
                            <Link href="#" className="duration-300 hover:underline">
                                Trending
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-12 flex items-center rounded-b-md bg-[#DBE7FF] dark:bg-[#141F31]">
                <ul className="mx-auto flex items-center gap-5 overflow-auto whitespace-nowrap px-3 py-4.5 xl:gap-8">
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                ${activeTab === 'general' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                opacity="0.5"
                                d="M13.3332 2.6665H18.6665C23.6948 2.6665 26.209 2.6665 27.7711 4.2286C29.3332 5.7907 29.3332 8.30486 29.3332 13.3332V14.6665C29.3332 15.402 29.3332 16.7324 29.3245 17.3332H2.67519C2.6665 16.7324 2.6665 15.402 2.6665 14.6665V13.3332C2.6665 8.30486 2.6665 5.7907 4.2286 4.2286C5.7907 2.6665 8.30486 2.6665 13.3332 2.6665Z"
                                fill="currentColor"
                            />
                            <path
                                d="M10.646 23.3335C6.86021 23.3335 4.96734 23.3335 3.79125 22.1619C3.02926 21.4029 2.76097 20.344 2.6665 18.6668V17.3335H29.3332V18.6668C29.2387 20.344 28.9704 21.4029 28.2084 22.1619C27.0323 23.3335 25.1395 23.3335 21.3537 23.3335H17.0037V28.6668H21.3537C21.9081 28.6668 22.3576 29.1145 22.3576 29.6668C22.3576 30.2191 21.9081 30.6668 21.3537 30.6668H10.646C10.0916 30.6668 9.64212 30.2191 9.64212 29.6668C9.64212 29.1145 10.0916 28.6668 10.646 28.6668H14.996V23.3335H10.646Z"
                                fill="currentColor"
                            />
                        </svg>

                        <h5 className="font-bold text-black dark:text-white">General</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                ${activeTab === 'quick-support' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('quick-support')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15.9998" cy="7.99984" r="5.33333" fill="currentColor" />
                            <path
                                opacity="0.5"
                                d="M26.6668 23.3335C26.6668 26.6472 26.6668 29.3335 16.0002 29.3335C5.3335 29.3335 5.3335 26.6472 5.3335 23.3335C5.3335 20.0198 10.1091 17.3335 16.0002 17.3335C21.8912 17.3335 26.6668 20.0198 26.6668 23.3335Z"
                                fill="currentColor"
                            />
                        </svg>

                        <h5 className="font-bold text-black dark:text-white">Quick Support</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                ${activeTab === 'free-updates' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('free-updates')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.2296 27.4907C13.5704 28.7191 14.7408 29.3333 15.9998 29.3333V16L3.51719 9.43018C3.49882 9.45971 3.48077 9.48953 3.46303 9.51965C2.6665 10.8723 2.6665 12.5555 2.6665 15.922V16.078C2.6665 19.4444 2.6665 21.1277 3.46303 22.4803C4.25956 23.833 5.69401 24.5858 8.5629 26.0913L11.2296 27.4907Z"
                                fill="currentColor"
                            />
                            <path
                                opacity="0.7"
                                d="M23.4367 5.90853L20.77 4.50913C18.4292 3.28071 17.2588 2.6665 15.9997 2.6665C14.7407 2.6665 13.5703 3.28071 11.2295 4.50912L8.56279 5.90853C5.75778 7.38053 4.32404 8.13292 3.51709 9.43002L15.9997 15.9998L28.4824 9.43002C27.6754 8.13292 26.2417 7.38054 23.4367 5.90853Z"
                                fill="currentColor"
                            />
                            <path
                                opacity="0.5"
                                d="M28.5368 9.51965C28.5191 9.48953 28.501 9.45971 28.4826 9.43018L16 16V29.3333C17.259 29.3333 18.4294 28.7191 20.7703 27.4907L23.4369 26.0913C26.3058 24.5858 27.7403 23.833 28.5368 22.4803C29.3333 21.1277 29.3333 19.4444 29.3333 16.078V15.922C29.3333 12.5555 29.3333 10.8723 28.5368 9.51965Z"
                                fill="currentColor"
                            />
                        </svg>

                        <h5 className="font-bold text-black dark:text-white">Free Updates</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                ${activeTab === 'pricing' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('pricing')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                opacity="0.5"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M29.3332 15.9998C29.3332 23.3636 23.3636 29.3332 15.9998 29.3332C8.63604 29.3332 2.6665 23.3636 2.6665 15.9998C2.6665 8.63604 8.63604 2.6665 15.9998 2.6665C23.3636 2.6665 29.3332 8.63604 29.3332 15.9998Z"
                                fill="currentColor"
                            />
                            <path
                                d="M17 8C17 7.44772 16.5523 7 16 7C15.4477 7 15 7.44772 15 8V8.42231C12.8261 8.81156 11 10.4448 11 12.6667C11 15.2229 13.417 17 16 17C17.8353 17 19 18.2076 19 19.3333C19 20.459 17.8353 21.6667 16 21.6667C14.1647 21.6667 13 20.459 13 19.3333C13 18.781 12.5523 18.3333 12 18.3333C11.4477 18.3333 11 18.781 11 19.3333C11 21.5552 12.8261 23.1884 15 23.5777V24C15 24.5523 15.4477 25 16 25C16.5523 25 17 24.5523 17 24V23.5777C19.1739 23.1884 21 21.5552 21 19.3333C21 16.7771 18.583 15 16 15C14.1647 15 13 13.7924 13 12.6667C13 11.541 14.1647 10.3333 16 10.3333C17.8353 10.3333 19 11.541 19 12.6667C19 13.219 19.4477 13.6667 20 13.6667C20.5523 13.6667 21 13.219 21 12.6667C21 10.4448 19.1739 8.81156 17 8.42231V8Z"
                                fill="currentColor"
                            />
                        </svg>

                        <h5 className="font-bold text-black dark:text-white">Pricing</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                ${activeTab === 'hosting' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('hosting')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.33317 18.6667C8.78089 18.6667 8.33317 19.1144 8.33317 19.6667C8.33317 20.219 8.78089 20.6667 9.33317 20.6667C9.88546 20.6667 10.3332 20.219 10.3332 19.6667C10.3332 19.1144 9.88546 18.6667 9.33317 18.6667Z"
                                fill="currentColor"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.6665 19.6667C2.6665 15.9848 5.65127 13 9.33317 13H22.6665C26.3484 13 29.3332 15.9848 29.3332 19.6667C29.3332 23.3486 26.3484 26.3333 22.6665 26.3333H9.33317C5.65127 26.3333 2.6665 23.3486 2.6665 19.6667ZM6.33317 19.6667C6.33317 18.0098 7.67632 16.6667 9.33317 16.6667C10.99 16.6667 12.3332 18.0098 12.3332 19.6667C12.3332 21.3235 10.99 22.6667 9.33317 22.6667C7.67632 22.6667 6.33317 21.3235 6.33317 19.6667ZM15.9998 18.6667C15.4476 18.6667 14.9998 19.1144 14.9998 19.6667C14.9998 20.219 15.4476 20.6667 15.9998 20.6667H24.6665C25.2188 20.6667 25.6665 20.219 25.6665 19.6667C25.6665 19.1144 25.2188 18.6667 24.6665 18.6667H15.9998Z"
                                fill="currentColor"
                            />
                            <path
                                opacity="0.5"
                                d="M7.29157 26.0146L5.80916 28.4853C5.52501 28.9589 5.67858 29.5732 6.15216 29.8573C6.62574 30.1415 7.24 29.9879 7.52415 29.5143L9.43285 26.3331H9.33339C8.62118 26.3331 7.93505 26.2215 7.29157 26.0146Z"
                                fill="currentColor"
                            />
                            <path
                                opacity="0.5"
                                d="M22.5674 26.3331L24.4761 29.5143C24.7602 29.9879 25.3745 30.1415 25.8481 29.8573C26.3217 29.5732 26.4752 28.9589 26.1911 28.4853L24.7087 26.0146C24.0652 26.2215 23.3791 26.3331 22.6668 26.3331H22.5674Z"
                                fill="currentColor"
                            />
                            <path
                                opacity="0.4"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.9996 4.6665C19.3611 4.6665 17.0971 6.28026 16.1454 8.57849C15.934 9.08875 15.3491 9.33108 14.8388 9.11977C14.3286 8.90845 14.0862 8.3235 14.2975 7.81324C15.5481 4.7937 18.5242 2.6665 21.9996 2.6665C25.475 2.6665 28.4512 4.7937 29.7017 7.81324C29.913 8.3235 29.6707 8.90845 29.1604 9.11977C28.6502 9.33108 28.0652 9.08875 27.8539 8.57849C26.9021 6.28026 24.6382 4.6665 21.9996 4.6665Z"
                                fill="currentColor"
                            />
                            <path
                                opacity="0.7"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M22.0008 8C20.6377 8 19.4845 8.90993 19.1204 10.1576C18.9657 10.6878 18.4105 10.9921 17.8803 10.8374C17.3501 10.6827 17.0457 10.1275 17.2005 9.59735C17.8068 7.51959 19.725 6 22.0008 6C24.2765 6 26.1948 7.51959 26.8011 9.59735C26.9558 10.1275 26.6514 10.6827 26.1212 10.8374C25.5911 10.9921 25.0359 10.6878 24.8811 10.1576C24.5171 8.90993 23.3639 8 22.0008 8Z"
                                fill="currentColor"
                            />
                            <path
                                d="M23.3332 10.3333C23.3332 11.0697 22.7362 11.6667 21.9998 11.6667C21.2635 11.6667 20.6665 11.0697 20.6665 10.3333C20.6665 9.59695 21.2635 9 21.9998 9C22.7362 9 23.3332 9.59695 23.3332 10.3333Z"
                                fill="currentColor"
                            />
                        </svg>

                        <h5 className="font-bold text-black dark:text-white">Hosting</h5>
                    </li>
                </ul>
            </div>
            <h3 className="mb-8 text-center text-xl font-semibold md:text-2xl">
                Frequently asked <span className="text-primary">questions</span>
            </h3>
            <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="rounded-md bg-white dark:bg-black">
                    <div className="border-b border-white-light p-6 text-[22px] font-bold dark:border-dark dark:text-white">General topics?</div>
                    <div className="divide-y divide-white-light px-6 py-4.5 dark:divide-dark">
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                        ${active1 === 1 ? 'bg-primary-light !text-primary dark:bg-[#1B2E4B]' : ''}`}
                                onClick={() => setActive1(active1 === 1 ? null : 1)}
                            >
                                <span>How to install VRISTO Admin</span>
                                {active1 !== 1 ? (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 1 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                        ${active1 === 2 ? 'bg-primary-light !text-primary dark:bg-[#1B2E4B]' : ''}`}
                                onClick={() => setActive1(active1 === 2 ? null : 2)}
                            >
                                <span> Where can I subscribe to your newsletter?</span>
                                {active1 !== 2 ? (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 2 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                        ${active1 === 3 ? 'bg-primary-light !text-primary dark:bg-[#1B2E4B]' : ''}`}
                                onClick={() => setActive1(active1 === 3 ? null : 3)}
                            >
                                <span>How to install VRISTO Admin</span>
                                {active1 !== 3 ? (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 3 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                        ${active1 === 5 ? 'bg-primary-light !text-primary dark:bg-[#1B2E4B]' : ''}`}
                                onClick={() => setActive1(active1 === 5 ? null : 5)}
                            >
                                <span>How to install VRISTO Admin</span>
                                {active1 !== 5 ? (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 5 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                    </div>
                </div>
                <div className="rounded-md bg-white dark:bg-black">
                    <div className="border-b border-white-light p-6 text-[22px] font-bold dark:border-dark dark:text-white">Quick support & Free update</div>
                    <div className="divide-y divide-white-light px-6 py-4.5 dark:divide-dark">
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                        ${active2 === 1 ? 'bg-primary-light !text-primary dark:bg-[#1B2E4B]' : ''}`}
                                onClick={() => setActive2(active2 === 1 ? null : 1)}
                            >
                                <span>How to use Browser Sync</span>
                                {active2 !== 1 ? (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 1 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                        ${active2 === 2 ? 'bg-primary-light !text-primary dark:bg-[#1B2E4B]' : ''}`}
                                onClick={() => setActive2(active2 === 2 ? null : 2)}
                            >
                                <span> Sidebar not rendering CSS</span>
                                {active2 !== 2 ? (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 2 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                        ${active2 === 3 ? 'bg-primary-light !text-primary dark:bg-[#1B2E4B]' : ''}`}
                                onClick={() => setActive2(active2 === 3 ? null : 3)}
                            >
                                <span>Connect with us Personally</span>
                                {active2 !== 3 ? (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 3 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                        ${active2 === 5 ? 'bg-primary-light !text-primary dark:bg-[#1B2E4B]' : ''}`}
                                onClick={() => setActive2(active2 === 5 ? null : 5)}
                            >
                                <span>Compilation Issue</span>
                                {active2 !== 5 ? (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 5 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel mt-10 text-center md:mt-20">
                <h3 className="mb-2 text-xl font-bold dark:text-white md:text-2xl">Still need help?</h3>
                <div className="text-lg font-medium text-white-dark">
                    Our specialists are always happy to help. Contact us during standard business hours or email us24/7 and we'll get back to you.
                </div>
                <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
                    <button type="button" className="btn btn-primary">
                        Contact Us
                    </button>
                    <button type="button" className="btn btn-primary">
                        Visit our community
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Faq;
