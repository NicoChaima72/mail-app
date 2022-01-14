import React from "react";

const Button = ({ title, Icon, styles, isCustomColor, ...rest }) => {
  return (
    <button
      className={`${styles} ${
        !isCustomColor &&
        "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500"
      } flex justify-start space-x-2 items-center py-2 px-4 w-full text-sm
        font-medium rounded-md`}
      {...rest}
    >
      <Icon></Icon>
      <p>{title}</p>
    </button>
  );
};

export default Button;
