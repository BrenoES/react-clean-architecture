import React from 'react'
import '@presentation/styles/global.scss'

import { Router } from '@presentation/components'

const App: React.FC = () => {
  return (
    <main className="App">
      <Router />
    </main>
  )
}

export default App
