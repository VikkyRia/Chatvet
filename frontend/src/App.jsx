import React, { useState } from 'react'

function App() {
  const [petType, setPetType] = useState('dog')
  const [symptom, setSymptom] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + '/analyze', ...
 {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pet_type: petType, symptom })
    })
    const data = await res.json()
    setResponse(data.advice)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🐾 ChatVet - AI Pet Care Assistant</h1>
      <select className="border p-2 mb-2" value={petType} onChange={e => setPetType(e.target.value)}>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
      <input className="w-full border p-2 mb-2" type="text" placeholder="Describe your pet's symptom..." value={symptom} onChange={e => setSymptom(e.target.value)} />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Get Advice</button>
      {response && <div className="mt-4 p-2 border rounded bg-white">{response}</div>}
    </div>
  )
}

export default App
