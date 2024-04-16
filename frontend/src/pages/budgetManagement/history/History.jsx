import React from 'react';
import './history.css';

const History = ({ incomes, expenses }) => {
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 6);
    };

    const historyItems = transactionHistory();

    return (
        <div className='HistoryStyled'>
            <h2>Recent History</h2>
            {historyItems.map(({ _id, title, amount, type }) => (
                <div key={_id} className="history-item">
                    <p style={{ color: type === 'expense' ? 'red' : '#42AD00' }}>{title}</p>
                    <p style={{ color: type === 'expense' ? 'red' : '#42AD00' }}>
                        {type === 'expense' ? `-${Math.max(amount, 0)}` : `+${Math.max(amount, 0)}`}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default History;
