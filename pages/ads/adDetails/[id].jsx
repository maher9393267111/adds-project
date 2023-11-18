import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import axios from 'axios';
import { apiUrl, fetcher } from '../../../utils/axiosUrl';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import { Skeleton } from 'antd';
import {motion} from 'framer-motion'

import moment from 'moment';
import SingleItem from '../../../components/project/adsDetailsComponent/singleItem';
import Link from 'next/link';

export default function AdDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProduct = async (idParam) => {
            let res;

            try {
                setLoading(true);

                res = await axios.get(`${apiUrl}/Ads/get/${idParam}`);

                console.log('data is-wwwwwwwwww-->', res?.data);
                setData(res.data);

                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log('data ERROR-->', err);
            }
        };

        if (id) {
            getProduct(id);
        }
    }, [id]);

    const authdata = useSelector((state) => state.auth);

    const { userInfo } = authdata;

    useEffect(() => {
        if (!userInfo) {
            router.push('/auth/cover-login');
        }
    }, [userInfo]);

    return (
        <div className=" m-12">
            {loading ? (
                // <Skeleton active />
                <motion.div
                
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg transition w-[70%] m-auto transform hover:scale-105 h-96 relative bg-gray-200 animate-pulse"
                  >
                    <div className="w-full h-2/3 bg-gray-300 rounded-t-lg"></div>
                    <div className="w-3/4 h-6 bg-gray-300 my-2 mx-auto"></div>
                    <div className="w-1/2 h-4 bg-gray-300 mx-auto"></div>
                  </motion.div>
            ) : (
                <>
                    {/* ads Detials--- */}
                    <div className="panel  w-[80%]  m-auto md:w-[60%]">
                        <div className="mb-5 flex items-center justify-between">
                            <div className='text-center w-full'>

                         
                            <h5 className="!text-xl w-[80%] md:w-1/4  m-auto font-semibold dark:text-white-light text-white p-2 rounded-md text-center mb-2 bg-[#03C03C] mt-2 ">Ads Details</h5>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="flex flex-col items-center justify-center">
                                    <img
                                        src={
                                            !data?.photos[0]?.url
                                                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyXy8C4DCWh3nDKMmsBUPFFERmG6AN0zKfIg&usqp=CAU'
                                                : `${apiUrl}/${data?.photos[0]?.url}`
                                        }
                                        alt="img"
                                        className="mb-5 h-[200px] md:h-[400px] w-[70%] rounded-lg   object-cover"
                                    />
                                    {/* <p className="text-xl font-semibold text-primary">Jimmy Turner</p> */}
                                </div>
                            </div>

                            <SingleItem title={'title'} info={data?.title} />

                            <SingleItem title={'category'} info={data?.category?.name} />

                            <SingleItem title={'description'} info={data?.description} />

                            <SingleItem title={'price'} info={data?.price} />

                            <SingleItem title={'druration'} info={data?.duration?.name} />

                            <SingleItem title={'createdOn'} info={moment(data?.createdOn).format('MM/DD/YYYY')} />
                        </div>
                    </div>

                    {/* ----ads Creator Details--- */}

                    <div className="panel mt-12  w-[80%]  m-auto md:w-[60%]">
                        {/* <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-xl  font-bold dark:text-white-light text-primary mt-2">Ads Creator Details</h5>
                        </div> */}
                           <div className='text-center w-full !my-4'>

                         
<h5 className="!text-xl w-[80%] md:w-1/3   m-auto font-semibold dark:text-white-light text-white p-2 rounded-md text-center mb-2 bg-[#03C03C] mt-2 ">Ads Creator Details</h5>
</div>
                        <div>
                            <div>
                                <div className="flex flex-col items-center justify-center">
                                    <img
                                        src={
                                            !data?.createdByDetails.photoUrl
                                                ? 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                                                : `${apiUrl}/${data?.createdByDetails.photoUrl}`
                                        }
                                        alt="img"
                                        className="mb-5 h-24 w-24 rounded-full  object-cover"
                                    />
                                    {/* <p className="text-xl font-semibold text-primary">Jimmy Turner</p> */}
                                </div>
                            </div>

                            <SingleItem title={'username'} info={data?.createdByDetails?.username} />

                            <SingleItem title={'phone'} info={data?.createdByDetails.mobileNumber} />

                            <SingleItem title={'registration date'} info={moment(data?.createdByDetails?.registrationDate).format('MM/DD/YYYY')} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
