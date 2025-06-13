import { Button, CurrencyInput } from "@skbkontur/react-ui";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { useState } from "react";
import styles from "./CustomControls.module.css";

type CalendarControlsPlugin = ReturnType<typeof createCalendarControlsPlugin>;

function CustomControls({
  controls,
  children,
}: {
  controls: CalendarControlsPlugin;
  children: React.ReactElement;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const format = (d: Date) => d.toISOString().split("T")[0];

  const goPrev = () => {
    const curr = new Date(controls.getDate());
    const prev = new Date(curr.getFullYear(), curr.getMonth(), 1);
    controls.setDate(format(prev));
    setCurrentDate(prev);
  };

  const goNext = () => {
    const curr = new Date(controls.getDate());
    const next = new Date(curr.getFullYear(), curr.getMonth() + 2, 1);
    controls.setDate(format(next));
    setCurrentDate(next);
  };

  const goToday = () => {
    controls.setDate(format(new Date()));
    setCurrentDate(new Date());
  };
  const monthLabel = (date: Date) => {
    const weekday = date
      .toLocaleString("ru-RU", { weekday: "long" })
      .replace(/^./, (str) => str.toUpperCase());
    const monthYear = date
      .toLocaleString("ru-RU", { month: "long", year: "numeric" })
      .replace(/^./, (str) => str.toUpperCase());
    return [weekday, monthYear];
  };

  return (
    <div className={styles["custom-controls"]}>
      <div className={styles["custom-header"]}>
        <Button use="text" size="large" onClick={goPrev}>
          {"<"}
        </Button>

        <p className={styles["custom-header-date"]} onClick={goToday}>
          {monthLabel(currentDate)[1]}
        </p>
        <Button use="text" size="large" onClick={goNext}>
          {">"}
        </Button>
      </div>
      <aside className={styles["block-current-menu"]}>
        <div className={styles["block-current-date"]}>
          <h1>{new Date().getDate()}</h1>
          <div>
            <p>{monthLabel(new Date())[1]}</p>
            <p>{monthLabel(new Date())[0]}</p>
          </div>
        </div>
        <div className={styles["block-current-event"]}>
          <p>
            <b>Осталось</b> 90 дней
          </p>

          <p>
            <b>След дата:</b> {monthLabel(new Date())[1]}
          </p>
        </div>
      </aside>
      {children}
      <div className={styles["control-month"]}>
        <Button size="large" use="primary">
          +
        </Button>
      </div>
    </div>
  );
}

export default CustomControls;
