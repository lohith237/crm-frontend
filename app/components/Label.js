import React from "react";

const Label = ({ htmlFor, children, className = "" }) => {
    const defaultClasses = "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400";

    return (
        <label htmlFor={htmlFor} className={`${defaultClasses} ${className}`}>
            {children}
        </label>
    );
};

export { Label };
