import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import CategoryForm from '../../components/Form/CategoryForm'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Modal } from 'antd';


const CreateCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [selected, setSelected] = useState(null);

  //add category form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/category`, { name });
      if (data?.success) {
        toast.success(`${name} is created.`);
        setName('');
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status) {
        toast.error(error.response.data.error);
      }
    }
  }

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/category/${selected._id}`, { name: updatedName });
      if (data?.success) {
        toast.success(`${updatedName} is updated.`);
        setUpdatedName('');
        setVisible(false);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status) {
        toast.error(error.response.data.error);
      }
    }
  }

  //delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/category/${id}`);
      if (data?.success) {
        toast.success(`Category is deleted.`);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status) {
        toast.error(error.response.data.error);
      }
    }
  }

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status) {
        toast.error(error.response.data.error);
      }
    }
  }


  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className='container-fluid m-3 p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage Category</h1>
            <div className='p-3'>
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className='w-75'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>
                        <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(category.name); setSelected(category) }}>Edit</button>
                        <button className='btn btn-danger ms-2' onClick={() => { handleDelete(category._id) }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel={() => { setVisible(false) }} footer={null} open={visible}><CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} /></Modal>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory