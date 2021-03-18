import React from "react";
import PropTypes from "prop-types";

function List({ items, itemsStyle, title, titleStyle, ...props }) {
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
          <a href="/">{i.content ? i.content : i}</a>
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
};

export default List;
