import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';

import axios from 'axios';
import useSWR from 'swr';

import { apiUrl, fetcher, fetchwithToken , noImage } from '../../utils/axiosUrl';
import { Space, Pagination, Table, Skeleton } from 'antd';
import CaretLeftOutlined from '@ant-design/icons/CaretLeftOutlined';
import { SearchOutlined } from '@ant-design/icons';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import { DeleteOutlined, FormOutlined, FolderViewOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import SkeltonTable from '../../components/project/SkeltonTable'

import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import { message, Typography, Tooltip, Select, Input } from 'antd';

import { object } from 'yup';
const { Title } = Typography;

export default function AdsPage({ status }) {
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [executeDelete, setExecuteDelete] = useState(false);
    const [modal, setModal] = useState(false);
    const [selectedAds, setSelectedAds] = useState('');
    const [city, setCity] = useState('');

    const [reason, setReason] = useState('');
    const [AdsOption, setAdsOption] = useState(status === undefined ? '' : status);
    const [titleSearch, setTitleSearch] = useState('');

    const router = useRouter();
    const authdata = useSelector((state) => state.auth);
    const { userInfo } = authdata;

    const payload = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            'Content-Type': 'application/json',
        },
    };

    //ftech Cities with SWR
    const { data, error } = useSWR(`${apiUrl}/Lookups/index`, fetcher);

    const CitiesNames = [...new Set(data?.cities.map((Val) => Val))];

    //const CitiesNames =data?.cities.filter(city =>city.id)
    console.log('cities123', CitiesNames);

    const AdsStatusOption = [
        { value: '4', label: 'Banned' },
        { value: '2', label: 'SoldOut' },
        { value: '1', label: 'For Sale' },
        { value: '3', label: 'Archivied' },
        { value: '', label: 'All' },
    ];

    const handleChangeAdsStatus = (value) => {
        console.log(`selected ${value}`);
        setAdsOption(value);
    };

    const handleChangeCity = (value) => {
        console.log(`selected ${value}`);
        setCity(value);
    };

    
  


     const requeestWithtParam = `${apiUrl}/Ads/list_all?adStatusId=${AdsOption}&PageIndex=${page}&PageSize=${size}&AdStatusId=${AdsOption}&Title=${titleSearch}&CityId=${city}`;

    //  const requeestWithtParam = `${apiUrl}/Ads/list_all&PageIndex=${page}&PageSize=${size}&AdStatusId=${AdsOption}&Title=${titleSearch}&CityId=${city}`;

    //const request = status !== undefined && status !== null ? requeestWithtParam : requeestWithouttParam;
    //console.log('status: ' + status);

    
    // Ads/list_all
    const requeestWithouttParam = `${apiUrl}/Ads/list_all?PageIndex=${page}&PageSize=${size}&AdStatusId=${AdsOption}&Title=${titleSearch}&CityId=${city}`;

   const request = requeestWithouttParam  //requeestWithtParam 
  

    useEffect(() => {
        if (!userInfo) {
            router.push('/auth/cover-login');
        }
    }, [userInfo]);

    // fetch All Ads
    useEffect(() => {
        const getProducts = async () => {
            let res;

            try {
                setLoading(true);

                console.log('request' + request);

                res = await axios.get(request, payload);

                console.log('data is-wwwwwwwwww-->', res.data?.data);
                setProducts(res?.data?.data);
                setTotal(res.data?.count);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log('data ERROR-->', err);
                toast.error(err?.message);
            }
        };

        getProducts();
    }, [page, size, executeDelete, AdsOption, titleSearch, city]);

    const onShowSizeChange = (current, size) => {
        setSize(size);
    };

    const handlePaginationChange = (n) => {
        setPage(n);
    };

    const OnBannedAds = async (id) => {
        console.log('deleteded id', userInfo?.token);

        const bodyData = {
            adRefId: id,
            reason: reason,
        };

        try {
            const res = await axios.post(`${apiUrl}/Ads/ban`, bodyData, payload);

            console.log('response BANNED-->', res);
            setExecuteDelete(!executeDelete);
            toast.success('Ads Banned successfully');

            if (res.status === 200) {
                setModal(false);
                setSelectedAds('');
                setReason('');
            }
        } catch (err) {
            console.log('data ERROR Delete->', err?.response?.data?.message);
            toast.error(err?.response?.data?.message);
        }
    };

    const UnBannedAds = async (id) => {
        console.log('unBan id', userInfo?.token);

        try {
            const res = await axios.get(`${apiUrl}/Ads/unban?AdRefId=${id}`, payload);

            console.log('response UNBANNED-->', res?.status);

            setExecuteDelete(!executeDelete);
            toast.success('Ads UnBanned successfully');
        } catch (err) {
            console.log('data ERROR Unbann->', err?.response?.data?.message);
            toast.error(err?.response?.data?.message);
        }
    };

    const handleModal = (ads) => {
        setSelectedAds(ads);
        setModal(true);
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'id',
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'id',
        },
        {
            title: 'Image',
            render: (save) => (
                <>
                    <img className="w-12 h-12 rounded-full object-cover" src={

save?.imageUrl ? 
                        `${apiUrl}/${save?.imageUrl}` :noImage
                
                } alt="" />
                </>
            ),
        },

     

        {
            title: 'CreatedOn',
            render: (save) => (
                <>
                    {moment(save?.createdOn).format('MM/DD/YYYY')}

                    {/* <Tooltip title="username"><CaretLeftOutlined/></Tooltip> */}
                    {/* save.default && <Tooltip title="Save loaded by default"><LeftOutlined/></Tooltip> */}
                </>
            ),
        },

        {
            title: 'UserName',
            render: (save) => (
                <>
                    {save?.createdByDetails?.username}
                    {/* <Tooltip title="username"><CaretLeftOutlined/></Tooltip> */}
                    {/* save.default && <Tooltip title="Save loaded by default"><LeftOutlined/></Tooltip> */}
                </>
            ),
        },

        {
            title: 'Status',
            render: (save) => (
                <>
                    {save?.adStatus?.name === 'For Sale' ? (
                        <p 
                        // onClick={() => handleModal(save?.refId)}
                         className={`bg-success text-white font-semibold cursor-pointer p-1 w-[77px] text-center rounded-md`}>
                            {save?.adStatus?.name}
                        </p>
                    ) : (
                        <p 
                        // onClick={() => UnBannedAds(save?.refId)} 
                        
                        className={`  bg-danger text-white font-semibold cursor-pointer p-1 w-[77px] text-center rounded-md `}>
                            {save?.adStatus?.name}
                        </p>
                    )}
                </>
            ),
        },

        {
            title: 'Actions',
            render: (save) => (
                <>
                    <div className=" flex gap-4">
                        {/* <Tooltip title="Ads details"> */}
                            <Link
                            className='bg-primary p-1 text-center rounded-md text-md font-semibold cursor-pointer list-none  text-white'
                            href={`/ads/adDetails/${save?.refId}`}>
                                Ads Details
                                {/* <FolderViewOutlined style={{ fontSize: '28px', color: 'green', cursor: 'pointer' }} /> */}
                            </Link>
                        {/* </Tooltip> */}

                        <>
                    {save?.adStatus?.name === 'For Sale' ? (
                        <p onClick={() => handleModal(save?.refId)} className={`bg-danger text-white font-semibold cursor-pointer p-1 w-[77px] text-center rounded-md`}>
                         
                         Ban 
                            {/* {save?.adStatus?.name} */}
                        </p>
                    ) : (
                        <p onClick={() => UnBannedAds(save?.refId)} className={`bg-success text-white font-semibold cursor-pointer p-1 w-[77px] text-center rounded-md `}>
                            {/* {save?.adStatus?.name} */}
                            UnBan
                        </p>
                    )}
                </>




                        {/* <Tooltip title="Ads ban">
                            <DeleteOutlined onClick={() => OnBannedAds(save?.refId)} style={{ fontSize: '25px', color: 'red', cursor: 'pointer' }} />
                        </Tooltip> */}






                    </div>
                </>
            ),
        },

        // {
        //   title: "Image",
        //   render: (save)=> <>

        //   <img src={save?.imageUrl} alt="" />

        //   </>,

        // },
    ];

    return (
        <div>
       
            <div className="flex justify-center gap-4 h-8 ">
                <div className="">
                    <p className="text-blue-600 mb-2">Ads Status</p>

                    <Select
                        defaultValue="All"
                        options={AdsStatusOption}
                        style={{
                            width: 150,
                            // height:120,
                        }}
                        onChange={handleChangeAdsStatus}
                    />
                </div>

                <div className="mb-5 h-[100px]">
                    <p className="  text-blue-600 mb-2">Cities</p>
                    {/* <label htmlFor="cities">Cities</label> */}
                    <select className="!h-[34px] !-mt-[2px] form-select" id="cities" value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">All</option>

                        {CitiesNames.map((cityparam) => (
                            <option value={cityparam?.id}>{cityparam?.name}</option>
                        ))}
                    </select>
                </div>

                <div className="">
                    {/* <p>Title</p> */}

                    <Input onChange={(e) => setTitleSearch(e.target.value)} className="w-[250px] h-[35px] mt-[24px] " size="small" placeholder="SearchBy Ads Title" prefix={<SearchOutlined />} />
                </div>
            </div>
            {/* -------------- */}
            {/* {status} */}
            <Toaster position="top-center" />
            <div
                style={{
                    width: '80vw',
                    margin: 'auto',
                    padding: '30px',
                }}
            >
                {!loading && <Title level={2}>Total Ads: {total || 0}</Title>}
                {loading ? (
                    <div className=' mt-12'>
 <SkeltonTable/>
                    </div>
                   
                    // <Skeleton active />
                ) : (
                    <>
                        <Table pagination={false} dataSource={products} columns={columns} rowKey="id" />
                    </>
                )}

                <Space>
                    <Pagination
                        defaultCurrent={page === 0 ? 1 : page}
                        current={page === 0 ? 1 : page}
                        total={total}
                        defaultPageSize={size}
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        pageSizeOptions={['5', '10', '20', '50', '100']}
                        pageSize={size}
                        onChange={handlePaginationChange}
                    />
                </Space>

                {/* -----banned Modal---- */}
                <div>
                    <Transition appear show={modal} as={Fragment}>
                        <Dialog as="div" open={modal} onClose={() => setModal(false)}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black/80" />
                            </Transition.Child>
                            <div id="login_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/6">
                                <div className="flex min-h-screen items-start  mt-[200px] justify-center px-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                            <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                                <h5></h5>
                                                <button type="button" onClick={() => setModal(false)} className="text-red-500 hover:text-dark">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="p-5">
                                                <form>
                                                    <div className=" mb-7 font-semibold  text-red-500">
                                                        <h1>why you want to ban the Ads ?</h1>
                                                    </div>

                                                    <div className="relative mb-4">
                                                        <input
                                                            onChange={(e) => setReason(e.target.value)}
                                                            type="text"
                                                            placeholder="Reason"
                                                            className="form-input ltr:pl-10 rtl:pr-10"
                                                            id="reason_text"
                                                        />

                                                        <p className="my-2">
                                                            {reason === '' && <span className="my-2 text-[15px] font-semibold text-red-500">Please you have to write some reason to ban the Ads</span>}
                                                        </p>
                                                    </div>

                                                    <button disabled={reason === ''} onClick={() => OnBannedAds(selectedAds)} type="button" className="btn btn-danger w-full">
                                                        ban Ads
                                                    </button>
                                                </form>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </div>
    );
}

AdsPage.getInitialProps = async (context) => {
    console.log('Query Status', context?.query?.status);

    return {
        status: context?.query?.status,
    };
};
