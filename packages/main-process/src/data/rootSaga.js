import { all, fork } from 'redux-saga/effects'
import { coreSagasFactory, coreRootSagaFactory } from 'blockchain-wallet-v4/src'
import alerts from './alerts/sagaRegister'
import analytics from './analytics/sagaRegister'
import auth from './auth/sagaRegister'
import components from './components/sagaRegister'
import middleware from './middleware/sagaRegister'
import modules from './modules/sagaRegister'
import preferences from './preferences/sagaRegister'
import goals from './goals/sagaRegister'
import router from './router/sagaRegister'
import wallet from './wallet/sagaRegister'

export default function * rootSaga ({
  api,
  bchSocket,
  btcSocket,
  ethSocket,
  imports,
  ratesSocket,
  networks,
  options,
  securityModule
}) {
  const coreSagas = coreSagasFactory({
    api,
    imports,
    networks,
    options,
    securityModule
  })

  yield all([
    fork(alerts),
    fork(analytics({ api })),
    fork(auth({ api, coreSagas })),
    fork(components({ api, coreSagas, imports, networks, options })),
    fork(modules({ api, coreSagas, imports, networks })),
    fork(preferences({ imports })),
    fork(goals({ api })),
    fork(wallet({ coreSagas })),
    fork(middleware({ api, bchSocket, btcSocket, ethSocket, ratesSocket })),
    fork(coreRootSagaFactory({ api, imports, networks, options })),
    fork(router())
  ])
}
