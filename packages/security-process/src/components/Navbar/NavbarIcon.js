import styled from 'styled-components'
import com, { Icon } from 'blockchain-info-components'

import { transparentize } from 'polished'

console.log(`ICON`, Icon)
console.log(`com`, com)

const NavbarIcon = styled(Icon)`
  transition: color 0.3s;
  color: ${props => transparentize(0.3, props.theme['white'])};
  &:hover {
    color: ${props => props.theme['white']};
  }
`

export default NavbarIcon
