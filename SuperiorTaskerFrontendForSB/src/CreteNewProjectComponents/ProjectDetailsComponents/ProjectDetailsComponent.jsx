import { useEffect, useState } from 'react';
import './ProjectDetailsComponentStyle.css';
import PropTypes from 'prop-types';

function ProjectDetailsComponent({ user, setNewProject }) {
    const [project, setProject] = useState({
        userId: user.id,
        title: '',
        description: '',
        date: '',
        completion: '0%'
    });

    useEffect(() => {
        setProject(prevProject => ({
            ...prevProject,
            userId: user.id
        }));
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prevProject => ({
            ...prevProject,
            [name]: value
        }));
        setNewProject(prevProject => ({
            ...prevProject,
            [name]: value,
            userId: user.id 
        }));
    };

    return (
        <div className="desc-screen">
            <h2 className="project-title">Project Title</h2>
            <input onChange={handleChange} className="project-name-input" name="title" placeholder="Enter project name..." />

            <h2 className="project-description">Description</h2>
            <textarea onChange={handleChange} className="project-description-name-input" name="description" placeholder="Enter project description..."></textarea>

            <h2 className='project-date'>Date</h2>
            <input onChange={handleChange} className='project-date-input' name="date" placeholder='Enter final date here' />
        </div>
    );
}

ProjectDetailsComponent.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    setNewProject: PropTypes.func.isRequired,
};

export default ProjectDetailsComponent;
