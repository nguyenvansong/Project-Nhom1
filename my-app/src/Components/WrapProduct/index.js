// import { useContext } from 'react';
// import { StoreContext } from '../../store';

import {Link} from 'react-router-dom';
function WrapProduct({children}){
    return (
        <>
            <Link to="/product">
                {children}
            </Link>
        </>
    )
}

export default WrapProduct;