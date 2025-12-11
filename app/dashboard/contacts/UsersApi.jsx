import axiosInstance from "../../../services/axiosConfig";

export const getData = async ({ page, pageSize, search }) => {
    const res = await axiosInstance.get(`/api/users?page=${page}&page_size=${pageSize}&search=${search}&role=customer`);
    return res.data;
};

export const deleteData = async (id) => {
    return axiosInstance.delete(`/api/users${id}`);
};

export const saveOrUpdateData = async (data) => {
    console.log(data,"../")
    return data?._id
        ? axiosInstance.patch(`/api/users/${data._id}`, data)
        : axiosInstance.post(`/api/users`,data);
};
