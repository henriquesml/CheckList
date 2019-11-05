import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Splash from './pages//splash'
import Main from './pages/main'
import List from './pages/List'
import CheckList from './pages/checklist'

const Routes = createAppContainer(
    createSwitchNavigator({
        Splash,
        Main,
        List,
        CheckList

    })
);

export default Routes