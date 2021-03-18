import React, { Component } from "react";
import PropTypes from "prop-types";
class Container extends Component {
  render() {
    const {
      children,
      stylesOutside,
      stylesInside,
      tag: Tag,
      marginBottom,
      navRef,
      ...rest
    } = this.props;

    return (
      <Tag className={`w-full ${stylesOutside ? stylesOutside : ""}`} {...rest}>
        <div
          ref={navRef}
          className={`${
            marginBottom && Tag !== "nav" && Tag !== "footer"
              ? marginBottom
              : !marginBottom && (Tag === "nav" || Tag === "footer")
              ? ""
              : "mb-16"
          } mx-auto max-w-screen-desktop-big ${
            stylesInside ? stylesInside : ""
          }`}
        >
          {children}
        </div>
      </Tag>
    );
  }
}

Container.defaultProps = {
  stylesOutside: "",
  stylesInside: "",
};

Container.propTypes = {
  stylesOutside: PropTypes.string,
  stylesInside: PropTypes.string,
  tag: PropTypes.string.isRequired,
  marginBottom: PropTypes.string,
};

export default Container;
