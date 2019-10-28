import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './pages/login'
import Main from './pages/main'
import List from './pages/List'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
        List

    })
);

export default Routes