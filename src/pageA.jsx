import React from "react";
import {Link} from "react-router-dom";
import Icon from './component/icons/icon';

const PageA = () => {
    return <div>PageA
        <Link to='./pageb'>pageB</Link>
        <Icon type={'arrow'}/>
    </div>
}

export default PageA;
