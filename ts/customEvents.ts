export const linkInput = (elem: any, color: any) => new CustomEvent('linkInput', {
    detail: {
        elem,
        color
    }
});
export const linkInputStateSend = (state: boolean) => new CustomEvent('linkInputStateSend', {
    detail: {
        state: state,
    }
});