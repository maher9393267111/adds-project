import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRouter } from 'next/router';
import Dropdown from '../components/Dropdown';
import { setPageTitle } from '../store/themeConfigSlice';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { apiUrl } from '@/utils/axiosUrl';
import {Skeleton } from 'antd';
import StaticCard from '../components/project/StaticCard';
import { motion } from 'framer-motion';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});
import Link from 'next/link';

// interface AdsType {
//     archived:number,
//     banned:number,
//     forsale:number,
//     soldOut:number
//   }

const Index = () => {
    const [adsData, setAdsData] = useState({});
    const [usersData, setUsersData] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(setPageTitle('Sales Admin'));
    });
    const isDark = useSelector((state) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const authdata = useSelector((state) => state.auth);
    console.log('authdata', authdata);
    const { userInfo } = authdata;

    const router = useRouter();
    // get redirect from url
    const { redirect } = router.query;

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    });

    useEffect(() => {
        if (!userInfo) {
            router.push('/auth/cover-login');
        }
    }, [userInfo]);

    useEffect(() => {
        const getAds = async () => {
            setLoading(true);
            const res = await axios.get(`${apiUrl}/Statistics/ad_stats`);

            console.log('ads stats available', res?.data);
            setAdsData(res?.data);
            setLoading(false);
        };

        const getUsers = async () => {
            setLoading(true);
            const res = await axios.get(`${apiUrl}/Statistics/user_stat`);

            console.log('users stats available', res?.data);
            //setAdsData(res?.data);
            setUsersData(res?.data);
            setLoading(false);
        };

        getAds();
        getUsers();
    }, []);

    return (
        <>
          {loading ? (
                    
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
{Array(7)
                .fill()
                .map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg transition transform hover:scale-105 h-[177px] p-4 relative bg-gray-200 animate-pulse"
                  >
                    <div className="w-full h-2/3 bg-gray-300 rounded-t-lg"></div>
                    <div className="w-3/4 h-6 bg-gray-300 my-2 mx-auto"></div>
                    <div className="w-1/2 h-4 bg-gray-300 mx-auto"></div>
                  </motion.div>
                ))
}
                     </div>

                    
    )

                
                
                
                
                : (

                    <>


            {/* ----ADS CARDS-- */}
            <div>
                {/* <div className='mx-12 text-3xl'><h2>Ads Data </h2></div> */}

                <div className="flex mb-12 flex-wrap  mx-12 !mt-12 !m-auto w-[90%]">
                    <StaticCard page="ads" params="4" title="Banned Ads" staticNimber={adsData?.banned} bgColor={'bg-danger'} />
                    <StaticCard page="ads" params="3" title="Archived Ads" staticNimber={adsData?.archived} bgColor={'bg-[#e2a03f]'} />
                    <StaticCard page="ads" params="1" title="For Sale Ads" staticNimber={adsData?.forSale} bgColor={'bg-green-700'} />
                    <StaticCard page="ads" params="2" title="Sold Out Ads" staticNimber={adsData?.soldOut} bgColor={'bg-blue-700'} />
                </div>
            </div>

            {/* ----Users CARDS-- */}
            <div className="flex mb-12 flex-wrap gap-2 mx-12 !mt-12 !m-auto w-[90%]">
                <StaticCard page="usersAds" params="2" title="Blocked Users" staticNimber={usersData?.blocked} bgColor={'bg-danger'} />
                <StaticCard page="usersAds" params="1" title="Active Users" staticNimber={usersData?.active} bgColor={'bg-[#e2a03f]'} />

                <StaticCard page="usersAds" params="3" title="HadAdvertisment Users" staticNimber={usersData?.hadAdvertisement} bgColor={'bg-blue-700'} />
            </div>
            </>

                )}
            
        </>
    );
};

export default Index;
