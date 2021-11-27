import './index.less'
import React from "react";
import {render} from 'react-dom'
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import PageA from "./pageA";
import PageB from "./pageB";


const decorator = (target) => {
    target.a = 1;
}

@decorator
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PageA/>}/>
                    <Route path="/pageb" element={<PageB/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}

console.log(App.a);

render(
    <App/>
    , document.getElementById('root')
)
