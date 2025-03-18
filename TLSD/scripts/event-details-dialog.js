import { initDialog } from "./dialog.js";
import { eventTimeToDate } from "./event.js";

const eventDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const eventTimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: 'numeric',
  minute: 'numeric'
});

export function initEventDetailsDialog() {
  const dialog = initDialog("event-details");

  const deleteButtonElement = dialog.dialogElement.querySelector("[data-event-details-delete-button]");

  const editButtonElement = dialog.dialogElement.querySelector("[data-event-details-edit-button]");

  let currentEvent = null;

  document.addEventListener("event-click", (event) => {
    currentEvent = event.detail.event;
    fillEventDetailsDialog(dialog.dialogElement, event.detail.event);
    dialog.open();
  });

  deleteButtonElement.addEventListener("click", () => {
    dialog
      .close()
      .then(() => {
        deleteButtonElement.dispatchEvent(new CustomEvent("event-delete-request", {
          detail: {
            event: currentEvent
          },
          bubbles: true
        }));
      });
  });

  editButtonElement.addEventListener("click", () => {
    dialog
      .close()
      .then(() => {
        editButtonElement.dispatchEvent(new CustomEvent("event-edit-request", {
          detail: {
            event: currentEvent
          },
          bubbles: true
        }));
      });
  });
}

function fillEventDetailsDialog(parent, event) {
  const eventDetailsElement = parent.querySelector("[data-event-details]");
  const eventDetailsTitleElement = eventDetailsElement.querySelector("[data-event-details-title]");
  const eventDetailsDateElement = eventDetailsElement.querySelector("[data-event-details-date]");
  // const eventDetailsRunnoElement = eventDetailsElement.querySelector("[data-event-details-runno]");
  // const eventDetailsSpecimenElement = eventDetailsElement.querySelector("[data-event-details-specimen]");
  // const eventDetailsMethodElement = eventDetailsElement.querySelector("[data-event-details-method]");
  // const eventDetailsAssignElement = eventDetailsElement.querySelector("[data-event-details-assign]");
  const eventDetailsStartTimeElement = eventDetailsElement.querySelector("[data-event-details-start-time]");
  const eventDetailsEndTimeElement = eventDetailsElement.querySelector("[data-event-details-end-time]");

  eventDetailsTitleElement.textContent = event.title;
  eventDetailsDateElement.textContent = eventDateFormatter.format(event.date);
  // eventDetailsRunnoElement.textContent = event.runno;
  // eventDetailsSpecimenElement.textContent = event.specimen;
  // eventDetailsMethodElement.textContent = event.method;
  // eventDetailsAssignElement.textContent = event.assign;
    
  eventDetailsStartTimeElement.textContent = eventTimeFormatter.format(
    eventTimeToDate(event, event.startTime)
  );
  eventDetailsEndTimeElement.textContent = eventTimeFormatter.format(
    eventTimeToDate(event, event.endTime)
  );

  eventDetailsElement.style.setProperty("--event-color", event.color);
}