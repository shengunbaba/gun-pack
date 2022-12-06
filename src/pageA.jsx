import React from "react";
import {Link} from "react-router-dom";

const PageA = () => {
    return <div>PageA
        <Link to='./pageb'>pageB</Link>
    </div>
}

export default PageA;
