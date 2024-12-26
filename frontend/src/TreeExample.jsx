import React, { useState } from 'react';

function TreeExample({ data, handlePageState, path = '/', currentPath = '/' }) {
    const [expandedFolders, setExpandedFolders] = useState({});

    const handleToggleFolder = (folderPath) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [folderPath]: !prev[folderPath],
        }));
    };

    const handleClick = (itemPath, isFolder) => {
        if (isFolder) {
            handleToggleFolder(itemPath);
        } else {
            handlePageState(itemPath);
        }
    };

    return (
        <div className="w-full h-full text-lg">
            <ul>
                {data.map((item, index) => {
                    const itemPath = `${path}${item.name}/`;
                    const isFolder = item.type !== 'file';
                    const isExpanded = expandedFolders[itemPath];
                    const isActive = itemPath === currentPath;

                    return (
                        <li
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClick(itemPath, isFolder);
                            }}
                            className={`cursor-pointer ml-3 ${
                                isFolder
                                    ? 'text-gray-500 hover:text-gray-700'
                                    : 'text-blue-500 hover:text-blue-700'
                            } ${isActive ? 'text-2xl text-black font-bold' : ''}`}
                        >
                            {item.name}

                            {isFolder && isExpanded && item.children && (
                                <TreeExample
                                    data={item.children}
                                    handlePageState={handlePageState}
                                    path={itemPath}
                                    currentPath={currentPath}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TreeExample;
