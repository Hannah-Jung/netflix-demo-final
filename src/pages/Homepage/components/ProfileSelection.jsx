import React from 'react';
import './ProfileSelection.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const profiles = [
  { id: 1, name: 'Me', imageUrl: 'https://occ-0-465-472.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABYo85Lg8Qn22cahF2sIw7K_gDo3cGpvw3Gt5xl7FIazw864EYeVkm71Qvrlz0HP2fU4n26AVq15v5t8T4lVBpBcqqZbmRHHsMefk.png' },
  { id: 2, name: 'Add Profile', isAdd: true },
];

const ProfileSelection = ({ onSelect }) => (
  <div className="profile-selection">
    <h2 className="who">Who's watching?</h2>
    <div className="profiles">
      {profiles.map(profile =>
        profile.isAdd ? (
          <div className="profile-item">
            <button
            key={profile.id}            
            className="profile-button add-profile-button"
          >
              <FontAwesomeIcon icon={faPlus} size="2x" />            
            </button>
            <div className="profile-label">Add Profile</div>
          </div>          
        ) : (
          <div
            key={profile.id}
            className="profile-item"
            onClick={() => onSelect(profile)}
          >
            <div className="profile-button">
              <img
              src={profile.imageUrl}
            />            
            </div>
            <div className="profile-label">{profile.name}</div>            
          </div>
        )
      )}
    </div>
    <button className="manage-profiles-button">Manage Profiles</button>
  </div>
);

export default ProfileSelection;