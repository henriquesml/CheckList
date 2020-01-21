import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Splash from './pages/splash/splash'
import Main from './pages/main/main'
import List from './pages/list/list'
import CheckList from './pages/checklist/checklist'

const Routes = createAppContainer(
    createSwitchNavigator({
        Splash,
        Main,
        List,
        CheckList

    })
);

export default Routes