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
        <form>
          <label>
            User name : 
            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)} // Modifiable
            />
          </label>
          <label>
            First name : 
            <input type="text" value={user.firstName} disabled /> {/* Grisé */}
          </label>
          <label>
            Last name : 
            <input type="text" value={user.lastName} disabled /> {/* Grisé */}
          </label>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default EditUser;