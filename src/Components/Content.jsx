import React from 'react';

const Content = ({ lab }) => (
    <div style={{
        flex: 1,
        padding: '1rem',
        marginLeft: '20px'
    }}>
        {lab ? (
            <>
                <h2>{lab.title}</h2>
                <p>{lab.content}</p>
            </>
        ) : (
            <p>Пожалуйста, выберите лабораторную работу из меню</p>
        )}
    </div>
);

export default Content;