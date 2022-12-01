import React from 'react';

const Header = () => {

    return (
        <div className="header">
            <h1>
            Ticket {window?.location?.pathname?.split('/tickets/')[1]}
            </h1>
        </div>
    )
}

export default Header