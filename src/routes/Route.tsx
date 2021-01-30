/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import { RouteProps, Route as ReactRoute, Redirect } from 'react-router-dom'

import { useAuth } from '../hooks/Auth'

interface IRouteProps extends RouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const Route: React.FC<IRouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth()

  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
            <Redirect to={{ pathname: isPrivate ? '/' : '/app', state: { from: location } }} />
          )
      }}
    />
  )
}

export default Route
