import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle, toggleLocale, toggleRTL } from '../../store/themeConfigSlice';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Contact Us Boxed'));
    });
    const router = useRouter();

    const submitForm = (e: any) => {
        e.preventDefault();
        router.push('/');
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
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
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">
                        <div className="absolute end-6 top-6">
                            <div className="dropdown">
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
                                            {themeConfig.languageList.map((item: any) => {
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
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Contact us</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Submit your queries and we will get back to you as soon as possible.</p>
                            </div>
                            <form className="space-y-5" onSubmit={submitForm}>
                                <div className="relative text-white-dark">
                                    <input id="Name" type="text" placeholder="Name" className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <circle cx="9" cy="4.5" r="3" fill="#888EA8" />
                                            <path
                                                opacity="0.5"
                                                d="M15 13.125C15 14.989 15 16.5 9 16.5C3 16.5 3 14.989 3 13.125C3 11.261 5.68629 9.75 9 9.75C12.3137 9.75 15 11.261 15 13.125Z"
                                                fill="#888EA8"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="Email" type="email" placeholder="Email" className="form-input ps-10 placeholder:text-white-dark" />
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
                                <div className="relative text-white-dark">
                                    <input id="Phone" type="text" placeholder="Phone" className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path
                                                opacity="0.5"
                                                d="M11.6671 10.9108L11.3255 11.2704C11.3255 11.2704 10.5136 12.1252 8.29734 9.79192C6.08109 7.45863 6.89303 6.60381 6.89303 6.60381L7.10814 6.37733C7.63805 5.81943 7.68801 4.92372 7.22568 4.26983L6.27994 2.93221C5.70771 2.12287 4.60197 2.01596 3.94609 2.70648L2.76889 3.94585C2.44367 4.28824 2.22574 4.73209 2.25217 5.22445C2.31978 6.48409 2.85804 9.19429 5.86152 12.3564C9.04661 15.7097 12.0351 15.8429 13.2572 15.7223C13.6438 15.6842 13.9799 15.4757 14.2508 15.1905L15.3163 14.0688C16.0354 13.3117 15.8327 12.0136 14.9125 11.484L13.4796 10.6592C12.8754 10.3115 12.1393 10.4136 11.6671 10.9108Z"
                                                fill="#888EA8"
                                            />
                                            <path
                                                d="M9.94462 1.40987C9.99426 1.10321 10.2842 0.895175 10.5908 0.944823C10.6098 0.948457 10.6709 0.959872 10.7029 0.966999C10.7669 0.981252 10.8562 1.0032 10.9675 1.03561C11.1901 1.10045 11.501 1.20725 11.8742 1.37835C12.6214 1.72092 13.6158 2.32017 14.6476 3.35202C15.6795 4.38387 16.2787 5.37823 16.6213 6.12544C16.7924 6.49865 16.8992 6.8096 16.964 7.03219C16.9965 7.14349 17.0184 7.23276 17.0327 7.29676C17.0398 7.32876 17.045 7.35446 17.0486 7.37344L17.0529 7.39684C17.1026 7.7035 16.8965 8.00539 16.5898 8.05504C16.284 8.10455 15.9959 7.89752 15.945 7.59229C15.9435 7.5841 15.9392 7.56208 15.9346 7.54131C15.9253 7.49978 15.9093 7.43391 15.8839 7.34679C15.8332 7.17254 15.745 6.91354 15.5987 6.59428C15.3063 5.95655 14.7805 5.07591 13.8521 4.14752C12.9237 3.21912 12.0431 2.69337 11.4054 2.401C11.0861 2.25463 10.8271 2.16648 10.6529 2.11573C10.5657 2.09036 10.4563 2.06522 10.4147 2.05597C10.1095 2.00511 9.89511 1.71566 9.94462 1.40987Z"
                                                fill="#888EA8"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10.1143 3.99697C10.1996 3.69827 10.511 3.5253 10.8097 3.61065L10.6552 4.1515C10.8097 3.61065 10.8097 3.61065 10.8097 3.61065L10.8108 3.61096L10.8119 3.61129L10.8144 3.61202L10.8202 3.61375L10.8351 3.61838C10.8464 3.62199 10.8605 3.6267 10.8773 3.63268C10.911 3.64463 10.9555 3.66163 11.0102 3.68503C11.1194 3.73186 11.2687 3.80417 11.4521 3.91271C11.8192 4.12997 12.3203 4.49085 12.9091 5.07958C13.4978 5.66831 13.8587 6.16945 14.0759 6.53655C14.1845 6.71993 14.2568 6.86923 14.3036 6.97849C14.327 7.0331 14.344 7.07762 14.356 7.1113C14.3619 7.12814 14.3667 7.14226 14.3703 7.15357L14.3749 7.16841L14.3766 7.17422L14.3774 7.17672L14.3777 7.17787C14.3777 7.17787 14.378 7.17895 13.8371 7.33348L14.378 7.17895C14.4633 7.47766 14.2904 7.789 13.9917 7.87434C13.6955 7.95896 13.3869 7.78964 13.2985 7.4956L13.2957 7.48751C13.2917 7.47624 13.2835 7.45405 13.2696 7.42165C13.2418 7.3569 13.1915 7.25098 13.1078 7.10953C12.9406 6.82698 12.6385 6.40004 12.1136 5.87508C11.5886 5.35011 11.1617 5.04808 10.8791 4.88086C10.7377 4.79714 10.6317 4.74682 10.567 4.71907C10.5346 4.70518 10.5124 4.69691 10.5011 4.69291L10.493 4.69014C10.199 4.60173 10.0297 4.29314 10.1143 3.99697Z"
                                                fill="#888EA8"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="Subject" type="text" placeholder="Subject" className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M15.636 6.53479C16.7878 5.38301 16.7878 3.51561 15.636 2.36383C14.4843 1.21206 12.6169 1.21206 11.4651 2.36383L10.7998 3.02911C10.8089 3.05662 10.8184 3.08451 10.8282 3.11277C11.072 3.81562 11.5321 4.737 12.3976 5.60252C13.2631 6.46803 14.1845 6.92811 14.8874 7.17196C14.9155 7.18172 14.9432 7.19113 14.9706 7.2002L15.636 6.53479Z"
                                                fill="#888EA8"
                                            />
                                            <path
                                                d="M10.8289 3.00049L10.8003 3.02913C10.8094 3.05664 10.8189 3.08453 10.8287 3.11279C11.0725 3.81564 11.5326 4.73703 12.3981 5.60254C13.2636 6.46805 14.185 6.92813 14.8879 7.17198C14.9157 7.18166 14.9433 7.19099 14.9704 7.19998L8.55008 13.6203C8.11723 14.0532 7.90076 14.2696 7.66212 14.4558C7.38061 14.6753 7.07602 14.8636 6.75373 15.0172C6.48052 15.1474 6.19014 15.2442 5.60938 15.4378L2.54688 16.4586C2.26108 16.5539 1.94599 16.4795 1.73297 16.2665C1.51995 16.0534 1.44557 15.7384 1.54084 15.4526L2.56167 12.3901C2.75526 11.8093 2.85205 11.5189 2.98226 11.2457C3.13585 10.9234 3.3241 10.6188 3.54367 10.3373C3.7298 10.0987 3.94623 9.88225 4.37906 9.44942L10.8289 3.00049Z"
                                                fill="#888EA8"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <textarea id="Textarea" rows={4} className="form-textarea resize-none ps-10 placeholder:text-white-dark" placeholder="Message"></textarea>
                                    <span className="absolute start-4 top-2.5">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M10.2216 15.3539L9.81499 16.0408C9.45262 16.653 8.54735 16.653 8.18498 16.0408L7.7784 15.3539C7.46305 14.8211 7.30537 14.5547 7.05209 14.4074C6.79882 14.2601 6.47995 14.2546 5.8422 14.2436H5.84218C4.90066 14.2274 4.31017 14.1697 3.81494 13.9645C2.89608 13.5839 2.16605 12.8539 1.78545 11.9351C1.5 11.2459 1.5 10.3723 1.5 8.625V7.875C1.5 5.41993 1.5 4.19239 2.0526 3.29063C2.36181 2.78605 2.78605 2.36181 3.29063 2.0526C4.19239 1.5 5.41993 1.5 7.875 1.5H10.125C12.5801 1.5 13.8076 1.5 14.7094 2.0526C15.214 2.36181 15.6382 2.78605 15.9474 3.29063C16.5 4.19239 16.5 5.41993 16.5 7.875V8.625C16.5 10.3723 16.5 11.2459 16.2145 11.9351C15.8339 12.8539 15.1039 13.5839 14.1851 13.9645C13.6898 14.1697 13.0993 14.2274 12.1578 14.2436H12.1578C11.52 14.2546 11.2011 14.2601 10.9479 14.4074C10.6946 14.5547 10.5369 14.8211 10.2216 15.3539Z"
                                                fill="#888EA8"
                                            />
                                            <path
                                                d="M12.75 8.25C12.75 8.66421 12.4142 9 12 9C11.5858 9 11.25 8.66421 11.25 8.25C11.25 7.83579 11.5858 7.5 12 7.5C12.4142 7.5 12.75 7.83579 12.75 8.25Z"
                                                fill="#888EA8"
                                            />
                                            <path
                                                d="M9.75 8.25C9.75 8.66421 9.41421 9 9 9C8.58579 9 8.25 8.66421 8.25 8.25C8.25 7.83579 8.58579 7.5 9 7.5C9.41421 7.5 9.75 7.83579 9.75 8.25Z"
                                                fill="#888EA8"
                                            />
                                            <path
                                                d="M6.75 8.25C6.75 8.66421 6.41421 9 6 9C5.58579 9 5.25 8.66421 5.25 8.25C5.25 7.83579 5.58579 7.5 6 7.5C6.41421 7.5 6.75 7.83579 6.75 8.25Z"
                                                fill="#888EA8"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ContactForm.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default ContactForm;
