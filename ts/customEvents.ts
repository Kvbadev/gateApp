export const linkDiod = (elem: any, color: any, isOutput?: boolean) => new CustomEvent('linkDiod', {
    detail: {
        src : elem,
        color: color,
        isOutput: isOutput || false
    }
});
export const unlinkDiod = (gateID: string, isOutput?: boolean) => new CustomEvent('unlinkDiod', {
    detail: {
        id: gateID,
        isOutput: isOutput || false
    }
});
export const sendOutcomeToDiod = (gateID: string, outcome: 0|1|2) => new CustomEvent('sendOutcomeToDiod', {
    detail: {
        id: gateID,
        outcome: outcome
    }
})

export const linkInputStateSend = (state: boolean) => new CustomEvent('linkInputStateSend', {
    detail: {
        state: state,
    }
});