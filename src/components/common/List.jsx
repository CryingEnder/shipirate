import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function List({
  items,
  itemsStyle,
  title,
  titleStyle,
  doToggleWindow,
  ...props
}) {
  return (
    <ul {...props}>
      {title && (
        <strong className={`block${titleStyle ? ` ${titleStyle}` : ""}`}>
          {title}
        </strong>
      )}
      {items.map((i) => (
        <li
          className={
            i.specialStyle
              ? `${i.specialStyle}${itemsStyle ? ` ${itemsStyle}` : ""}`
              : itemsStyle
          }
        >
          <Link
            onClick={
              i.toggleWindow ? doToggleWindow : (e) => e.preventDefault()
            }
            to={i.linkPath ? i.linkPath : "/"}
          >
            {i.content ? i.content : i}
          </Link>
        </li>
      ))}
    </ul>
  );
}

List.defaultProps = {
  itemsStyle:
    "font-medium text-blue-dark cursor-pointer transition-colors hover:text-gray-bluegray-500",
  titleStyle: "mb-1 uppercase font-bold text-gray-100",
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  itemsStyle: PropTypes.string,
  title: PropTypes.string,
  titleStyle: PropTypes.string,
  doToggleWindow: PropTypes.func,
};

export default List;
