import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../Redux/userSlice';

function EditUser({ user, token }) {
  const dispatch = useDispatch();
  const [userName, setUsername] = useState(user.userName || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log("Saving userName:", userName);
    dispatch(updateUser({ userName, token }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing ? (
        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
      ) : (
        <form className="form" >
          <label className='form-label' >
            User name: 
            <input className='form-input'
              type="text"
              defaultValue={user.userName}
              onChange={(e) => setUsername(e.target.value)} // Modifiable
            />
          </label>
          <label className='form-label' >
            First name: 
            <input className='form-input disabled' type="text" value={user.firstName} disabled /> {/* Grisé */}
          </label>
          <label className='form-label' >
            Last name: 
            <input className='form-input disabled' type="text" value={user.lastName} disabled /> {/* Grisé */}
          </label>
          <div>
            <button className='form-button' type="button" onClick={handleSave}>Save</button>
            <button className='form-button' type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditUser;