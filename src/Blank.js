// import { useState } from "react";
import { useId } from "react";
import { useState } from "react";

function Blank({
  onBlankState,
  onEditState,

  onTaskList,
  onListState,

  textAreaValue,
  SetTextAreaValue,
  onEditTask,
  onTextAreaValue,
}) {
  const [error, SetError] = useState(false);

  const date = new Date();
  const hour = date.getHours();
  const month = date.getMonth();

  const dayOfMonth = date.getDate();

  const dayOfMonthForUser = dayOfMonth < 10 ? `0+${dayOfMonth}` : dayOfMonth;
  let monthForUser = month + 1;

  monthForUser = monthForUser < 10 ? `0${monthForUser}` : monthForUser;

  let hourInTwelveHourFormat = hour % 12;
  hourInTwelveHourFormat =
    hourInTwelveHourFormat === 0 ? 12 : hourInTwelveHourFormat;

  const min = date.getMinutes();

  const format = hour >= 12 ? "PM" : "AM";

  console.log(min);

  const id = useId();
  function newListMaker() {
    const createdList = {
      id: id,
      task: textAreaValue,
      time: `${hourInTwelveHourFormat}:${min} ${format} `,
      date: `${monthForUser}/${dayOfMonthForUser}/${date.getFullYear()} `,
      status: false,
    };

    const newList = [...onTaskList, createdList];

    onListState(newList);
  }

  return (
    <div className="blank-cont">
      <div className="back-cont"></div>
      <div className="field-cont">
        <form className="form-cont">
          {error && <div className="error">enter text</div>}
          <textarea
            className="task-field"
            value={textAreaValue}
            onInput={(e) => {
              SetTextAreaValue(e.target.value);

              if (onTextAreaValue) {
                SetError(false);
              }
            }}
          ></textarea>
        </form>

        <div className="btn-cont-txt">
          {onEditState ? (
            <button
              className="edit-button"
              onClick={() => {
                onBlankState(false);
                onEditTask();
              }}
            >
              Edit
            </button>
          ) : (
            <button
              className="add-button"
              onClick={() => {
                if (onTextAreaValue) {
                  SetError(false);
                } else {
                  SetError(true);

                  return;
                }

                newListMaker();
                onBlankState(false);
              }}
            >
              Add
            </button>
          )}

          <button
            className="close-button"
            onClick={() => {
              onBlankState(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blank;
