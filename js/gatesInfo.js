export const getGateInfo = (type) => {
    let inputs, output;
    if (type === "NOT") {
        inputs = [
            {
                inpSrc: null,
                inpCenter: {
                    inpOffsetX: 10,
                    inpOffsetY: 25,
                    sideLen: 9
                },
                inpState: 2
            }
        ];
        output = {
            outSrc: null,
            outCenter: {
                outOffsetX: 110,
                outOffsetY: 25,
                sideLen: 9
            }
        };
    }
    else if (type === "AND") {
        inputs = [
            {
                inpSrc: null,
                inpCenter: {
                    inpOffsetX: 10,
                    inpOffsetY: 13,
                    sideLen: 6
                },
                inpState: 2
            },
            {
                inpSrc: null,
                inpCenter: {
                    inpOffsetX: 10,
                    inpOffsetY: 36,
                    sideLen: 6
                },
                inpState: 2
            }
        ];
        output = {
            outSrc: null,
            outCenter: {
                outOffsetX: 112,
                outOffsetY: 26,
                sideLen: 6
            }
        };
    }
    else if (type === "OR") {
        inputs = [
            {
                inpSrc: null,
                inpCenter: {
                    inpOffsetX: 13,
                    inpOffsetY: 13,
                    sideLen: 6
                },
                inpState: 2
            },
            {
                inpSrc: null,
                inpCenter: {
                    inpOffsetX: 13,
                    inpOffsetY: 36,
                    sideLen: 6
                },
                inpState: 2
            }
        ];
        output = {
            outSrc: null,
            outCenter: {
                outOffsetX: 112,
                outOffsetY: 26,
                sideLen: 6
            }
        };
    }
    else if (type === "NAND") {
        inputs = [
            {
                inpSrc: null,
                inpCenter: {
                    inpOffsetX: 10,
                    inpOffsetY: 15,
                    sideLen: 6
                },
                inpState: 2
            },
            {
                inpSrc: null,
                inpCenter: {
                    inpOffsetX: 10,
                    inpOffsetY: 35,
                    sideLen: 6
                },
                inpState: 2
            }
        ];
        output = {
            outSrc: null,
            outCenter: {
                outOffsetX: 112,
                outOffsetY: 24,
                sideLen: 6
            }
        };
    }
    return [inputs, output];
};
