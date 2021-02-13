import React from 'react'
import PropTypes from 'prop-types'
import { drawContributions } from "github-contributions-canvas";

const Git = () => {
    drawContributions(canvasEl, {
        data: contributionData,
        username: "iamyoungjin",
        themeName: "standard",
        footerText: "Made by @sallar - github-contributions.now.sh"
      });

    return (
        <div>
            <drawContributions/>
        </div>
    )
}

Git.propTypes = {

}

export default Git

