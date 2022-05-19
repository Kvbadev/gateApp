export const linkInput = (elem: any) => new CustomEvent('linkInput', {
    detail: elem
});
export const linkInputStateSend = (state: boolean) => new CustomEvent('linkInputStateSend', {
    detail: {
        state: state,
    }
});