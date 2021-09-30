import {} from './modules/profilStackAPI'
import {} from './modules/form'
import {} from './modules/modal'
import {} from './modules/navigation'
import {} from './modules/test'

// Activation du hotreload pour un rafraichissement sans cumul des modifs
if (module.hot) {
  module.hot.accept(function () {
    window.location.reload()
  })
}
