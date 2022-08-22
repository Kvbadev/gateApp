export const linkDiod = (elem, color, isOutput) => new CustomEvent('linkDiod', {
    detail: {
        src: elem,
        color: color,
        isOutput: isOutput || false
    }
});
export const unlinkDiod = (gateID, isOutput) => new CustomEvent('unlinkDiod', {
    detail: {
        id: gateID,
        isOutput: isOutput || false
    }
});
export const sendOutcomeToDiod = (gateID, outcome) => new CustomEvent('sendOutcomeToDiod', {
    detail: {
        id: gateID,
        outcome: outcome
    }
});
export const linkInputStateSend = (state, id) => new CustomEvent('linkInputStateSend', {
    detail: {
        state: state,
        id: id
    }
});
export const deleteElement = () => new CustomEvent('deleteElement');
export const diodRemoved = (diodID) => new CustomEvent('diodRemoved', {
    detail: {
        id: diodID
    }
});
