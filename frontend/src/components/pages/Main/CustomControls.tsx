import { Button } from "@skbkontur/react-ui";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { useState } from "react";
import styles from "./CustomControls.module.css";
import CreateEventWidget from "../../widgets/CreateEventWidget/CreateEventWidget";

type CalendarControlsPlugin = ReturnType<typeof createCalendarControlsPlugin>;

function CustomControls({
  controls,
  children,
}: {
  controls: CalendarControlsPlugin;
  children: React.ReactElement;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const getLastDayOfMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const shiftMonth = (base: Date, offset: number) => {
    const day = base.getDate();
    const year = base.getFullYear();
    const month = base.getMonth() + offset;
    const last = getLastDayOfMonth(year, month);
    return new Date(year, month, Math.min(day, last));
  };

  const toLocalISO = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  const goPrev = () => {
    const prev = shiftMonth(currentDate, -1);
    controls.setDate(toLocalISO(prev));
    setCurrentDate(prev);
  };

  const goNext = () => {
    const next = shiftMonth(currentDate, +1);
    controls.setDate(toLocalISO(next));
    setCurrentDate(next);
  };

  const goToday = () => {
    const today = new Date();
    controls.setDate(toLocalISO(today));
    setCurrentDate(today);
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
        <Button size="large" use="primary" onClick={() => setOpen(true)}>
          +
        </Button>
        <CreateEventWidget open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default CustomControls;
