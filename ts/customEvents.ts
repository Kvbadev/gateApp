export const linkInput = (elem: any, color: any) => new CustomEvent('linkInput', {
    detail: {
        src : elem,
        color: color
    }
});
export const unlinkInput = (gateID: string) => new CustomEvent('unlinkInput', {
    detail: {
        id: gateID
    }
});

export const linkInputStateSend = (state: boolean) => new CustomEvent('linkInputStateSend', {
    detail: {
        state: state,
    }
});