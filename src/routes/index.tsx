import { Switch } from 'react-router-dom'

import App from '../pages/App'
import Profile from '../pages/Profile'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Route from './Route'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />

      <Route path="/app" exact component={App} isPrivate />
      <Route path="/profile" exact component={Profile} isPrivate />
    </Switch>
  )
}

export default Routes
