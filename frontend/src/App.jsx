import { useState, useTransition } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './pages/Hero'
import { useTranslation } from 'react-i18next'
import DanteChatBubble from './components/Chatbot'

function App() {
  
  const {t} = useTranslation()
  return (
    <>
      <Hero></Hero>
    </>
  )
}

export default App;
