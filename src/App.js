import Blank from "./Blank.js";
import { useState } from "react";

function App() {
  const [blankState, SetBlankState] = useState(false);

  const [textAreaValue, SetTextAreaValue] = useState("");

  const [editState, SetEditState] = useState(false);

  const [compilte, SetComplite] = useState(false);
  const [uncomplite, SetUncomplite] = useState(false);

  const [editedTaskId, SetEditedTaskId] = useState();

  const [listState, SetListState] = useState([]);

  const [taskStateSwitcher, SetTaskStateSwitcher] = useState(false);

  const [taskState, SetTaskState] = useState([]);

  const [editingTask, SetEditingTsk] = useState();

  const taskList = listState;

  function deleteTask(e) {
    const elementsId = e.target.closest("section").id;

    const deletedArray = taskList.filter((el) => {
      return el.id !== elementsId;
    });

    SetListState(deletedArray);

    if (compilte) {
      const deletedArrayForTaskState = taskState.filter((el) => {
        return el.id !== elementsId;
      });

      SetTaskState(deletedArrayForTaskState);
    } else if (uncomplite) {

      const deletedArrayForTaskState = taskState.filter((el) => {
        return el.id !== elementsId;
      });

      SetTaskState(deletedArrayForTaskState);
    }
  }

  function giveTaskValue(e) {
    const elementsId = e.target.closest("section").id;
    SetEditedTaskId(elementsId);

    for (const el of taskList) {
      if (elementsId === el.id) {
        SetTextAreaValue(el.task);
        return el.task;
      }
    }
  }

  function editTask() {
    const editList = [...taskList];

    for (const el of editList) {
      if (editedTaskId === el.id) {
        el.task = textAreaValue;
      }
    }
    SetListState(editList);
  }

  function taskFilter(Taskstatus) {
    SetTaskStateSwitcher(false);

    const filteredTasks = (taskStateSwitcher ? taskState : taskList).filter((el) => {
      return el.status === Taskstatus;
    });



    SetTaskStateSwitcher(true);
    SetTaskState(filteredTasks);

  }

  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  


  return (
    <div className="App">
      <header className="App-header">todolist</header>
      <main>
        <div className="upper-main">
          <button
            className="btn-add"
            onClick={() => {
              SetBlankState(true);
              SetTextAreaValue("");
              SetEditState(false);
              console.log(hour,min)
            }}
          >
            add task
          </button>
          {blankState && (
            <Blank
              onBlankState={SetBlankState}
              onEditState={editState}
              onSetEditState={SetEditState}
              onTaskList={taskList}
              onListState={SetListState}
              onEditTskValue={editingTask}
              textAreaValue={textAreaValue}
              SetTextAreaValue={SetTextAreaValue}
              onEditTask={editTask}
              onTextAreaValue={textAreaValue}
            />
          )}
          <select className="task-state-select">
            <option
              className="a"
              onClick={() => {
                SetTaskState(taskList);
                SetTaskStateSwitcher(false);
              }}
            >
              All
            </option>
            <option
              onClick={() => {
                taskFilter(false);
                SetComplite(false);

                SetUncomplite(true);
              }}
            >
              Incomplete
            </option>
            <option
              onClick={() => {
                taskFilter(true);
                SetUncomplite(false);

                SetComplite(true);
              }}
            >
              Complete
            </option>
          </select>
        </div>

        {(taskStateSwitcher ? taskState : taskList).map((list, i) => {
          return (
            <section key={list.id} id={list.id}>
              <div className="task-cont">
                <div className="inner-cont">
                  <div className="left-cont">
                    <input
                      type="checkbox"
                      className="check-box"
                      checked={list.status}
                      onChange={(e) => {
                        const elementsIdForStatus =
                          e.target.closest("section").id;

                        if (e.target.checked) {
                          for (const el of taskList) {
                            if (elementsIdForStatus === el.id) {
                              el.status = true;
                            }
                          }

                          SetListState((taskList) => [...taskList]);
                        } else {
                          for (const el of taskList) {
                            if (elementsIdForStatus === el.id) {
                              el.status = false;
                            }
                          }

                          SetListState((taskList) => [...taskList]);
                        }

                        if (uncomplite) {
                          SetTaskState(
                            taskState.filter((el) => {
                              return el.status === false;
                            })
                          );
                        } else if (compilte) {
                          SetTaskState(
                            taskState.filter((el) => {
                              return el.status === true;
                            })
                          );
                        }
                      }}
                    />
                    <div className="text-cont">
                      <div
                        className="title"
                        style={
                          list.status === true
                            ? { textDecoration: "line-through" }
                            : { textDecoration: "none" }
                        }
                      >
                        {list.task}
                      </div>
                      <div
                        className="date"
                        style={
                          list.status === true
                            ? { textDecoration: "line-through" }
                            : { textDecoration: "none" }
                        }
                      >
                        <span className="time">{list.time}</span>,{list.date}
                      </div>
                    </div>
                  </div>

                  <div className="btn-cont">
                    <button
                      className="btn-delete"
                      onClick={(e) => {
                        deleteTask(e);
                      }}
                    >
                      delete
                    </button>
                    <button
                      className="btn-edit"
                      onClick={(e) => {
                        SetBlankState(true);
                        SetEditState(true);
                        SetEditingTsk(giveTaskValue(e));
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default App;
