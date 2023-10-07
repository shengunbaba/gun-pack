import * as React from "react";

interface DefaultProps {
    type: string
    className?: string
    onClick?: any
    onMouseEnter?: Function
    onMouseLeave?: Function
    style?: any
    ref?: any
}


const Icon: React.FC<DefaultProps> = ({...props}) => {

    const p = require(`./svgs/${props.type}.svg`).default;

    const {onClick, className, onMouseEnter, onMouseLeave, style} = props;

    const onClickChange = (e) => {
        onClick && onClick(e)
    }

    const onEnter = (e) => {
        onMouseEnter && onMouseEnter(e)
    }

    const onLeave = (e) => {
        onMouseLeave && onMouseLeave(e)
    }

    return (
        <i className={className} onClick={onClickChange} onMouseEnter={onEnter} onMouseLeave={onLeave} style={style}
           dangerouslySetInnerHTML={{__html: p}}>
        </i>
    )
}
export default Icon

