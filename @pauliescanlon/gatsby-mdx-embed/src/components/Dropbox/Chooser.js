import React, { Fragment, useEffect, useState } from "react"
// import PropTypes from "prop-types"

import { createScriptTag } from "../../utils"
import { chooserOptions } from "./chooseOptions"

export const Chooser = () => {
  const [chooserResponse, setChooserResponse] = useState({
    isLoading: true,
    link: "",
  })

  // TODO maybe this id should be unique
  const dropboxEmbedId = "dropboxjs"
  const dropboxEmbedUrl = `https://www.dropbox.com/static/api/2/dropins.js`

  useEffect(() => {
    const chooserCallback = () => {
      if (chooserResponse.isLoading) {
        setChooserResponse({
          isLoading: false,
          link: window.Dropbox.createChooseButton(chooserOptions),
        })
      }
    }

    createScriptTag(
      dropboxEmbedUrl,
      null,
      dropboxEmbedId,
      {
        name: "data-app-key",
        // TODO Store this key somehwere
        value: "tc29unvy638p3bp",
      },
      () => chooserCallback()
    )
  }, [dropboxEmbedUrl, chooserResponse.isLoading])

  return (
    !chooserResponse.isLoading && (
      <Fragment>
        <div
          dangerouslySetInnerHTML={{
            __html: chooserResponse.link.outerHTML,
          }}
        />
      </Fragment>
    )
  )
}
