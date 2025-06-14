import { useEffect, useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";

import styles from "./MainPage.module.css";
import CustomControls from "./CustomControls";
import { Button } from "@skbkontur/react-ui";

type CalendarControlsPlugin = ReturnType<typeof createCalendarControlsPlugin>;

function MainPage() {
  const [selectDate, setSelectDate] = useState(new Date());
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const controls = useState<CalendarControlsPlugin>(() =>
    createCalendarControlsPlugin()
  )[0];

  const calendar = useCalendarApp({
    views: [createViewMonthGrid(), createViewMonthAgenda()],
    plugins: [eventsService, controls],
    callbacks: {
      onClickAgendaDate(date) {
        setSelectDate(new Date(date));
      },
    },
  });

  useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div className={styles["main-page"]}>
      <CustomControls controls={controls}>
        <>
          <ScheduleXCalendar calendarApp={calendar} />
          <div>
            <h2 className={styles["main-page__title"]}>
              {selectDate.toLocaleString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h2>
            <p>На выбранную дату историй нет :(</p>
            <Button>Создать историю?</Button>
          </div>
        </>
      </CustomControls>
    </div>
  );
}

export default MainPage;
