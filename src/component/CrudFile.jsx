import React, { useState } from 'react';
import './CrudFile.css'
function CrudFile() {

  const [formData, setFormData] = useState([]);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [editState, setEditState] = useState(false);
  const [editId, setEditId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editState) {
      const data = {
        id: formData.length + 1,
        name: name,
        gender: gender,
        email: email,
        phone: phone,
      };
      setFormData([data]);
    } else {
    
      const updatedData = formData.map((item) =>
        item.id === editId ? { ...item, name, gender, email, phone } : item
      );
      setFormData(updatedData);
      setEditState(false);
      setEditId(null);
    }

    setName('');
    setGender('');
    setPhone('');
    setEmail('');
  };

  const handleEdit = (data) => {
    setName(data.name);
    setGender(data.gender);
    setPhone(data.phone);
    setEmail(data.email);
    setEditId(data.id);
    setEditState(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this item?")) {
      const updatedData = formData.filter((item) => item.id !== id);
      setFormData(updatedData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br/>
        <br/>
        <label>Gender</label>
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        <br/>
        <br/>
        <label>Phone</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <br/>
        <br/>
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br/>
        <br/>
        <button type="submit">{editState ? 'Update' : 'Submit'}</button>
      </form>
<br/>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrudFile;   