import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState ,Fragment } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Dialog, Transition } from '@headlessui/react';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { apiUrl } from '../../utils/axiosUrl';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Select, Space ,Input ,Skeleton } from 'antd';
import Link from 'next/link';
import SkeltonTable from '../../components/project/SkeltonTable';

export default function UsersTablePage({ status }) {
    const PAGE_SIZE = 10;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [records, setRecords] = useState([]);
    const [count, setCount] = useState(0);
    const [execute, setExecute] = useState(false);
    const [fetching, isFetching] = useState(true);
    const [userStatusId , setUserStatusId] = useState(status === undefined ? '' : status)
    const [nameSearch, setNameSearch] = useState('')
    const [emailSearch, setEmailSearch] = useState('')
    const [numberSearch, setNumberSearch] = useState('')
    const [selectedUser , setSelectedUser] = useState('')
    const [modalAction, setModalAction] = useState('')
    const authdata = useSelector((state) => state.auth);
    const [modal  ,setModal] = useState(false);
     const [loading , setLoading] = useState(false)



    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    const { userInfo } = authdata;

    const payload = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            'Content-Type': 'application/json',
        },
    };


    const useStatusOptions = [
        { value: '2', label: 'Blocked' },
        { value: '1', label: 'Active' },
        { value: '3', label: 'HadAdvertistment' },
        { value: '', label: 'All' },
    ];




    const handleChangeUserStatus = (value) => {
        console.log(`selected ${value}`);
        setUserStatusId(value);
      };


    const requeestWithouttParam = `${apiUrl}/Account/list?PageIndex=${page}&PageSize=${pageSize}&userName=${nameSearch}&UserStatusId=${userStatusId}&Email=${emailSearch}&MobileNumber=${numberSearch}`;

    const request = requeestWithouttParam

   // const requeestWithtParam = `${apiUrl}/Account/list?UserStatusId=${status}&PageIndex=${page}&PageSize=${pageSize}&userName=${nameSearch}&UserStatusId=${userStatusId}&Email=${emailSearch}&MobileNumber=${numberSearch}`;

   

    //const request = status !== undefined && status !== null ? requeestWithtParam : requeestWithouttParam;




    useEffect(() => {
        const fetchData = async () => {
            isFetching(true);
            

            const res = await axios.get(request, payload);
            //                           ,
            let stocks = res.data;
            console.log('stocks', stocks);

            if (res) setRecords(stocks?.data);
            setCount(stocks?.data?.count);
            isFetching(false);
        
        };
        fetchData();
    }, [page, execute ,nameSearch ,userStatusId ,emailSearch ,numberSearch ]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const BlockHandle = async (id) => {
        console.log('deleteded id');

        const dataSended = {
            userId: id,
            blockedUserId: id,
        };

        try {
            const res = await axios.post(`${apiUrl}/Account/block`, dataSended, payload);

            console.log('response Blocked-->', res);
            setExecute(!execute);

            if (res?.status === 200) {
                toast.success('User Blocked successfully');
                setModal(false);
            }
        } catch (err) {
            console.log('data ERROR Delete->', err?.response?.data?.message);
            toast.error(err?.response?.data?.message);
        }
    };

    const UnBlockHandle = async (id) => {
        console.log('unBan id', userInfo?.token);

        const dataSended = {
            userId: id,
            blockedUserId: id,
        };

        try {
            const res = await axios.post(`${apiUrl}/Account/unblock`, dataSended, payload);

            console.log('response UNBANNED-->', res?.status);

            setExecute(!execute);
         

            if (res?.status === 200) {
                toast.success('User UnBlocked successfully');
                setModal(false);
            }




        } catch (err) {
            console.log('data ERROR Unbann->', err?.response?.data?.message);
            toast.error(err?.response?.data?.message);
        }
    };

    return (
        <>
            <Toaster position="top-center" />


{/* -----filter Form ---- */}

<div className='flex justify-center gap-4 my-12 '>
<Select
      defaultValue="All"
      options={useStatusOptions}
      style={{
        width: 120,
      }}
      onChange={handleChangeUserStatus}
      />

<Input
onChange={(e)=>setNameSearch(e.target.value)}
className='w-[250px] ' size="small" placeholder="Search By userName" prefix={<SearchOutlined  />} />


<Input
onChange={(e)=>setEmailSearch(e.target.value)}
className='w-[250px] ' size="small" placeholder="Search By Email" prefix={<SearchOutlined  />} />

<Input
onChange={(e)=>setNumberSearch(e.target.value)}
className='w-[250px] ' size="small" placeholder="Search By PhoneNumber" prefix={<SearchOutlined  />} />

</div>
{/* -------------- */}



{fetching ? (
                    <div className=' mt-12'>
                    <SkeltonTable/>
                                       </div>
                // <Skeleton active />
            ) : (
                <>





            <DataTable
                fetching={fetching}
                highlightOnHover
                className="table-hover whitespace-nowrap"
                minHeight={280}
                maxHeight={280}
                noRecordsText="Users Data"
                withBorder
                borderRadius="md"
                withColumnBorders
                striped
                horizontalSpacing="lg"
                records={records}
                shadow="md"
                // define columns
                columns={[
                    {
                        accessor: 'username',
                        title: 'userName',
                        textAlignment: 'center',
                    },
                    {
                        accessor: 'email',
                        title: 'email',
                        textAlignment: 'center',
                    },
                    {
                        accessor: 'mobileNumber',
                        title: 'phoneNumber',
                        textAlignment: 'center',
                    },

                    {
                        accessor: 'adsCount',
                        title: 'adsCount',
                        textAlignment: 'center',
                    },

                 




                    {
                        accessor: 'createdOn',
                        title: <Text mr="xs">createdOn</Text>,
                        textAlignment: 'center',
                        width: 250,
                        render: (stock) => (
                            <Group spacing={4} position="center" noWrap>
                                <p> {moment(stock?.createdOn).format('MM/DD/YYYY')}</p>
                            </Group>
                        ),
                    },

                    {
                        accessor: 'Status',
                        title: <Text mr="xs">Status</Text>,
                        textAlignment: 'center',
                        width: 250,
                        render: (stock) => (
                            <Group spacing={4} position="center" noWrap>
                                {stock?.userStatus?.name === 'Active' ? (
                                    <>
                                        <p
                                            // onClick={() => {
                                            //     window.confirm('Are you sure?') && BlockHandle(stock?.id);
                                            // }}
                                          
                                            className=" cursor-pointer bg-green  text-white bg-success font-semibold text-md
                                            p-1 w-[77px] text-center rounded-md
                                            "
                                        >
                                            Active
                                        </p>

               

                                    </>
                                ) : (
                                    <>
                                        <p
                                            // onClick={() => {
                                            //     window.confirm('Are you sure?') && UnBlockHandle(stock?.id);
                                            // }}
                                         

                                            className=" cursor-pointer bg-green p-1 w-[77px] text-center rounded-md text-white  bg-danger font-semibold text-md"
                                        >
                                            Blocked
                                        </p>
                                    </>
                                )}


                            </Group>
                        ),
                    },

                    {
                        accessor: 'actions',
                        title: <Text mr="xs">Actions</Text>,
                        textAlignment: 'center',
                        width: 250,
                        render: (stock) => (
                            <Group spacing={4} position="center" noWrap>
                                {stock?.userStatus?.name === 'Active' ? (
                                    <>
                                        <p
                                            // onClick={() => {
                                            //     window.confirm('Are you sure?') && BlockHandle(stock?.id);
                                            // }}
                                            onClick={() => {setModal(true) ; setSelectedUser(stock); setModalAction('block')}}
                                            className=" cursor-pointer bg-green  text-white bg-danger font-semibold text-md
                                            p-1 w-[77px] text-center rounded-md
                                            "
                                        >
                                            Block
                                        </p>

               

                                    </>
                                ) : (
                                    <>
                                        <p
                                            // onClick={() => {
                                            //     window.confirm('Are you sure?') && UnBlockHandle(stock?.id);
                                            // }}
                                            onClick={() => {setModal(true) ; setSelectedUser(stock);setModalAction('activate')}}

                                            className=" cursor-pointer bg-green p-1 w-[77px] text-center rounded-md text-white  bg-success font-semibold text-md"
                                        >
                                            Activate
                                        </p>
                                    </>
                                )}

<Link 
href={`/usersAds/userDetails/${stock?.id}`}

className="bg-primary p-1 text-center rounded-md text-md font-semibold cursor-pointer list-none  text-white ">
                        userDetails
                    </Link>
                            </Group>
                        ),
                    },
                ]}
                // totalRecords={count}
                // recordsPerPage={pageSize}
                // page={page}
                // onPageChange={(p) => setPage(p)}

                totalRecords={count}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={(p) => setPage(p)}
                onRecordsPerPageChange={setPageSize}
                //  recordsPerPageOptions={pageSize}

                //  recordsPerPageOptions={setPageSize}
            />
          
</>
 ) }






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
                                <div className="fixed inset-0 " />
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
                                                <button type="button" onClick={() => setModal(false)} className={`
                                                
                                                ${modalAction === 'activate' ? '  text-success' : ' text-danger'}
                                                hover:text-dark`}>
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
                                                
                                                    <div className={`  mb-7 font-semibold 
                                                    ${modalAction === 'activate' ? '  text-success' : ' text-danger'} 
                                                    `}>
                                                        <h1>Are You Sure You Want {modalAction === 'activate' ? 'Activate' : 'Block'}?</h1>
                                                    </div>

                                           

                                                    <button 
                                                   
                                                        onClick={() => {
                                                            modalAction === 'block' ? 
                                             BlockHandle(selectedUser?.id) : UnBlockHandle(selectedUser?.id);
                                            }}
                                                   
                                                      type="submit" className=
                                                      {`btn ${modalAction === 'activate' ? '  bg-success' : ' btn-danger'}  text-white w-full`}>
                                                        {modalAction === 'activate' ? 'Activate User' : 'Block User'}
                                                    </button>
                                             
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>


        </>
    );
}

UsersTablePage.getInitialProps = async (context) => {
    console.log('Query Status', context?.query?.status);

    return {
        status: context?.query?.status,
    };
};
