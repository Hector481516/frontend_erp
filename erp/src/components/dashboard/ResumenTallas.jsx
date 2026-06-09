import { useEffect, useState } from 'react'
import { useDashboard } from '../../hooks/useDashboard'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function GraficaTallas() {
    const { tallas } = useDashboard()
    const [data, setData] = useState({
        labels: [],
        datasets: []
    })
    useEffect(() => {
        if (!tallas?.length) return
        const datos = tallas
        console.log(datos)
        const colores = [
            '#7c3aed',
            '#9333ea',
            '#a855f7',
            '#8b5cf6',
            '#6366f1',
            '#3b82f6',
            '#06b6d4'
        ]
        setData({
            label:'Pares por talla',
            labels: datos.map(item => item.talla),
            datasets: [
                {
                    label: 'Resumen de tallas',
                    data: datos.map(item=>item.cantidad),
                    backgroundColor: datos.map(
                    (_, index) => colores[index % colores.length]),
                    borderWidth: 2,
                    borderRadius: 12,
                    barThickness: 40
                }
            ]
        })
    }, [tallas])
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#e2e8f0'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#cbd5e1',
                    font: {
                        size: 13,
                        weight: '600'
                    }
                },
                grid: {
                    color: 'rgba(255,255,255,0.06)'
                }
            },
            y: {
                ticks: {
                    color: '#cbd5e1'
                },
                grid: {
                    color: 'rgba(255,255,255,0.06)'
                }
            }
        }
    }
    return (
        <div style={{ height: '200px', width:'700px' }}>
            <Bar
                data={data}
                options={options}
            />
        </div>
    )
}
export default GraficaTallas