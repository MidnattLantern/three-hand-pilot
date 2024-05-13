import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { axiosRes } from "../../api/axiosDefaults";

const Address = (props) => {
    const {
        id,
        owner,
        partnering_end,
        AddressDetail,
    } = props;

    const currentAuthentication = useCurrentAuthentication();
    const is_owner = currentAuthentication?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/address/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/address_book/${id}`);
            history.push('/');
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div>
                <p>id: {id}</p>
                <p>{partnering_end}</p>
            </div>

            {is_owner && AddressDetail ? (<>
                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </>) : (<>
                <Link to={`/address/detail/${id}`}>
                    Details <i className="fa-solid fa-arrow-right"/>
                </Link>
            </>)}
        </div>
    );
};

export default Address;
