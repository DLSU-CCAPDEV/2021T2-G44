import React from "react";

function boxA(props) {
    return <g {...props}></g>;
}

function boxB(props) {
    return <g {...props}></g>;
}

function boxC(props) {
    return <g {...props}></g>;
}

function boxD(props) {
    return <g {...props}></g>;
}

function boxE(props) {
    return <g {...props}></g>;
}

function boxF(props) {
    return <g {...props}></g>;
}

function boxG(props) {
    return <g {...props}></g>;
}

function boxH(props) {
    return <g {...props}></g>;
}

function boxI(props) {
    return <g {...props}></g>;
}

function boxJ(props) {
    return <g {...props}></g>;
}

function boxK(props) {
    return <g {...props}></g>;
}

function boxL(props) {
    return <g {...props}></g>;
}

function Icon() {
    const boxes = [
        <boxA key="box-A" />,
        <boxB key="box-B" />,
        <boxC key="box-C" />,
        <boxD key="box-D" />,
        <boxE key="box-E" />,
        <boxF key="box-F" />,
        <boxG key="box-G" />,
        <boxH key="box-H" />,
        <boxI key="box-I" />,
        <boxJ key="box-J" />,
        <boxK key="box-K" />,
        <boxL key="box-L" />
    ];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="240"
            height="240"
            fill="none"
            viewBox="0 0 240 240"
        >
            <path fill="#7868E6" d="M0 0H240V240H0z"></path>
            {/* rectangle */}
            <path
                fill="#fff"
                d="M215.625 25.781H23.906v39.844h191.719V25.781z"
            ></path>
            {/* boxA */}
            <path
                fill="#fff"
                d="M63.75 75.469H23.906v39.843H63.75V75.469z"
            ></path>
            {/* boxB */}
            <path
                fill="#fff"
                d="M114.375 75.469H74.531v39.843h39.844V75.469z"
            ></path>
            {/* boxC */}
            <path fill="#fff" d="M165 75.469h-39.844v39.843H165V75.469z"></path>
            {/* boxD */}
            <path
                fill="#fff"
                d="M215.625 75.469h-39.844v39.843h39.844V75.469z"
            ></path>
            {/* boxE */}
            <path
                fill="#fff"
                d="M63.75 125.156H23.906V165H63.75v-39.844z"
            ></path>
            {/* boxF */}
            <path
                fill="#fff"
                d="M114.375 125.156H74.531V165h39.844v-39.844z"
            ></path>
            {/* boxG */}
            <path fill="#fff" d="M165 125.156h-39.844V165H165v-39.844z"></path>

            {/* boxH */}
            <path
                fill="#fff"
                d="M215.625 125.156h-39.844V165h39.844v-39.844z"
            ></path>
            {/* boxI */}
            <path
                fill="#fff"
                d="M63.75 174.844H23.906v39.844H63.75v-39.844z"
            ></path>
            {/* boxJ */}
            <path
                fill="#fff"
                d="M114.375 174.844H74.531v39.844h39.844v-39.844z"
            ></path>
            {/* boxK */}
            <path
                fill="#fff"
                d="M165 174.844h-39.844v39.844H165v-39.844z"
            ></path>
            {/* boxL */}
            <path
                fill="#fff"
                d="M215.625 174.844h-39.844v39.844h39.844v-39.844z"
            ></path>
        </svg>
    );
}

export default Icon;
