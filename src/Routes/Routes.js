import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import Dashboard from '../Pages/Dashboard';
import { setAuthorizationToken } from '../Services/APIServices';
import { getCookies } from '../Services/Cookies';
// import GetEvents from '../Pages/GetEvents';
// import CreateEvents from '../Pages/CreateEvents';
// import CreatedEvents from '../Pages/CreatedEvents';
// import UserBook from '../Pages/UserBook';
const Routing = () => {
    return (
        //         <Router>
        //             <Routes>
        //               
        //                 <Route exact path="/" component={Home} />
        //                 {/* <Route path='/' exact component={Home}/> */}
        //             </Routes>
        // 
        //         </Router>

        <Router>
            <Routes>
                {setAuthorizationToken(getCookies('USER_TOKEN'))}
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard/>}/>

            </Routes>
        </Router>

    )
}
export default Routing;