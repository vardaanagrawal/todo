import axios from "axios";

export const signup = async (name, email, password) => {
  const res = await axios.post(`/signup`, {
    name: name,
    email: email,
    password: password,
  });
  return res;
};

export const login = async (email, password) => {
  console.log(email);
  const res = await axios.post(`/login`, {
    email: email,
    password: password,
  });
  return res;
};

export const getInfo = async (email) => {
  const res = await axios.post(`/userInfo/get`, { email: email });
  return res;
};

export const updatePassword = async (email, cpassword, npassword) => {
  const res = await axios.post(`/userPassword/update`, {
    email: email,
    cpassword: cpassword,
    npassword: npassword,
  });
  return res;
};

export const updateUserName = async (email, name) => {
  const res = await axios.post(`/userName/update`, {
    email: email,
    name: name,
  });
  return res;
};

export const deleteAccount = async (id,email) => {
    const res = await axios.post(`/deleteAccount`,{id: id, email: email});
    return res;
}

export const addListItem = async (email, item) => {
  const res = await axios.post(`/listItem/add`,{
    email: email,
    listItem: item
  });
  return res;
}

export const getList = async (email) => {
  const res = await axios.post(`/list/get`,{email:email});
  return res;
}

export const deleteItem = async (email, id) => {
  const res = await axios.post(`/list/delete`,{email: email, id: id});
  return res;
}

export const updateStatus = async (email, id) => {
  const res = await axios.post(`/list/status/update`, {email: email,id:id});
  return res;
}

export const updateListItem = async (email, id, title, desc, date, completed) => {
  const res = await axios.post(`/list/update`, {email: email,id:id, title: title, desc: desc, date: date, completed: completed});
  return res;
}
