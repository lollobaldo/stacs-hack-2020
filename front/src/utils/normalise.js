import objectAssign from 'object-assign';

// Normalise json from children object.
// Used to let `initialState.js` be more readable.
const normalise = (json) => {
  // Return new object with projects sub-object
  let ret= objectAssign({}, json, {projects: {}});
  // Map folders by only keeping project id
  ret.folders = ret.folders.map((folder) => {
    return {
      folder_name: folder.folder_name,
      projects: folder.projects.map((project) => {
        // Add project to projects object, with id as key
        ret.projects[project.id] = project;
        return project.id
      })
    }
  });
  return ret;
};

export default normalise;