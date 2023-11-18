import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';

import axios from 'axios';
import useSWR from 'swr';

import { apiUrl, fetcher } from '../../utils/axiosUrl';
import { Space, Pagination, Table, Skeleton } from 'antd';
import CaretLeftOutlined from '@ant-design/icons/CaretLeftOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import { DeleteOutlined, FormOutlined, FolderViewOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import SkeltonTable from '../../components/project/SkeltonTable';

import { message, Typography, Tooltip } from 'antd';
import { object } from 'yup';
const { Title } = Typography;

export default function NotificationsPage() {
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [notifs, setNotif] = useState([]);
    const [audiences, setAudiences] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedNotif, setSelectedNotif] = useState('');
    const [reason, setReason] = useState('');
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [executeData, setExecuteData] = useState(false);

    const [params, setParams] = useState({
        title: '',
        message: '',
        audience: '',
    });

    const router = useRouter();
    const authdata = useSelector((state) => state.auth);

    const { userInfo } = authdata;

    const payload = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        if (!userInfo) {
            router.push('/auth/cover-login');
        }
    }, [userInfo]);

    useEffect(() => {
        const getNotifications = async () => {
            let res;

            try {
                setLoading(true);

                res = await axios.get(`${apiUrl}/Notifications/list?PageIndex=${page}&PageSize=${size}`, payload);

                console.log('data Notifications ---->', res?.data);
                setNotif(res?.data?.data);
                setTotal(res?.data?.count);

                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log('data ERROR-->', err);
            }
        };

        const getAudiences = async () => {
            const res = await axios.get(`${apiUrl}/Lookups/audiences`);

            setAudiences(res.data);
        };

        getNotifications();
        getAudiences();
    }, [executeData, page, size]);

    const changeValue = (e) => {
        const { value, id } = e.target;

        setParams({ ...params, [id]: value });
    };

    const OpenModal = async (e) => {
        e.preventDefault();
        setAddTaskModal(true);
    };


    const OpenDeleteModal = async (id ) => {
        //e.preventDefault();
        setDeleteModal(true);
        setSelectedNotif(id)
    };



    const onShowSizeChange = (current, size) => {
        setSize(size);
    };

    const handlePaginationChange = (n) => {
        setPage(n);
    };

    const handleAddAudience = async () => {
        try {
            setLoading(true);

            const postData = {
                title: params.title,
                messageBody: params.message,
                audienceId: params.audience,
            };

            const res = await axios.post(`${apiUrl}/Notifications`, postData, payload);

            console.log('response', res);

            if (res.status === 200) {
                setExecuteData(!executeData);
                toast.success('Audience added successfully');

                setParams({ title: '', message: '', audience: '' });
                setAddTaskModal(false);
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log('id', id);
            //   setLoading(true);

            const res = await axios.get(`${apiUrl}/Notifications/delete_notification/${id}`, payload);

            console.log('response', res);

            if (res.status === 200) {
                setExecuteData(!executeData);
                toast.success('Notification Deleted successfully');
                setDeleteModal(false)
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'id',
        },

        {
            title: 'messageBody',
            dataIndex: 'messageBody',
            key: 'id',
        },

        {
            title: 'CreatedOn',
            render: (save) => <>{moment(save?.createdOn).format('MM/DD/YYYY')}</>,
        },

        {
            title: 'Audience',
            render: (save) => (
                <>
                    <p>{save?.audience?.name}</p>
                </>
            ),
        },

        {
            title: 'Actions',
            render: (save) => (
                <>
                    <div className=" flex gap-4">
                        {/* <Tooltip title="Ads details">
                            <Link href={`/ads/adDetails/${save?.refId}`}>
                                <FolderViewOutlined style={{ fontSize: '28px', color: 'green', cursor: 'pointer' }} />
                            </Link>
                        </Tooltip> */}

                        <Tooltip title="Notification Delete">
                            <DeleteOutlined
                            onClick={()=>OpenDeleteModal(save?.id)}
                            //  onClick={() => handleDelete(save?.id)} 
                             
                             
                             
                             style={{ fontSize: '25px', color: 'red', cursor: 'pointer' }} />

                        </Tooltip>






                    </div>
                </>
            ),
        },
    ];

    return (
        <div>
            <div className=" my-4 flex mx-12 justify-between ">
                <div></div>

                <div>
                    <button className="btn btn-primary w-full" type="button" onClick={OpenModal}>
                        <svg className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add New Notification
                    </button>


{/* Add New Notification Modal */}


                    <div>
                        <Transition appear show={addTaskModal} as={Fragment}>
                            <Dialog as="div" open={addTaskModal} onClose={() => setAddTaskModal(false)} className="relative z-50">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-[black]/60" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                                <button
                                                    type="button"
                                                    onClick={() => setAddTaskModal(false)}
                                                    className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
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
                                                <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pr-5 rtl:pl-[50px] dark:bg-[#121c2c]">Add</div>
                                                <div className="p-5">
                                                    <form>
                                                        <div className="mb-5">
                                                            <label htmlFor="title">Title</label>
                                                            <input id="title" type="text" placeholder="Enter Title" className="form-input" value={params.title} onChange={(e) => changeValue(e)} />
                                                        </div>

                                                        <div className="mb-5">
                                                            <label htmlFor="message">Message</label>
                                                            <input
                                                                id="message"
                                                                type="text"
                                                                placeholder="Enter message"
                                                                className="form-input"
                                                                value={params.message}
                                                                onChange={(e) => changeValue(e)}
                                                            />
                                                        </div>

                                                        <div className="mb-5">
                                                            <label htmlFor="audience">audience</label>
                                                            <select id="audience" className="form-select" value={params.selectedAudience} onChange={(e) => changeValue(e)}>
                                                                {audiences.map((audience) => (
                                                                    <option value={audience?.id}>{audience?.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="mt-8 flex items-center justify-end ltr:text-right rtl:text-left">
                                                            <button type="button" className="btn btn-outline-danger" onClick={() => setAddTaskModal(false)}>
                                                                Cancel
                                                            </button>
                                                            <button
                                                                disabled={params.title === '' || params.message === '' || params.audience === ''}
                                                                type="button"
                                                                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                                onClick={handleAddAudience}
                                                            >
                                                                Add
                                                            </button>
                                                        </div>
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


{/* DELETE MODAL--- */}


<div>
                    <Transition appear show={deleteModal} as={Fragment}>
                        <Dialog as="div" open={deleteModal} onClose={() => setDeleteModal(false)}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0   bg-[black]/60" />
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
                                                <button type="button" onClick={() => setDeleteModal(false)} className={`
                                                
                                                  text-danger'}
                                                hover:text-dark text-danger`}>
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
                                                
                                                    <div className=
                                                    
                                                    {`  mb-7 font-semibold  
                                                     
                                                    `}>
                                                        <h1 className='text-sm'>Are You Sure You Want  Delete Notification ?
                                                            </h1>
                                                    </div>

                                           

                                                    <button 
                                                   
                                                   onClick={() => handleDelete(selectedNotif)} 
                                                   
                                                      type="submit" className= 'text-white w-full bg-danger btn' >
                                                        Delete
                                                      
                                                    </button>
                                             
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>





            <Toaster position="top-center" />
            {loading ? (
                // <Skeleton active />
                <div className=' mt-12'>
                <SkeltonTable/>
                                   </div>
            ) : (
                <>
                    <Table pagination={false} dataSource={notifs} columns={columns} rowKey="id" />
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
        </div>
    );
}
