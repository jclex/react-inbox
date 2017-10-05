export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'

export function fetchMessages() {
    return async (dispatch) => {
        const response = await fetch('/api/messages')
        const json = await response.json()
        dispatch({
            type: MESSAGES_RECEIVED,
            messages: json._embedded.messages
        })
    }
}

export const MESSAGE_BODY_RECEIVED = 'MESSAGE_BODY_RECEIVED';

export function fetchMessageBody(id) {
    return async (dispatch) => {
        const response = await fetch('/api/messages/' + id)
        const json = await response.json()

        dispatch({
            type: MESSAGE_BODY_RECEIVED,
            id,
            body: json.body
        })
    }
}

export const MESSAGE_CREATE = 'MESSAGE_CREATE'

export function messageCreate(subject, body, history) {
    return async (dispatch) => {

        await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject,
                body,
            })
        });

        const response = await fetch('/api/messages')
        const json = await response.json()

        dispatch({
            type: MESSAGE_CREATE,
            messages: json._embedded.messages
        })

        history.push("/");
    }
}

export const MESSAGES_READ = 'MESSAGES_READ'

export function messagesRead(selectedIds, read) {
    return async (dispatch) => {
        await fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: selectedIds,
                command: 'read',
                read,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: MESSAGES_READ,
            selectedIds,
            read,
        })
    }
}

export const MESSAGES_ADD_LABEL = 'MESSAGES_ADD_LABEL'

export function messagesAddLabel(selectedIds, value) {
    return async (dispatch) => {
        await fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: selectedIds,
                command: 'addLabel',
                label: value,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: MESSAGES_ADD_LABEL,
            selectedIds,
            label: value,
        })
    }
}

export const MESSAGES_REMOVE_LABEL = 'MESSAGES_REMOVE_LABEL'

export function messagesRemoveLabel(selectedIds, value) {
    return async (dispatch) => {
        await fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: selectedIds,
                command: 'removeLabel',
                label: value,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: MESSAGES_REMOVE_LABEL,
            selectedIds,
            label: value,
        })
    }
}

export const MESSAGE_CHECKED = 'MESSAGE_CHECKED'

export function messageChecked(id, checked) {
    return async (dispatch) => {
        dispatch({
            type: MESSAGE_CHECKED,
            id,
            checked,
        })
    }
}

export const MESSAGE_STARRED = 'MESSAGE_STARRED'

export function messageStarred(id, starred) {
    return async (dispatch) => {
        await fetch('/api/messages', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messageIds: [ id ],
                command: 'star',
                star: !starred
            })
        });

        dispatch({
            type: MESSAGE_STARRED,
            id,
            starred,
        })
    }
}

export const MESSAGES_DELETE = 'MESSAGES_DELETE'

export function messagesDelete(selectedIds) {
    return async (dispatch) => {
        await fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: selectedIds,
                command: 'delete',
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: MESSAGES_DELETE,
            selectedIds,
        })
    }
}

export const TOOLBAR_CHECKBOXES_SELECTED = 'TOOLBAR_CHECKBOXES_SELECTED';

export function toolbarCheckboxes(selectedCount, messageCount, allIds) {
    return async (dispatch) => {
        dispatch({
            type: TOOLBAR_CHECKBOXES_SELECTED,
            selectedCount,
            messageCount,
            allIds,
        })
    }
}