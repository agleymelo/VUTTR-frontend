import { Link } from 'react-router-dom'

import LogoBossa from '../../assets/Icon-Bossa.svg'
import { Container, ContentBar, HeaderContent, ButtonProfile } from './styles'

const Navbar: React.FC = () => {
  return (
    <Container>
      <ContentBar>
        <HeaderContent>
          <img src={LogoBossa} alt="" />

          <div>
            <Link to="/profile">
              <ButtonProfile>Profile</ButtonProfile>
            </Link>
          </div>
        </HeaderContent>
      </ContentBar>
    </Container>
  )
}

export default Navbar
