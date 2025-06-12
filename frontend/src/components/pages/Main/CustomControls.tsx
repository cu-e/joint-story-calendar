import { Button } from '@skbkontur/react-ui'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { useState } from 'react'
import styles from './CustomControls.module.css'

type CalendarControlsPlugin = ReturnType<typeof createCalendarControlsPlugin>


export function CustomControls({ controls, children }: { controls: CalendarControlsPlugin, children: React.ReactElement }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const format = (d: Date) => d.toISOString().split('T')[0]


  const goPrev = () => {
    const curr = new Date(controls.getDate())
    const prev = new Date(curr.getFullYear(), curr.getMonth() , 1)
    controls.setDate(format(prev))
    setCurrentDate(prev)
  }

  const goNext = () => {
    const curr = new Date(controls.getDate())
    const next = new Date(curr.getFullYear(), curr.getMonth() + 2, 1)
    controls.setDate(format(next))
    setCurrentDate(next)
  }

  const goToday = () => {
    controls.setDate(format(new Date()))
    setCurrentDate(new Date())

  }
  const monthLabel = currentDate
    .toLocaleString('ru-RU', { month: 'long', year: 'numeric' })
    .replace(/^./, str => str.toUpperCase())

  return (
    <div className={styles['custom-controls']}>
      <h1>{monthLabel}</h1>
          <Button size='large' onClick={goToday}>Сегодня</Button>

    {children}
    <div className={styles['control-month']}>
    <Button size='large' onClick={goPrev}>{"<"}</Button>
    <Button size='large' use='primary' >Добавить событие</Button>
    <Button size='large' onClick={goNext}>{">"}</Button>
    </div>
   </div>
  )
}
