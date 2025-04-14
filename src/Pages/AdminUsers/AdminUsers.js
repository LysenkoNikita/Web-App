import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
    useTable,
    useSortBy,
    useColumnOrder,
    useBlockLayout,
    useResizeColumns,
    useRowSelect,
} from 'react-table';
import { useSticky } from 'react-table-sticky';
import { useVirtual } from 'react-virtual';
import axios from 'axios';

import "./AdminUsers.css"

const Cell = React.memo(({ cell }) => {
    const { key, ...cellProps } = cell.getCellProps();
    return (
        <div
            key={key}
            {...cellProps}
            className={`td ${cell.column.sticky ? 'sticky' : ''}`}
            style={{
                ...cellProps.style,
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                padding: '8px',
                boxSizing: 'border-box',
            }}
        >
            {cell.render('Cell')}
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.cell.value === nextProps.cell.value &&
        prevProps.cell.column.id === nextProps.cell.column.id &&
        prevProps.cell.row.id === nextProps.cell.row.id;
});

const UsersTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const URL = "http://127.0.0.1:8000";
    const scrollDebounceRef = useRef(null);
    const isMountedRef = useRef(false);
    const isFetchingRef = useRef(false);

    const fetchUsers = useCallback(async (pageNum) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        setLoading(true);

        try {
            const response = await axios.get(URL + `/api/users/?page=${pageNum}&limit=10`);
            const formattedUsers = response.data.users.map(user => ({
                id: user[0],
                name: user[1],
                email: user[2],
                isEditor: Boolean(user[3]),
                isAdmin: Boolean(user[4]),
                status: user[5]
            }));

            setData(prev => {
                if (pageNum === 1) return formattedUsers;
                const existingIds = new Set(prev.map(item => item.id));
                const newItems = formattedUsers.filter(item => !existingIds.has(item.id));
                return [...prev, ...newItems];
            });

            setHasMore(pageNum < response.data.totalPages);
            setPage(pageNum); // Всегда обновляем page, даже если данных нет
        } catch (error) {
            console.error('Error fetching users:', error);
            setHasMore(false);
        } finally {
            isFetchingRef.current = false;
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        fetchUsers(1);

        return () => {
            isMountedRef.current = false;
            if (scrollDebounceRef.current) {
                clearTimeout(scrollDebounceRef.current);
            }
        };
    }, [fetchUsers]);

    const handleUpdateUser = useCallback(async (userId, updates) => {
        const originalUser = data.find(user => user.id === userId);

        try {
            setData(prev => prev.map(user =>
                user.id === userId ? { ...user, ...updates } : user
            ));

            await axios.put(URL + `/api/users/${userId}`, {...updates, ...{"id":userId}});
            console.log(`User ${userId} updated successfully`);
        } catch (error) {
            console.error('Error updating user:', error);
            setData(prev => prev.map(user =>
                user.id === userId ? { ...originalUser } : user
            ));
        }
    }, [data]);

    const handleStatusChange = useCallback((userId, newStatus) => {
        handleUpdateUser(userId, { status: newStatus });
    }, [handleUpdateUser]);

    const handleAdminChange = useCallback((userId, isAdmin) => {
        handleUpdateUser(userId, { isAdmin });
    }, [handleUpdateUser]);

    const handleEditorChange = useCallback((userId, isEditor) => {
        handleUpdateUser(userId, { isEditor });
    }, [handleUpdateUser]);

    const handleDelete = useCallback(async (userId) => {
        try {
            setData(prev => prev.filter(user => user.id !== userId));
            await axios.delete(URL + `/api/users/${userId}`, {"id":userId});
        } catch (error) {
            console.error('Error deleting user:', error);
            setData(prev => [...prev, data.find(user => user.id === userId)]);
        }
    }, [data]);

    const columns = useMemo(() => [
        {
            Header: 'ID',
            accessor: 'id',
            width: 80,
            sticky: 'left',
        },
        {
            Header: 'Имя',
            accessor: 'name',
            width: 150,
        },
        {
            Header: 'Почта',
            accessor: 'email',
            width: 200,
        },
        {
            Header: 'Статус',
            accessor: 'status',
            width: 120,
            Cell: ({ row }) => {
                const status = row.original.status;
                return (
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                        style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            cursor: 'pointer',
                            backgroundColor: status === 'block' ? '#ffcccc' : '#e6e6e6',
                        }}
                    >
                        <option value="pass">Активен</option>
                        <option value="block">Заблокирован</option>
                    </select>
                );
            },
        },
        {
            Header: 'Редактор',
            accessor: 'isEditor',
            width: 120,
            Cell: ({ row }) => {
                const isEditor = row.original.isEditor;
                return (
                    <select
                        value={isEditor ? 'yes' : 'no'}
                        onChange={(e) => handleEditorChange(row.original.id, e.target.value === 'yes')}
                        style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            cursor: 'pointer',
                            backgroundColor: isEditor ? '#e6ffe6' : '#e6e6e6',
                        }}
                    >
                        <option value="yes">Да</option>
                        <option value="no">Нет</option>
                    </select>
                );
            },
        },
        {
            Header: 'Админ',
            accessor: 'isAdmin',
            width: 120,
            Cell: ({ row }) => {
                const isAdmin = row.original.isAdmin;
                return (
                    <select
                        value={isAdmin ? 'yes' : 'no'}
                        onChange={(e) => handleAdminChange(row.original.id, e.target.value === 'yes')}
                        style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            cursor: 'pointer',
                            backgroundColor: isAdmin ? '#e6ffe6' : '#e6e6e6',
                        }}
                    >
                        <option value="yes">Да</option>
                        <option value="no">Нет</option>
                    </select>
                );
            },
        },
        {
            Header: 'Действия',
            accessor: 'actions',
            width: 120,
            sticky: 'right',
            Cell: ({ row }) => (
                <button
                    onClick={() => handleDelete(row.original.id)}
                    className="delete-btn"
                    style={{
                        padding: '4px 8px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: '#ffcccc',
                        cursor: 'pointer',
                    }}
                >
                    Удалить
                </button>
            ),
        },
    ], [handleStatusChange, handleAdminChange, handleEditorChange, handleDelete]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setColumnOrder,
        state: { columnOrder },
    } = useTable(
        {
            columns,
            data,
            getRowId: useCallback(row => row.id, []),
            autoResetSortBy: false,
            autoResetFilters: false,
            autoResetRowState: false,
        },
        useSortBy,
        useColumnOrder,
        useBlockLayout,
        useResizeColumns,
        useSticky,
        useRowSelect
    );

    const tableContainerRef = useRef();
    const rowHeight = 50;
    const rowVirtualizer = useVirtual({
        parentRef: tableContainerRef,
        size: rows.length,
        estimateSize: useCallback(() => rowHeight, []),
        overscan: 10,
    });
    const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
    const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0;
    const paddingBottom = virtualRows.length > 0
        ? totalSize - (virtualRows[virtualRows.length - 1]?.end || 0)
        : 0;

    const handleScroll = useCallback((e) => {
        if (isFetchingRef.current || !hasMore || loading) return;

        const { scrollTop, clientHeight, scrollHeight } = e.target;
        const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 300;

        if (isNearBottom) {
            isFetchingRef.current = true;
            setLoading(true);

            // Используем debounce для избежания множественных запросов
            if (scrollDebounceRef.current) {
                clearTimeout(scrollDebounceRef.current);
            }

            scrollDebounceRef.current = setTimeout(() => {
                fetchUsers(page + 1);
            }, 200);
        }
    }, [hasMore, page, loading, fetchUsers]);

    const onDragStart = useCallback((e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.columnId);
        e.currentTarget.style.opacity = '0.5';
    }, []);

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '#f0f0f0';
    }, []);

    const onDrop = useCallback((e, columnId) => {
        e.preventDefault();
        const draggedColumnId = e.dataTransfer.getData('text/plain');
        const newColumnOrder = [...columnOrder];
        const draggedIndex = newColumnOrder.indexOf(draggedColumnId);
        const targetIndex = newColumnOrder.indexOf(columnId);

        if (draggedIndex !== -1 && targetIndex !== -1) {
            newColumnOrder.splice(draggedIndex, 1);
            newColumnOrder.splice(targetIndex, 0, draggedColumnId);
            setColumnOrder(newColumnOrder);
        }

        e.currentTarget.style.backgroundColor = '';
    }, [columnOrder, setColumnOrder]);

    const onDragEnd = useCallback((e) => {
        e.currentTarget.style.opacity = '1';
    }, []);

    const preparedRows = useMemo(() => {
        return virtualRows.map(virtualRow => {
            const row = rows[virtualRow.index];
            prepareRow(row);
            return row;
        });
    }, [virtualRows, rows, prepareRow]);

    return (
        <div className="users-container" style={{ padding: '20px', maxWidth: '100%' }}>
            <h1 style={{ marginBottom: '20px' }}>Список пользователей</h1>

            <div
                className="table-container"
                ref={tableContainerRef}
                onScroll={handleScroll}
                style={{
                    overflow: 'auto',
                    height: '600px',
                    position: 'relative',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                }}
            >
                <div {...getTableProps()} className="table sticky" style={{ width: '100%' }}>
                    <div className="header">
                        {headerGroups.map(headerGroup => {
                            const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                            return (
                                <div
                                    key={headerGroupKey}
                                    {...headerGroupProps}
                                    className="tr"
                                    style={{
                                        ...headerGroupProps.style,
                                        display: 'flex',
                                        width: '100%',
                                    }}
                                >
                                    {headerGroup.headers.map(column => {
                                        const { key: columnKey, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps());
                                        return (
                                            <div
                                                key={columnKey}
                                                {...columnProps}
                                                className={`th ${column.sticky ? 'sticky' : ''}`}
                                                draggable
                                                onDragStart={onDragStart}
                                                onDragOver={onDragOver}
                                                onDrop={(e) => onDrop(e, column.id)}
                                                onDragEnd={onDragEnd}
                                                data-column-id={column.id}
                                            >
                                                <div className="header-content">
                                                    {column.render('Header')}
                                                    <span className="sort-icon">
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? ' ↓'
                                                                : ' ↑'
                                                            : ''}
                                                    </span>
                                                </div>
                                                <div
                                                    {...column.getResizerProps()}
                                                    className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>

                    <div
                        {...getTableBodyProps()}
                        className="body"
                        style={{
                            position: 'relative',
                            height: `${totalSize}px`,
                            width: '100%',
                        }}
                    >
                        {paddingTop > 0 && (
                            <div style={{ height: `${paddingTop}px` }} />
                        )}

                        {preparedRows.map((row, index) => {
                            const virtualRow = virtualRows[index];
                            const { key: rowKey, ...rowProps } = row.getRowProps();

                            return (
                                <div
                                    key={rowKey}
                                    {...rowProps}
                                    className="tr"
                                    style={{
                                        ...rowProps.style,
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${rowHeight}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                        display: 'flex',
                                        borderBottom: '1px solid #eee',
                                    }}
                                >
                                    {row.cells.map(cell => (
                                        <Cell key={`${rowKey}-${cell.column.id}`} cell={cell} />
                                    ))}
                                </div>
                            );
                        })}

                        {paddingBottom > 0 && (
                            <div style={{ height: `${paddingBottom}px` }} />
                        )}
                    </div>
                </div>

                {loading && (
                    <div style={{
                        padding: '10px',
                        textAlign: 'center',
                        color: '#666',
                        position: 'sticky',
                        bottom: 0,
                        backgroundColor: 'white',
                    }}>
                        Загрузка...
                    </div>
                )}
                {!hasMore && !loading && (
                    <div style={{
                        padding: '10px',
                        textAlign: 'center',
                        color: '#666',
                        position: 'sticky',
                        bottom: 0,
                        backgroundColor: 'white',
                    }}>
                        Все пользователи загружены
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(UsersTable);
