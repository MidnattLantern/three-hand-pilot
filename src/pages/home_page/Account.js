import React from "react";

const Account = (props) => {
    const {
        id,
        owner,
    } = props;

    return (
        <div>
            <p>{id}: {owner}</p>
        </div>
    )
};

export default Account;
