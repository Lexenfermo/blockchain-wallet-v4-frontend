import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { LinkContainer } from 'react-router-bootstrap'
import { FormattedMessage } from 'react-intl'
import Bowser from 'bowser'

import { actions, model } from 'data'
import { Button, Icon, Text } from 'blockchain-info-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 330px);
  padding: 10px 30px;
  @media (max-width: 770px) {
    width: 100%;
    padding: 10px 15px;
  }
`
const ToggleIcon = styled(Icon)`
  transition: color 0.3s;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme['brand-secondary']};
  }
`
const RightCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > :first-child {
    margin-right: 16px;
  }
`
const browser = Bowser.getParser(window.navigator.userAgent)
const isBrowserSupported = browser.satisfies(
  model.components.lockbox.supportedBrowsers
)

class DeviceTitle extends React.PureComponent {
  onOpenAppManager = () => {
    this.props.modalActions.showModal('LockboxAppManager', {
      deviceIndex: this.props.deviceIndex
    })
  }

  render () {
    const { deviceInfo, deviceIndex, location } = this.props
    const onDashboard = location.pathname.includes('/lockbox/dashboard')
    const linkTo = onDashboard
      ? `/lockbox/settings/${deviceIndex}`
      : `/lockbox/dashboard/${deviceIndex}`
    const icon = onDashboard ? 'cog-filled' : 'transactions'

    return deviceInfo ? (
      <Wrapper>
        <Text size='24px' weight={500} className='tour-step1'>
          {deviceInfo.device_name}
        </Text>
        <RightCol>
          <Button
            nature='primary'
            rounded
            onClick={this.onOpenAppManager}
            disabled={!isBrowserSupported}
            className='tour-step4'
          >
            <FormattedMessage
              id='scenes.lockbox.menu.devicetitle.apps'
              defaultMessage='Manage Apps'
            />
          </Button>
          <LinkContainer to={linkTo} className='tour-step5'>
            <ToggleIcon name={icon} size={'24px'} />
          </LinkContainer>
        </RightCol>
      </Wrapper>
    ) : (
      <Text size='24px' weight={500}>
        Lockbox
      </Text>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(actions.modals, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(DeviceTitle)
