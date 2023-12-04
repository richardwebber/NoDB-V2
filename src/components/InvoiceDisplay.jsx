import axios from 'axios'

import AddButton from './AddButton.jsx'
import TableHeader from './TableHeader.jsx'
import TableRow from './TableRow.jsx'
import './Component.css'

import { useState, useEffect } from 'react'

const InvoiceDisplay = () => {
    
    const [currentData, setCurrentData] = useState([])
    const [currentImage, setCurrentImage] = useState('')
    let pokeId = 6;

    useEffect(() => {
        axios.get('/clients')
        .then((res) => {
            setCurrentData(res.data)
        })
        .catch((thesehands) => {
            console.log(thesehands)
        })
    }, [])

    useEffect(() => {
        axios.get(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`)
        .then(() => {
            setCurrentImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`)
        })
        .catch((thesehands) => {
            console.log(thesehands)
        })
    })


    const addRow = () => {
        axios.post('/client')
        .then((res) => {
            setCurrentData(res.data)
        })
        .catch((thesehands) => {
            console.log(thesehands)
        })
    }


    const deleteRow = (id) => {
        axios.delete(`/client/${id}`)
        .then((res) => {
            setCurrentData(res.data)
        })
        .catch((thesehands) => {
            console.log(thesehands)
        })
    }


    const rows = currentData.map((client) => <TableRow
    initialInvoiceData={client}
    initialEditMode={false}
    key={client.id}
    deleteRow={() => deleteRow(client.id)}
    currentData={currentData}
    currentImage={currentImage}
    setCurrentData={setCurrentData}
    />)

    
    return (
        <div>
            <table>
                <thead>
                    <TableHeader/>
                </thead>

                <tbody>
                    {rows}
                </tbody>

                <tfoot>
                    <AddButton addRow={addRow}/>
                </tfoot>
            </table>
        </div>
    )
}

export default InvoiceDisplay