import React from 'react';
import PropTypes from 'prop-types';

// Utils:
import {
  colourToRgbObj,
  getEffectiveRadius,
  calculateBounds,
  produceRgbShades,
  convertObjToString
} from './utils/utils';

// Prop-types:
const propTypes = {
  radius: PropTypes.number.isRequired,
  lineWidth: PropTypes.number.isRequired,
  onColourSelected: PropTypes.func,
  padding: PropTypes.number,
  spacers: PropTypes.object,
  colours: PropTypes.array,
  shades: PropTypes.number,
  dynamicCursor: PropTypes.bool,
  state: PropTypes.string,
  colour: PropTypes.string,
  animated: PropTypes.bool,
  toRgbObj: PropTypes.bool
};

const defaultColours = [
  '#00C3A9',
  '#00B720',
  '#008813',
  '#000000',
  '#FFFFFF',
  '#F8E300',
  '#FF6400',
  '#E20000',
  '#AC000D',
  '#9E005F',
  '#6D0E82',
  '#3B3887',
  '#175FDA',
  '#0091E2',
  '#00BCED',
  '#14E4C5'
];

const defaultProps = {
  colours: defaultColours,
  shades: 16,
  padding: 0,
  dynamicCursor: true,
  animated: true,
  toRgbObj: false
};

// Global-vars:
const fullCircle = 2 * Math.PI;
const quarterCircle = Math.PI / 2;

class ColourWheel extends React.Component {
  constructor(props) {
    super();

    console.log('Constructor');
    // Initialised once the DOM has loaded.
    this.canvasEl = null
    this.ctx = null

    const { radius, lineWidth, padding } = props;

    // Setting effective radii:
    this.outerWheelRadius = radius
    this.innerWheelRadius = this.outerWheelRadius - lineWidth - padding
    this.centerCircleRadius = this.innerWheelRadius - lineWidth - padding
    this.firstSpacerRadius = this.outerWheelRadius - lineWidth // NOTE: effectiveRadius will take into account padding as lineWidth.
    this.secondSpacerRadius = this.innerWheelRadius - lineWidth

    // Defining our bounds-objects, exposes a .inside(e) -> boolean method:
    this.outerWheelBounds = calculateBounds(radius - lineWidth, radius)
    this.innerWheelBounds = calculateBounds(this.innerWheelRadius - lineWidth, this.innerWheelRadius)
    this.centerCircleBounds = calculateBounds(0, this.centerCircleRadius)
    this.firstSpacerBounds = calculateBounds(this.firstSpacerRadius - padding, this.firstSpacerRadius)
    this.secondSpacerBounds = calculateBounds(this.secondSpacerRadius - padding, this.secondSpacerRadius)

  }

  // MARK - Common:
  getRelativeMousePos = (clientX, clientY) => {
    console.log('getRelMousePos');
    const { radius } = this.props

    const canvasPos = this.canvasEl.getBoundingClientRect()
    const h = radius * 2
    const w = radius * 2

    // evtPos relative to our canvas.
    const onCanvas = {
      x: clientX - canvasPos.left,
      y: clientY - canvasPos.top
    }

    // e is our mouse-position relative to the center of the canvasEl; using pythag
    const fromCenter = Math.sqrt((onCanvas.x - (w / 2)) * (onCanvas.x - (w / 2)) + (onCanvas.y - (h / 2)) * (onCanvas.y - (h / 2)))

    // This returns an object in which we have both mouse-pos relative to the canvas, as well as the true-middle.
    return {
      fromCenter,
      onCanvas
    }
  }

  initCanvas = () => {
    console.log('initCanvas');

    const { radius } = this.props

    const width = radius * 2
    const height = radius * 2

    this.ctx.clearRect(0, 0, width, height)

    this.drawOuterWheel()
    this.drawSpacers()
  }

  componentDidMount = () => {
    console.log('compDidMount');
    // Initialising our canvas & context objs.
    this.canvasEl = document.getElementById('colour-picker')
    this.ctx = this.canvasEl.getContext('2d')

    console.log(this.canvasEl);
    console.log(this.ctx);

    this.drawOuterWheel()
    if (this.props.colour) {
      // const rgb = colourToRgbObj(this.props.colour)
      // this.setState({ rgb }, () => {
        this.drawInnerWheel()
        this.drawCenterCircle()
      // })
    }
    this.drawSpacers()
  }

  onCanvasClick = ({ clientX, clientY }) => {
    console.log('onCanvasClick');
    const evt = this.getRelativeMousePos(clientX, clientY)
    // Cases for click-events:
    if (this.outerWheelBounds.inside(evt.fromCenter)) {
      this.outerWheelClicked(evt.onCanvas)
    } else if (this.innerWheelBounds.inside(evt.fromCenter) && this.props.colour) {
      this.innerWheelClicked(evt.onCanvas)
    }
  }

  // MARK - Clicks & action methods:
  outerWheelClicked = (evtPos) => {
    console.log('outWheelClick');
    // returns an rgba array of the pixel-clicked.
    const rgbaArr = this.ctx.getImageData(evtPos.x, evtPos.y, 1, 1).data
    const [r, g, b] = rgbaArr
    const rgb = { r, g, b }

    // Whether the user wants rgb-strings or rgb objects returned.
    const rgbArg = convertObjToString(rgb) // TODO: Let user set different return values in props; e.g. rbg obj, string, etc.

    this.props.onColourSelected(rgbArg)

    // this.drawInnerWheel()
    // this.drawCenterCircle()
  }

  innerWheelClicked = (evtPos) => {
    console.log('innWheelClick');

    const rgbaArr = this.ctx.getImageData(evtPos.x, evtPos.y, 1, 1).data
    const [r, g, b] = rgbaArr

    const rgb = { r, g, b }

    const rgbArg = convertObjToString(rgb)

    this.props.onColourSelected(rgbArg)
  }

  // MARK - Drawing:
  drawOuterWheel = () => {
    console.log('drawOutWheel');
    // TODO: Draw outline; separate method.
    const { radius, colours, lineWidth } = this.props
    const height = radius * 2
    const width = radius * 2

    // This value ensures that the stroke accounts for the lineWidth provided to produce an accurately represented radius.
    const effectiveRadius = getEffectiveRadius(radius, lineWidth)

    // Converting each colour into a relative rgb-object we can iterate through.
    const rgbArr = colours.map(colour => colourToRgbObj(colour))

    rgbArr.forEach((rgb, i) => {
      this.ctx.beginPath()

      // Creates strokes 1 / rgbArr.length of the circle circumference.
      const startAngle = (fullCircle / rgbArr.length) * i
      const endAngle = (fullCircle / rgbArr.length) * (i + 1)

      this.ctx.arc(width / 2, height / 2, effectiveRadius, startAngle, endAngle)
      this.ctx.lineWidth = lineWidth // This is the width of the innerWheel.

      // Stroke-style changes based on the shade:
      this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
      this.ctx.stroke()
      this.ctx.closePath()
    })
  }

  drawSpacers = () => {
    console.log('drawSpacers');

    if (this.props.spacers) {
      this.drawSpacer(this.firstSpacerRadius)
      this.drawSpacer(this.secondSpacerRadius)
    }
  }

  drawSpacer = (spacerRadius) => {
    const { radius, padding, spacers: { colour, shadowColour, shadowBlur } } = this.props

    const height = radius * 2
    const width = radius * 2

    const effectiveRadius = getEffectiveRadius(spacerRadius, padding)

    this.ctx.beginPath()

    this.ctx.arc(width / 2, height / 2, effectiveRadius, 0, fullCircle)
    this.ctx.lineWidth = padding

    this.ctx.shadowColor = shadowColour
    this.ctx.shadowBlur = shadowBlur
    this.ctx.strokeStyle = colour
    this.ctx.stroke()
    this.ctx.closePath()

    // To reset our shadowColor for other strokes.
    this.ctx.shadowColor = 'transparent'
  }

  drawInnerWheel = (animationPercentage = 0) => {
    console.log('drawInnerWheel');

    // raf setup.
    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
    window.requestAnimationFrame = requestAnimationFrame

    console.log(this.props.colour);
    const { r, g, b } = colourToRgbObj(this.props.colour);
    console.log({r,g,b});
    const { radius, lineWidth, shades, animated } = this.props

    const height = radius * 2
    const width = radius * 2

    const effectiveRadius = getEffectiveRadius(this.innerWheelRadius, lineWidth)

    // Re-initialising canvas.
    this.ctx.clearRect(0, 0, width, height)

    this.drawOuterWheel()
    this.drawSpacers()

    const rgbShades = produceRgbShades(r, g, b, shades)
    console.log(rgbShades);

    // Different functions for drawing our inner-wheel of shades.
    const drawShades = () => {
      rgbShades.forEach((rgb, i) => {
        this.ctx.beginPath()

        const startAngle = ((fullCircle / rgbShades.length) * i) + quarterCircle
        const endAngle = ((fullCircle / rgbShades.length) * (i + 1)) + (1 / 2) * Math.PI

        this.ctx.arc(width / 2, height / 2, effectiveRadius, startAngle, endAngle)
        this.ctx.lineWidth = lineWidth // This is the width of the innerWheel.

        // Stroke style changes based on the shade:
        this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        this.ctx.stroke()
        this.ctx.closePath()
      })
    }

    const animateShades = () => {
      rgbShades.forEach((rgb, i) => {
        this.ctx.beginPath()

        const startAngle = ((fullCircle / rgbShades.length) * i) + quarterCircle
        const endAngle = ((fullCircle / rgbShades.length) * (i + 1)) + (1 / 2) * Math.PI

        this.ctx.arc(width / 2, height / 2, effectiveRadius, startAngle, endAngle)
        this.ctx.lineWidth = lineWidth * animationPercentage // This is the width of the innerWheel.

        // Stroke style changes based on the shade:
        this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        this.ctx.stroke()
        this.ctx.closePath()
      })

      // TODO: Make this animation speed dynamic.
      animationPercentage += (1 / 10) // i.e. 1 / x frames

      // Essentially re-draws rgbShades.forEach until the animationPercentage reaches 1, i.e. 100%
      if (animationPercentage < 1) requestAnimationFrame(animateShades)
    }

    // animateShades = animateShades.bind(this)
    // drawShades = drawShades.bind(this)

    if (animated) {
      animateShades()
    } else { // TODO: Refactor into its own func.
      drawShades()
    }
  }

  drawCenterCircle () {
    console.log('drawCenterCircle');

    const rgb = colourToRgbObj(this.props.colour);
    const { radius } = this.props

    const height = radius * 2
    const width = radius * 2
    this.ctx.lineWidth = 0

    this.ctx.beginPath()
    this.ctx.arc(width / 2, height / 2, this.centerCircleRadius, 0, 2 * Math.PI)
    this.ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    this.ctx.fill()
    this.ctx.lineWidth = 0.1
    this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    this.ctx.stroke()
    this.ctx.closePath()
  }

  componentDidUpdate = () => {
    console.log('compDidUpdate');

    this.drawOuterWheel()
    console.log(this.props.colour);
    if (this.props.colour) {
      this.drawInnerWheel()
      this.drawCenterCircle()
    }
    this.drawSpacers()
  }

  render = () => {
    console.log('render');

    const { radius } = this.props
    return (
      <canvas
          id='colour-picker'
          onClick={this.onCanvasClick}
          width={`${radius * 2}px`}
          height={`${radius * 2}px`}
        />
      )
  }
}

ColourWheel.propTypes = propTypes
ColourWheel.defaultProps = defaultProps

export default ColourWheel
