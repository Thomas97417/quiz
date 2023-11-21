import React from 'react'
import Quiz from './components/Quiz'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'

const queryClient = new QueryClient()


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Quiz />
    </QueryClientProvider>
  )
}

export default App