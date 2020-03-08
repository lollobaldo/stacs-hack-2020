import constants from './_constants.scss';

const { red, yellow, purple } = constants;
const { redG, purpleG, blackG } = constants;

export const presets = [
  {
    name: 'Romantic',
    color: red,
    bg: redG,
    icon: 'heart',
  },{
    name: 'Movie',
    color: purple,
    bg: purpleG,
    icon: 'film',
  },{
    name: 'Night',
    color: yellow,
    bg: blackG,
    icon: 'moon',
  },
];
