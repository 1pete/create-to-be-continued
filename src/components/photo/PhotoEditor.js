// @flow

import React, { Component } from 'react'

import tbcImage from '../../contents/tbc.png'

import type { Photo } from '../../types'

type PhotoEditorProps = {
  photo: Photo,
}

class PhotoEditor extends Component {
  props: PhotoEditorProps
  container: any

  render() {
    const { photo: { data } } = this.props

    const a = {
      filterColor: '#FFA726',
      filterOpacity: 0.3,
      logoScale: 15,
      logoMarginLeft: 3,
      logoMarginBottom: 3,
    }

    const { filterColor, filterOpacity, logoScale, logoMarginLeft, logoMarginBottom } = a

    return (
      <div
        className="photo-editor"
        ref={(node) => { this.container = node }}
      >
        <img
          src={data}
          className="target-image"
          alt=""
        />
        <div
          className="filter"
          style={{
            backgroundColor: filterColor,
            opacity: filterOpacity,
          }}
        />
        <img
          src={tbcImage}
          className="logo-image"
          alt=""
          style={{
            left: `${logoMarginLeft}%`,
            bottom: `${logoMarginBottom}%`,
            height: `${logoScale}%`,
          }}
        />
      </div>
    )
  }
}

export default PhotoEditor
