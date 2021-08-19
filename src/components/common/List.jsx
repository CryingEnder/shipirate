import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function List({
  items,
  itemsStyle,
  title,
  titleStyle,
  doToggleLogin,
  doToggleProfile,
  doToggleMenu,
  ...props
}) {
  function triggerAction(item) {
    if (item.toggleLogin) doToggleLogin();
    else if (item.toggleProfile) doToggleProfile();

    if (doToggleMenu) doToggleMenu();
  }

  return (
    <ul {...props}>
      {title && (
        <strong className={`block${titleStyle ? ` ${titleStyle}` : ""}`}>
          {title}
        </strong>
      )}
      {items.map(
        (i) =>
          i && (
            <li
              onClick={doToggleMenu ? doToggleMenu : null}
              className={
                i.specialStyle
                  ? `${i.specialStyle}${itemsStyle ? ` ${itemsStyle}` : ""}`
                  : itemsStyle
              }
            >
              {i.linkPath && i.linkPath.search("#") === 0 ? (
                <a href={i.linkPath}>{i.content ? i.content : i}</a>
              ) : (
                <Link
                  onClick={() => triggerAction(i)}
                  to={i.linkPath ? i.linkPath : "/"}
                >
                  {i.content ? i.content : i}
                </Link>
              )}
            </li>
          )
      )}
    </ul>
  );
}

List.defaultProps = {
  itemsStyle:
    "font-medium text-blue-dark cursor-pointer transition-colors hover:text-gray-bluegray-500 dark:text-blue-whiteish-2 dark:hover:text-blue-whiteish-3",
  titleStyle:
    "mb-1 uppercase font-bold text-gray-100 dark:text-blue-whiteish-1",
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  itemsStyle: PropTypes.string,
  title: PropTypes.string,
  titleStyle: PropTypes.string,
  doToggleLogin: PropTypes.func,
  doToggleProfile: PropTypes.func,
  doToggleMenu: PropTypes.func,
};

export default List;
