import './ProfileStatsComponentStyle.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function ProfileStatsComponent({user}) {
    return(
        <>
            <div className="Profile-component">
                <img src={user.image || '/path/to/default/image.jpg'} alt='Profile' className='profile-component-big-logo' />
                <h1 className='profile-component-big-name-surname'>{`${user.firstName} ${user.lastName}`}</h1>
                <h3 className='profile-component-profile-description'>Description</h3>
                <p className='profile-component-description-text'>{user.description}</p>
                <Link to="/mainpage">
                    <button className='profile-component-edit-button'>EDIT PROFILE</button>
                </Link>
            </div>
        </>
    );
}
ProfileStatsComponent.propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      image: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  };

export default ProfileStatsComponent;