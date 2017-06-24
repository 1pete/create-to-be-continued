// @flow

import React, { Component } from 'react'

import type { Photo } from '../../types'

type PhotoCustomizeProps = {
  photo: Photo,
  customize: Function,
}

class PhotoCustomize extends Component {
  props: PhotoCustomizeProps
  onColorChangeWrapper: Function
  onOpacityChange: Function
  onSizeChange: Function
  onMarginXChange: Function
  onMarginYChange: Function

  constructor() {
    super()

    this.onColorChangeWrapper = (event: any) => {
      this.customize('filterColor', event.target.value)
    }

    const wrapper = (prop): Function =>
      (event: any) => this.customize(prop, event.target.value)

    this.onOpacityChange = wrapper('filterOpacity')
    this.onSizeChange = wrapper('logoScale')
    this.onMarginXChange = wrapper('logoMarginLeft')
    this.onMarginYChange = wrapper('logoMarginBottom')
  }

  customize(prop: string, value: any) {
    this.props.customize(prop, value)
  }

  render() {
    const {
      photo: {
        filterColor,
        filterOpacity,
        logoScale,
        logoMarginLeft,
        logoMarginBottom,
      },
    } = this.props

    return (
      <div className="photo-customize">
        <div className="customize-group">
          <span>Color</span>
          <input type="color" defaultValue={filterColor} onChange={this.onColorChangeWrapper} />
        </div>
        <div className="customize-group">
          <span>Opacity</span>
          <input
            type="range"
            min={0}
            max={0.5}
            step={0.01}
            defaultValue={filterOpacity}
            onChange={this.onOpacityChange}
          />
        </div>
        <div className="customize-group">
          <span>Size</span>
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            defaultValue={logoScale}
            onChange={this.onSizeChange}
          />
        </div>
        <div className="customize-group">
          <span>Margin X</span>
          <input
            type="range"
            min={0}
            max={30}
            step={0.5}
            defaultValue={logoMarginLeft}
            onChange={this.onMarginXChange}
          />
        </div>
        <div className="customize-group">
          <span>Margin Y</span>
          <input
            type="range"
            min={0}
            max={30}
            step={0.5}
            defaultValue={logoMarginBottom}
            onChange={this.onMarginYChange}
          />
        </div>
      </div>
    )
  }
}

export default PhotoCustomize
