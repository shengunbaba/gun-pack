import * as React from "react";
import {useNavigate} from "react-router-dom";


const PageB = () => {

    const navigate = useNavigate()

    const onLink = () => navigate('/')

    return <div>PageB
        <span onClick={onLink}>linkA</span>
    </div>
}

export default PageB;
