import axios from "axios";
export const apiUrl = "https://easydeal.mdawaina.online/api"

export const fetcher = (url ,payload) => axios.get(url ,payload).then((res) => res.data);
// Image Url --> {`${apiUrl}/${data?.photos[0]?.url}`}


export const defaultUserImage ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2ZekpuM-VfPNYLiVl-P2-XNcsNhgZ7MuQK6QATA&s'
export const noImage ='https://www.ncenet.com/wp-content/uploads/2020/04/no-image-png-2.png'
export const fetchwithToken= (url, token) => {
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then((res) => res.data);}



// export const fetchwithToken = async (url ,token) => {
//     const response = await axios.get(
//       `${apiUrl}/${url}`, token
//     );
//     return response.data;
//   };




