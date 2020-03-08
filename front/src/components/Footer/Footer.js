// import React from 'react';
// import { NavLink } from 'react-router-dom'

// import './Footer.scss';

// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import iconLightOn from '../../res/icons/light-cl-40.png';
// import iconTempOn from '../../res/icons/temp-cl-40.png';
// import iconHomeOn from '../../res/icons/home-cl-40.png';
// import iconPlantOn from '../../res/icons/plant-cl-40.png';
// import iconRaspiOn from '../../res/icons/raspi-cl-40.png';
// import iconLightOff from '../../res/icons/light-bw-40.png';
// import iconTempOff from '../../res/icons/temp-bw-40.png';
// import iconHomeOff from '../../res/icons/home-bw-40.png';
// import iconPlantOff from '../../res/icons/plant-bw-40.png';
// import iconRaspiOff from '../../res/icons/raspi-bw-40.png';

// const Footer = ({ location }) => {

//   const Button = ({ href, iconOn, iconOff, ...props }) => {
//   console.log(location);
//   console.log(`Location: ${location}, href:${href}`)
//     return (
//     <button className="">
//       <NavLink to={href} activeClassName="active" {...props}>
//         <img src={location == href ? iconOn : iconOff} />
//       </NavLink>
//     </button>
//   )};

//   return(
//     <footer className="w3-center w3-card w3-white Footer">
//       <Button href="/lights"
//         iconOn={iconLightOn} iconOff={iconLightOff} />
//       <Button href="/temperature"
//         iconOn={iconTempOn} iconOff={iconTempOff} />
//       <Button exact href="/"
//         iconOn={iconHomeOn} iconOff={iconHomeOff} />
//       <Button href="/plants"
//         iconOn={iconPlantOn} iconOff={iconPlantOff} />
//       <Button href="/raspi"
//         iconOn={iconRaspiOn} iconOff={iconRaspiOff} />
//     </footer>
// )};

// export default Footer;
