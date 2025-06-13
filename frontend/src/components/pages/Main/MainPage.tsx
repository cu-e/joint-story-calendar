import React, { useEffect, useState } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewMonthAgenda,
  createViewMonthGrid,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import {
  createCalendarControlsPlugin,
} from '@schedule-x/calendar-controls'

import styles from './MainPage.module.css'
import CustomControls from './CustomControls'



type CalendarControlsPlugin = ReturnType<typeof createCalendarControlsPlugin>

function MainPage() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
  const controls = useState<CalendarControlsPlugin>(
    () => createCalendarControlsPlugin()
  )[0] 

  const calendar = useCalendarApp({
    views:   [ createViewMonthGrid(), createViewMonthAgenda() ],
    plugins: [ eventsService, controls ],
    
  })

  useEffect(() => {
    eventsService.getAll()
  }, [eventsService])

  return (
    <div className={styles['main-page']}>
      <CustomControls controls={controls} >

        <ScheduleXCalendar
          calendarApp={calendar}
        />
      </CustomControls>
    </div>
  )
}

export default MainPage
