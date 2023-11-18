
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setPageTitle, toggleLocale, toggleRTL } from '../../store/themeConfigSlice';
import { setUserData } from '../../store/auth';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import Dropdown from '@/components/Dropdown';
import { IRootState } from '@/store';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { Toaster } from "react-hot-toast";

const LoginCover = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(setPageTitle('Login Cover'));
    });

    const authdata = useSelector((state) => state.auth);
    console.log('authdata', authdata);
    const { userInfo } = authdata;

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    // setup router
    const router = useRouter();
    // get redirect from url
    const { redirect } = router.query;

    const logUserin = async ({ email, password }) => {
        try {
            // check if user credentials is correct
            const { data } = await axios.post('https://easydeal.mdawaina.online/api/account/loginweb', {
                email,
                password,
            });

            // set Token in Cookies
            //Cookies.set("token", data.token);
            Cookies.set('token', JSON.stringify(data.token));
            Cookies.set('isAuth', true);
            Cookies.set('userdata', JSON.stringify(data));

            dispatch(setUserData(data));
            toast.success("You're logged in", { duration: 3000 });

            // redirect
            router.push(redirect || '/');
            
        } catch (err) {
            console.log('error', err?.response.data.errors[0]);
            // show error
            toast.error(err?.response.data.errors[0], { duration: 3000 });
        }
    };


    // redirect user in he is already logged in
    useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, [userInfo]);






    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state) => state.themeConfig);
    const setLocale = (flag) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState('');
    useEffect(() => {
        setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    }, []);

    const { t, i18n } = useTranslation();

    return (
        <div>
            <Toaster position="top-center" />
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                {/* bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] */}
                    <div className="relative hidden w-full items-center justify-center 
                   
                    
                    bg-[#03C03C]
                    
                    p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link href="/" className="ms-10 block w-48 lg:w-72 object-cover">
                                <img src=  "/assets/project-image/easydeal-logo-white-small.png"
                                //"/assets/project-image/logo-project.jpg"
                                // "/assets/images/auth/logo-white.svg"
                                 alt="Logo" className="w-full object-cover" />
                            </Link>
                            {/* <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
                            </div> */}
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link href="/" className="block w-8 lg:hidden">
                                <img src=
                                 "/assets/images/prohect-image/easydeal-logo-white-small.png"
                                // "/assets/images/logo.svg" 
                                
                                alt="Logo" className="mx-auto w-10" />
                            </Link>
                            <div className="dropdown ms-auto w-max">
                                {flag && (
                                    <Dropdown
                                        offset={[0, 8]}
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                        button={
                                            <>
                                                <div>
                                                    <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                                </div>
                                                <div className="text-base font-bold uppercase">{flag}</div>
                                                <span className="shrink-0">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.99989 9.79988C6.59156 9.79988 6.18322 9.64238 5.87406 9.33321L2.07072 5.52988C1.90156 5.36071 1.90156 5.08071 2.07072 4.91154C2.23989 4.74238 2.51989 4.74238 2.68906 4.91154L6.49239 8.71488C6.77239 8.99488 7.22739 8.99488 7.50739 8.71488L11.3107 4.91154C11.4799 4.74238 11.7599 4.74238 11.9291 4.91154C12.0982 5.08071 12.0982 5.36071 11.9291 5.52988L8.12572 9.33321C7.81656 9.64238 7.40822 9.79988 6.99989 9.79988Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </span>
                                            </>
                                        }
                                    >
                                        <ul className="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                            {themeConfig.languageList.map((item) => {
                                                return (
                                                    <li key={item.code}>
                                                        <button
                                                            type="button"
                                                            className={`flex w-full rounded-lg hover:text-primary ${i18n.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                            onClick={() => {
                                                                dispatch(toggleLocale(item.code));
                                                                i18n.changeLanguage(item.code);
                                                                setLocale(item.code);
                                                            }}
                                                        >
                                                            <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="h-5 w-5 rounded-full object-cover" />
                                                            <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </Dropdown>
                                )}
                            </div>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="!text-xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                {/* <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login dev branch</p> */}
                               
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(logUserin)}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            {...register('email', {
                                                required: true,
                                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                            })}
                                            id="Email"
                                            type="email"
                                            placeholder="Enter Email"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path
                                                    opacity="0.5"
                                                    d="M10.65 2.25H7.35C4.23873 2.25 2.6831 2.25 1.71655 3.23851C0.75 4.22703 0.75 5.81802 0.75 9C0.75 12.182 0.75 13.773 1.71655 14.7615C2.6831 15.75 4.23873 15.75 7.35 15.75H10.65C13.7613 15.75 15.3169 15.75 16.2835 14.7615C17.25 13.773 17.25 12.182 17.25 9C17.25 5.81802 17.25 4.22703 16.2835 3.23851C15.3169 2.25 13.7613 2.25 10.65 2.25Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M14.3465 6.02574C14.609 5.80698 14.6445 5.41681 14.4257 5.15429C14.207 4.89177 13.8168 4.8563 13.5543 5.07507L11.7732 6.55931C11.0035 7.20072 10.4691 7.6446 10.018 7.93476C9.58125 8.21564 9.28509 8.30993 9.00041 8.30993C8.71572 8.30993 8.41956 8.21564 7.98284 7.93476C7.53168 7.6446 6.9973 7.20072 6.22761 6.55931L4.44652 5.07507C4.184 4.8563 3.79384 4.89177 3.57507 5.15429C3.3563 5.41681 3.39177 5.80698 3.65429 6.02574L5.4664 7.53583C6.19764 8.14522 6.79033 8.63914 7.31343 8.97558C7.85834 9.32604 8.38902 9.54743 9.00041 9.54743C9.6118 9.54743 10.1425 9.32604 10.6874 8.97558C11.2105 8.63914 11.8032 8.14522 12.5344 7.53582L14.3465 6.02574Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>


                                    </div>

                                    {/* error msg email  */}

                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                            Your email is not valid.
                                        </p>
                                    )}




                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            {...register('password', {
                                                required: true,
                                                minLength: 6,
                                            })}
                                            id="Password"
                                            type="password"
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path
                                                    opacity="0.5"
                                                    d="M1.5 12C1.5 9.87868 1.5 8.81802 2.15901 8.15901C2.81802 7.5 3.87868 7.5 6 7.5H12C14.1213 7.5 15.182 7.5 15.841 8.15901C16.5 8.81802 16.5 9.87868 16.5 12C16.5 14.1213 16.5 15.182 15.841 15.841C15.182 16.5 14.1213 16.5 12 16.5H6C3.87868 16.5 2.81802 16.5 2.15901 15.841C1.5 15.182 1.5 14.1213 1.5 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M6 12.75C6.41421 12.75 6.75 12.4142 6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M9 12.75C9.41421 12.75 9.75 12.4142 9.75 12C9.75 11.5858 9.41421 11.25 9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M5.0625 6C5.0625 3.82538 6.82538 2.0625 9 2.0625C11.1746 2.0625 12.9375 3.82538 12.9375 6V7.50268C13.363 7.50665 13.7351 7.51651 14.0625 7.54096V6C14.0625 3.20406 11.7959 0.9375 9 0.9375C6.20406 0.9375 3.9375 3.20406 3.9375 6V7.54096C4.26488 7.51651 4.63698 7.50665 5.0625 7.50268V6Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>


                                    </div>

                                    {/* error password  */}
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                            Your password is not valid.
                                        </p>
                                    )}


                                </div>
                                {/* <div>
                                    <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Subscribe to weekly newsletter</span>
                                    </label>
                                </div> */}
                                <button
                                
                                
                                type="submit" className="btn btn-gradien bg-[#03C03C] !my-4 text-white text-xl font-semibold !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign in
                                </button>
                            </form>

                            {/* <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <ul className="flex justify-center gap-3.5">
                                    <li>
                                        <Link
                                            href="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path
                                                    d="M8 2.05C9.925 2.05 10.1875 2.05 10.975 2.05C11.675 2.05 12.025 2.225 12.2875 2.3125C12.6375 2.4875 12.9 2.575 13.1625 2.8375C13.425 3.1 13.6 3.3625 13.6875 3.7125C13.775 3.975 13.8625 4.325 13.95 5.025C13.95 5.8125 13.95 5.9875 13.95 8C13.95 10.0125 13.95 10.1875 13.95 10.975C13.95 11.675 13.775 12.025 13.6875 12.2875C13.5125 12.6375 13.425 12.9 13.1625 13.1625C12.9 13.425 12.6375 13.6 12.2875 13.6875C12.025 13.775 11.675 13.8625 10.975 13.95C10.1875 13.95 10.0125 13.95 8 13.95C5.9875 13.95 5.8125 13.95 5.025 13.95C4.325 13.95 3.975 13.775 3.7125 13.6875C3.3625 13.5125 3.1 13.425 2.8375 13.1625C2.575 12.9 2.4 12.6375 2.3125 12.2875C2.225 12.025 2.1375 11.675 2.05 10.975C2.05 10.1875 2.05 10.0125 2.05 8C2.05 5.9875 2.05 5.8125 2.05 5.025C2.05 4.325 2.225 3.975 2.3125 3.7125C2.4875 3.3625 2.575 3.1 2.8375 2.8375C3.1 2.575 3.3625 2.4 3.7125 2.3125C3.975 2.225 4.325 2.1375 5.025 2.05C5.8125 2.05 6.075 2.05 8 2.05ZM8 0.737503C5.9875 0.737503 5.8125 0.737503 5.025 0.737503C4.2375 0.737503 3.7125 0.912504 3.275 1.0875C2.8375 1.2625 2.4 1.525 1.9625 1.9625C1.525 2.4 1.35 2.75 1.0875 3.275C0.912504 3.7125 0.825003 4.2375 0.737503 5.025C0.737503 5.8125 0.737503 6.075 0.737503 8C0.737503 10.0125 0.737503 10.1875 0.737503 10.975C0.737503 11.7625 0.912504 12.2875 1.0875 12.725C1.2625 13.1625 1.525 13.6 1.9625 14.0375C2.4 14.475 2.75 14.65 3.275 14.9125C3.7125 15.0875 4.2375 15.175 5.025 15.2625C5.8125 15.2625 6.075 15.2625 8 15.2625C9.925 15.2625 10.1875 15.2625 10.975 15.2625C11.7625 15.2625 12.2875 15.0875 12.725 14.9125C13.1625 14.7375 13.6 14.475 14.0375 14.0375C14.475 13.6 14.65 13.25 14.9125 12.725C15.0875 12.2875 15.175 11.7625 15.2625 10.975C15.2625 10.1875 15.2625 9.925 15.2625 8C15.2625 6.075 15.2625 5.8125 15.2625 5.025C15.2625 4.2375 15.0875 3.7125 14.9125 3.275C14.7375 2.8375 14.475 2.4 14.0375 1.9625C13.6 1.525 13.25 1.35 12.725 1.0875C12.2875 0.912504 11.7625 0.825003 10.975 0.737503C10.1875 0.737503 10.0125 0.737503 8 0.737503Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M8 4.2375C5.9 4.2375 4.2375 5.9 4.2375 8C4.2375 10.1 5.9 11.7625 8 11.7625C10.1 11.7625 11.7625 10.1 11.7625 8C11.7625 5.9 10.1 4.2375 8 4.2375ZM8 10.45C6.6875 10.45 5.55 9.4 5.55 8C5.55 6.6875 6.6 5.55 8 5.55C9.3125 5.55 10.45 6.6 10.45 8C10.45 9.3125 9.3125 10.45 8 10.45Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M11.85 5.025C12.3333 5.025 12.725 4.63325 12.725 4.15C12.725 3.66675 12.3333 3.275 11.85 3.275C11.3668 3.275 10.975 3.66675 10.975 4.15C10.975 4.63325 11.3668 5.025 11.85 5.025Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path
                                                    d="M14 7C14 3.15 10.85 0 7 0C3.15 0 0 3.15 0 7C0 10.5 2.5375 13.3875 5.8625 13.9125V9.0125H4.1125V7H5.8625V5.425C5.8625 3.675 6.9125 2.7125 8.4875 2.7125C9.275 2.7125 10.0625 2.8875 10.0625 2.8875V4.6375H9.1875C8.3125 4.6375 8.05 5.1625 8.05 5.6875V7H9.975L9.625 9.0125H7.9625V14C11.4625 13.475 14 10.5 14 7Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                                                <path
                                                    d="M14 1.625C13.475 1.8875 12.95 1.975 12.3375 2.0625C12.95 1.7125 13.3875 1.1875 13.5625 0.4875C13.0375 0.8375 12.425 1.0125 11.725 1.1875C11.2 0.6625 10.4125 0.3125 9.625 0.3125C7.7875 0.3125 6.3875 2.0625 6.825 3.8125C4.4625 3.725 2.3625 2.5875 0.875 0.8375C0.0875 2.15 0.525 3.8125 1.75 4.6875C1.3125 4.6875 0.875 4.5125 0.4375 4.3375C0.4375 5.65 1.4 6.875 2.7125 7.225C2.275 7.3125 1.8375 7.4 1.4 7.3125C1.75 8.45 2.8 9.325 4.1125 9.325C3.0625 10.1125 1.4875 10.55 0 10.375C1.3125 11.1625 2.8 11.6875 4.375 11.6875C9.7125 11.6875 12.6875 7.225 12.5125 3.1125C13.125 2.7625 13.65 2.2375 14 1.625Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M13.8512 7.15912C13.8512 6.66275 13.8066 6.18548 13.7239 5.72729H7.13116V8.43503H10.8984C10.7362 9.31003 10.243 10.0514 9.50162 10.5478V12.3041H11.7639C13.0875 11.0855 13.8512 9.29094 13.8512 7.15912Z"
                                                    fill="white"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.13089 14C9.0209 14 10.6054 13.3731 11.7636 12.3041L9.50135 10.5477C8.87454 10.9677 8.07272 11.2159 7.13089 11.2159C5.30771 11.2159 3.76452 9.9845 3.21407 8.32996H0.875427V10.1436C2.02725 12.4313 4.39453 14 7.13089 14Z"
                                                    fill="white"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M3.21435 8.32997C3.07435 7.90997 2.99481 7.46133 2.99481 6.99997C2.99481 6.5386 3.07435 6.08996 3.21435 5.66996V3.85632H0.875712C0.40162 4.80133 0.131165 5.87042 0.131165 6.99997C0.131165 8.12951 0.40162 9.19861 0.875712 10.1436L3.21435 8.32997Z"
                                                    fill="white"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.13089 2.7841C8.15862 2.7841 9.08135 3.13728 9.80681 3.83092L11.8145 1.82319C10.6023 0.693638 9.01772 0 7.13089 0C4.39453 0 2.02725 1.56864 0.875427 3.85637L3.21407 5.67001C3.76452 4.01546 5.30771 2.7841 7.13089 2.7841Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </Link>
                                    </li>
                                </ul>
                            </div> */}



                            {/* <div className="text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link href="/auth/cover-register" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div> */}
                        </div>
                        <p className="absolute text-sm bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()} .easydeal|admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
LoginCover.getLayout = (page) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default LoginCover;












// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { setPageTitle, toggleLocale, toggleRTL } from '../../store/themeConfigSlice';
// import { setUserData } from '../../store/auth';
// import BlankLayout from '@/components/Layouts/BlankLayout';
// import Link from 'next/link';
// import Dropdown from '@/components/Dropdown';
// import { IRootState } from '@/store';
// import Cookies from 'js-cookie';
// import { useTranslation } from 'react-i18next';
// import { Toaster } from "react-hot-toast";

// const LoginCover = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         // dispatch(setPageTitle('Login Cover'));
//     });

//     const authdata = useSelector((state) => state.auth);
//     console.log('authdata', authdata);
//     const { userInfo } = authdata;

//     const {
//         handleSubmit,
//         register,
//         formState: { errors },
//         setValue,
//     } = useForm();
//     const [showPassword, setShowPassword] = useState(false);

//     // setup router
//     const router = useRouter();
//     // get redirect from url
//     const { redirect } = router.query;

//     const logUserin = async ({ email, password }) => {
//         try {
//             // check if user credentials is correct
//             const { data } = await axios.post('https://easydeal.mdawaina.online/api/account/loginweb', {
//                 email,
//                 password,
//             });

//             // set Token in Cookies
//             //Cookies.set("token", data.token);
//             Cookies.set('token', JSON.stringify(data.token));
//             Cookies.set('isAuth', true);
//             Cookies.set('userdata', JSON.stringify(data));

//             dispatch(setUserData(data));
//             toast.success("You're logged in", { duration: 3000 });

//             // redirect
//             router.push(redirect || '/');
            
//         } catch (err) {
//             console.log('error', err?.response.data.errors[0]);
//             // show error
//             toast.error(err?.response.data.errors[0], { duration: 3000 });
//         }
//     };


//     // redirect user in he is already logged in
//     useEffect(() => {
//         if (userInfo) {
//             router.push('/');
//         }
//     }, [userInfo]);






//     const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

//     const themeConfig = useSelector((state) => state.themeConfig);
//     const setLocale = (flag) => {
//         setFlag(flag);
//         if (flag.toLowerCase() === 'ae') {
//             dispatch(toggleRTL('rtl'));
//         } else {
//             dispatch(toggleRTL('ltr'));
//         }
//     };
//     const [flag, setFlag] = useState('');
//     useEffect(() => {
//         setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
//     }, []);

//     const { t, i18n } = useTranslation();

//     return (
//         <div>
//             <Toaster position="top-center" />
//             <div className="absolute inset-0">
//                 <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
//             </div>
//             <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
//                 <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
//                 <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
//                 <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
//                 <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
//                 <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
//                 {/* // bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] */}

//                     <div className="relative hidden w-full items-center justify-center 
//                  bg-[#03C03C]
                    
//                     p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">

 
//                         <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                      



                            


//                         </div>
//                     </div>
//                     <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
//                         <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
//                             <Link href="/" className="block w-8 lg:hidden">
//                                 <img src="/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" />
//                             </Link>
//                             <div className="dropdown ms-auto w-max">
//                                 {flag && (
//                                     <Dropdown
//                                         offset={[0, 8]}
//                                         placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
//                                         btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
//                                         button={
//                                             <>
//                                                 <div>
//                                                     <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
//                                                 </div>
//                                                 <div className="text-base font-bold uppercase">{flag}</div>
//                                                 <span className="shrink-0">
//                                                     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                         <path
//                                                             d="M6.99989 9.79988C6.59156 9.79988 6.18322 9.64238 5.87406 9.33321L2.07072 5.52988C1.90156 5.36071 1.90156 5.08071 2.07072 4.91154C2.23989 4.74238 2.51989 4.74238 2.68906 4.91154L6.49239 8.71488C6.77239 8.99488 7.22739 8.99488 7.50739 8.71488L11.3107 4.91154C11.4799 4.74238 11.7599 4.74238 11.9291 4.91154C12.0982 5.08071 12.0982 5.36071 11.9291 5.52988L8.12572 9.33321C7.81656 9.64238 7.40822 9.79988 6.99989 9.79988Z"
//                                                             fill="currentColor"
//                                                         />
//                                                     </svg>
//                                                 </span>
//                                             </>
//                                         }
//                                     >
//                                         <ul className="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
//                                             {themeConfig.languageList.map((item) => {
//                                                 return (
//                                                     <li key={item.code}>
//                                                         <button
//                                                             type="button"
//                                                             className={`flex w-full rounded-lg hover:text-primary ${i18n.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
//                                                             onClick={() => {
//                                                                 dispatch(toggleLocale(item.code));
//                                                                 i18n.changeLanguage(item.code);
//                                                                 setLocale(item.code);
//                                                             }}
//                                                         >
//                                                             <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="h-5 w-5 rounded-full object-cover" />
//                                                             <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
//                                                         </button>
//                                                     </li>
//                                                 );
//                                             })}
//                                         </ul>
//                                     </Dropdown>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="w-full max-w-[440px] lg:mt-16">
//                             <div className="mb-10">
//                                 <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
//                                 {/* <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login dev branch</p> */}
                               
//                             </div>
//                             <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(logUserin)}>
//                                 <div>
//                                     <label htmlFor="Email">Email</label>
//                                     <div className="relative text-white-dark">
//                                         <input
//                                             {...register('email', {
//                                                 required: true,
//                                                 pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
//                                             })}
//                                             id="Email"
//                                             type="email"
//                                             placeholder="Enter Email"
//                                             className="form-input ps-10 placeholder:text-white-dark"
//                                         />
//                                         <span className="absolute start-4 top-1/2 -translate-y-1/2">
//                                             <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                                                 <path
//                                                     opacity="0.5"
//                                                     d="M10.65 2.25H7.35C4.23873 2.25 2.6831 2.25 1.71655 3.23851C0.75 4.22703 0.75 5.81802 0.75 9C0.75 12.182 0.75 13.773 1.71655 14.7615C2.6831 15.75 4.23873 15.75 7.35 15.75H10.65C13.7613 15.75 15.3169 15.75 16.2835 14.7615C17.25 13.773 17.25 12.182 17.25 9C17.25 5.81802 17.25 4.22703 16.2835 3.23851C15.3169 2.25 13.7613 2.25 10.65 2.25Z"
//                                                     fill="currentColor"
//                                                 />
//                                                 <path
//                                                     d="M14.3465 6.02574C14.609 5.80698 14.6445 5.41681 14.4257 5.15429C14.207 4.89177 13.8168 4.8563 13.5543 5.07507L11.7732 6.55931C11.0035 7.20072 10.4691 7.6446 10.018 7.93476C9.58125 8.21564 9.28509 8.30993 9.00041 8.30993C8.71572 8.30993 8.41956 8.21564 7.98284 7.93476C7.53168 7.6446 6.9973 7.20072 6.22761 6.55931L4.44652 5.07507C4.184 4.8563 3.79384 4.89177 3.57507 5.15429C3.3563 5.41681 3.39177 5.80698 3.65429 6.02574L5.4664 7.53583C6.19764 8.14522 6.79033 8.63914 7.31343 8.97558C7.85834 9.32604 8.38902 9.54743 9.00041 9.54743C9.6118 9.54743 10.1425 9.32604 10.6874 8.97558C11.2105 8.63914 11.8032 8.14522 12.5344 7.53582L14.3465 6.02574Z"
//                                                     fill="currentColor"
//                                                 />
//                                             </svg>
//                                         </span>


//                                     </div>

//                                     {/* error msg email  */}

//                                     {errors.email && (
//                                         <p className="mt-2 text-sm text-red-600" id="email-error">
//                                             Your email is not valid.
//                                         </p>
//                                     )}




//                                 </div>
//                                 <div>
//                                     <label htmlFor="Password">Password</label>
//                                     <div className="relative text-white-dark">
//                                         <input
//                                             {...register('password', {
//                                                 required: true,
//                                                 minLength: 6,
//                                             })}
//                                             id="Password"
//                                             type="password"
//                                             placeholder="Enter Password"
//                                             className="form-input ps-10 placeholder:text-white-dark"
//                                         />
//                                         <span className="absolute start-4 top-1/2 -translate-y-1/2">
//                                             <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                                                 <path
//                                                     opacity="0.5"
//                                                     d="M1.5 12C1.5 9.87868 1.5 8.81802 2.15901 8.15901C2.81802 7.5 3.87868 7.5 6 7.5H12C14.1213 7.5 15.182 7.5 15.841 8.15901C16.5 8.81802 16.5 9.87868 16.5 12C16.5 14.1213 16.5 15.182 15.841 15.841C15.182 16.5 14.1213 16.5 12 16.5H6C3.87868 16.5 2.81802 16.5 2.15901 15.841C1.5 15.182 1.5 14.1213 1.5 12Z"
//                                                     fill="currentColor"
//                                                 />
//                                                 <path
//                                                     d="M6 12.75C6.41421 12.75 6.75 12.4142 6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z"
//                                                     fill="currentColor"
//                                                 />
//                                                 <path
//                                                     d="M9 12.75C9.41421 12.75 9.75 12.4142 9.75 12C9.75 11.5858 9.41421 11.25 9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75Z"
//                                                     fill="currentColor"
//                                                 />
//                                                 <path
//                                                     d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z"
//                                                     fill="currentColor"
//                                                 />
//                                                 <path
//                                                     d="M5.0625 6C5.0625 3.82538 6.82538 2.0625 9 2.0625C11.1746 2.0625 12.9375 3.82538 12.9375 6V7.50268C13.363 7.50665 13.7351 7.51651 14.0625 7.54096V6C14.0625 3.20406 11.7959 0.9375 9 0.9375C6.20406 0.9375 3.9375 3.20406 3.9375 6V7.54096C4.26488 7.51651 4.63698 7.50665 5.0625 7.50268V6Z"
//                                                     fill="currentColor"
//                                                 />
//                                             </svg>
//                                         </span>


//                                     </div>

//                                     {/* error password  */}
//                                     {errors.password && (
//                                         <p className="mt-2 text-sm text-red-600" id="email-error">
//                                             Your password is not valid.
//                                         </p>
//                                     )}


//                                 </div>
//                                 {/* <div>
//                                     <label className="flex cursor-pointer items-center">
//                                         <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
//                                         <span className="text-white-dark">Subscribe to weekly newsletter</span>
//                                     </label>
//                                 </div> */}
//                                 {/* btn-gradient  */}
//                                 <button
                                
                                
//                                 type="submit" className="btn 
//                             bg-[#03C03C] text-white font-semibold text-xl  my-4
                                
//                                 !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
//                                     Sign in
//                                 </button>
//                             </form>

//                             {/* <div className="relative my-7 text-center md:mb-9">
//                                 <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
//                                 <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
//                             </div>
//                             <div className="mb-10 md:mb-[60px]">
//                                 <ul className="flex justify-center gap-3.5">
//                                     <li>
//                                         <Link
//                                             href="#"
//                                             className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
//                                             style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
//                                         >
//                                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                                                 <path
//                                                     d="M8 2.05C9.925 2.05 10.1875 2.05 10.975 2.05C11.675 2.05 12.025 2.225 12.2875 2.3125C12.6375 2.4875 12.9 2.575 13.1625 2.8375C13.425 3.1 13.6 3.3625 13.6875 3.7125C13.775 3.975 13.8625 4.325 13.95 5.025C13.95 5.8125 13.95 5.9875 13.95 8C13.95 10.0125 13.95 10.1875 13.95 10.975C13.95 11.675 13.775 12.025 13.6875 12.2875C13.5125 12.6375 13.425 12.9 13.1625 13.1625C12.9 13.425 12.6375 13.6 12.2875 13.6875C12.025 13.775 11.675 13.8625 10.975 13.95C10.1875 13.95 10.0125 13.95 8 13.95C5.9875 13.95 5.8125 13.95 5.025 13.95C4.325 13.95 3.975 13.775 3.7125 13.6875C3.3625 13.5125 3.1 13.425 2.8375 13.1625C2.575 12.9 2.4 12.6375 2.3125 12.2875C2.225 12.025 2.1375 11.675 2.05 10.975C2.05 10.1875 2.05 10.0125 2.05 8C2.05 5.9875 2.05 5.8125 2.05 5.025C2.05 4.325 2.225 3.975 2.3125 3.7125C2.4875 3.3625 2.575 3.1 2.8375 2.8375C3.1 2.575 3.3625 2.4 3.7125 2.3125C3.975 2.225 4.325 2.1375 5.025 2.05C5.8125 2.05 6.075 2.05 8 2.05ZM8 0.737503C5.9875 0.737503 5.8125 0.737503 5.025 0.737503C4.2375 0.737503 3.7125 0.912504 3.275 1.0875C2.8375 1.2625 2.4 1.525 1.9625 1.9625C1.525 2.4 1.35 2.75 1.0875 3.275C0.912504 3.7125 0.825003 4.2375 0.737503 5.025C0.737503 5.8125 0.737503 6.075 0.737503 8C0.737503 10.0125 0.737503 10.1875 0.737503 10.975C0.737503 11.7625 0.912504 12.2875 1.0875 12.725C1.2625 13.1625 1.525 13.6 1.9625 14.0375C2.4 14.475 2.75 14.65 3.275 14.9125C3.7125 15.0875 4.2375 15.175 5.025 15.2625C5.8125 15.2625 6.075 15.2625 8 15.2625C9.925 15.2625 10.1875 15.2625 10.975 15.2625C11.7625 15.2625 12.2875 15.0875 12.725 14.9125C13.1625 14.7375 13.6 14.475 14.0375 14.0375C14.475 13.6 14.65 13.25 14.9125 12.725C15.0875 12.2875 15.175 11.7625 15.2625 10.975C15.2625 10.1875 15.2625 9.925 15.2625 8C15.2625 6.075 15.2625 5.8125 15.2625 5.025C15.2625 4.2375 15.0875 3.7125 14.9125 3.275C14.7375 2.8375 14.475 2.4 14.0375 1.9625C13.6 1.525 13.25 1.35 12.725 1.0875C12.2875 0.912504 11.7625 0.825003 10.975 0.737503C10.1875 0.737503 10.0125 0.737503 8 0.737503Z"
//                                                     fill="white"
//                                                 />
//                                                 <path
//                                                     d="M8 4.2375C5.9 4.2375 4.2375 5.9 4.2375 8C4.2375 10.1 5.9 11.7625 8 11.7625C10.1 11.7625 11.7625 10.1 11.7625 8C11.7625 5.9 10.1 4.2375 8 4.2375ZM8 10.45C6.6875 10.45 5.55 9.4 5.55 8C5.55 6.6875 6.6 5.55 8 5.55C9.3125 5.55 10.45 6.6 10.45 8C10.45 9.3125 9.3125 10.45 8 10.45Z"
//                                                     fill="white"
//                                                 />
//                                                 <path
//                                                     d="M11.85 5.025C12.3333 5.025 12.725 4.63325 12.725 4.15C12.725 3.66675 12.3333 3.275 11.85 3.275C11.3668 3.275 10.975 3.66675 10.975 4.15C10.975 4.63325 11.3668 5.025 11.85 5.025Z"
//                                                     fill="white"
//                                                 />
//                                             </svg>
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link
//                                             href="#"
//                                             className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
//                                             style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
//                                         >
//                                             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                                                 <path
//                                                     d="M14 7C14 3.15 10.85 0 7 0C3.15 0 0 3.15 0 7C0 10.5 2.5375 13.3875 5.8625 13.9125V9.0125H4.1125V7H5.8625V5.425C5.8625 3.675 6.9125 2.7125 8.4875 2.7125C9.275 2.7125 10.0625 2.8875 10.0625 2.8875V4.6375H9.1875C8.3125 4.6375 8.05 5.1625 8.05 5.6875V7H9.975L9.625 9.0125H7.9625V14C11.4625 13.475 14 10.5 14 7Z"
//                                                     fill="white"
//                                                 />
//                                             </svg>
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link
//                                             href="#"
//                                             className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
//                                             style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
//                                         >
//                                             <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
//                                                 <path
//                                                     d="M14 1.625C13.475 1.8875 12.95 1.975 12.3375 2.0625C12.95 1.7125 13.3875 1.1875 13.5625 0.4875C13.0375 0.8375 12.425 1.0125 11.725 1.1875C11.2 0.6625 10.4125 0.3125 9.625 0.3125C7.7875 0.3125 6.3875 2.0625 6.825 3.8125C4.4625 3.725 2.3625 2.5875 0.875 0.8375C0.0875 2.15 0.525 3.8125 1.75 4.6875C1.3125 4.6875 0.875 4.5125 0.4375 4.3375C0.4375 5.65 1.4 6.875 2.7125 7.225C2.275 7.3125 1.8375 7.4 1.4 7.3125C1.75 8.45 2.8 9.325 4.1125 9.325C3.0625 10.1125 1.4875 10.55 0 10.375C1.3125 11.1625 2.8 11.6875 4.375 11.6875C9.7125 11.6875 12.6875 7.225 12.5125 3.1125C13.125 2.7625 13.65 2.2375 14 1.625Z"
//                                                     fill="white"
//                                                 />
//                                             </svg>
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link
//                                             href="#"
//                                             className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
//                                             style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
//                                         >
//                                             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                                                 <path
//                                                     fillRule="evenodd"
//                                                     clipRule="evenodd"
//                                                     d="M13.8512 7.15912C13.8512 6.66275 13.8066 6.18548 13.7239 5.72729H7.13116V8.43503H10.8984C10.7362 9.31003 10.243 10.0514 9.50162 10.5478V12.3041H11.7639C13.0875 11.0855 13.8512 9.29094 13.8512 7.15912Z"
//                                                     fill="white"
//                                                 />
//                                                 <path
//                                                     fillRule="evenodd"
//                                                     clipRule="evenodd"
//                                                     d="M7.13089 14C9.0209 14 10.6054 13.3731 11.7636 12.3041L9.50135 10.5477C8.87454 10.9677 8.07272 11.2159 7.13089 11.2159C5.30771 11.2159 3.76452 9.9845 3.21407 8.32996H0.875427V10.1436C2.02725 12.4313 4.39453 14 7.13089 14Z"
//                                                     fill="white"
//                                                 />
//                                                 <path
//                                                     fillRule="evenodd"
//                                                     clipRule="evenodd"
//                                                     d="M3.21435 8.32997C3.07435 7.90997 2.99481 7.46133 2.99481 6.99997C2.99481 6.5386 3.07435 6.08996 3.21435 5.66996V3.85632H0.875712C0.40162 4.80133 0.131165 5.87042 0.131165 6.99997C0.131165 8.12951 0.40162 9.19861 0.875712 10.1436L3.21435 8.32997Z"
//                                                     fill="white"
//                                                 />
//                                                 <path
//                                                     fillRule="evenodd"
//                                                     clipRule="evenodd"
//                                                     d="M7.13089 2.7841C8.15862 2.7841 9.08135 3.13728 9.80681 3.83092L11.8145 1.82319C10.6023 0.693638 9.01772 0 7.13089 0C4.39453 0 2.02725 1.56864 0.875427 3.85637L3.21407 5.67001C3.76452 4.01546 5.30771 2.7841 7.13089 2.7841Z"
//                                                     fill="white"
//                                                 />
//                                             </svg>
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div> */}



//                             <div className="text-center dark:text-white my-4">
//                                 Don't have an account ?&nbsp;
//                                 <Link href="/auth/cover-register" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
//                                     SIGN UP
//                                 </Link>
//                             </div>
//                         </div>
//                         <p className="absolute bottom-6 w-full text-center text-xl dark:text-white">© {new Date().getFullYear()}.
//                         Easydeal|Admin.</p>
//                     </div>
//                 </div>
//             </div>
          
//         // </div>
//     );
// };
// LoginCover.getLayout = (page) => {
//     return <BlankLayout>{page}</BlankLayout>;
// };
// export default LoginCover;
