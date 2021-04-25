import React from "react";

import { Grid } from "@material-ui/core";
import { animated as a, useSpring } from "react-spring";

function Icon() {
    const uBound = 1500 + 1;
    return (
        <Grid
            container
            direction="row"
            justify="center"
            style={{ paddingBottom: "13%", paddingTop: "13%" }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="240"
                height="240"
                fill="none"
                viewBox="0 0 240 240"
            >
                <a.path
                    fill="#7868E6"
                    d="M0 0H240V240H0z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateZ: 0 },
                            to: { rotateZ: 90 },
                            delay: 1000 + 1
                        })
                    }}
                ></a.path>
                {/* rectangle */}
                <a.path
                    fill="#fff"
                    d="M215.625 25.781H23.906v39.844h191.719V25.781z"
                ></a.path>
                {/* boxA */}
                <a.path
                    fill="#fff"
                    d="M63.75 75.469H23.906v39.843H63.75V75.469z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
                {/* boxB */}
                <a.path
                    fill="#fff"
                    d="M114.375 75.469H74.531v39.843h39.844V75.469z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
                {/* boxC */}
                <a.path
                    fill="#fff"
                    d="M165 75.469h-39.844v39.843H165V75.469z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
                {/* boxD */}
                <a.path
                    fill="#fff"
                    d="M215.625 75.469h-39.844v39.843h39.844V75.469z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
                {/* boxE */}
                <a.path
                    fill="#fff"
                    d="M63.75 125.156H23.906V165H63.75v-39.844z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
                {/* boxF */}
                <a.path
                    fill="#fff"
                    d="M114.375 125.156H74.531V165h39.844v-39.844z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
                {/* boxG */}
                <a.path
                    fill="#fff"
                    d="M165 125.156h-39.844V165H165v-39.844z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>

                {/* boxH */}
                <a.path
                    fill="#fff"
                    d="M215.625 125.156h-39.844V165h39.844v-39.844z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
                {/* boxI */}
                <a.path
                    fill="#fff"
                    d="M63.75 174.844H23.906v39.844H63.75v-39.844z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
                {/* boxJ */}
                <a.path
                    fill="#fff"
                    d="M114.375 174.844H74.531v39.844h39.844v-39.844z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
                {/* boxK */}
                <a.path
                    fill="#fff"
                    d="M165 174.844h-39.844v39.844H165v-39.844z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
                {/* boxL */}
                <a.path
                    fill="#fff"
                    d="M215.625 174.844h-39.844v39.844h39.844v-39.844z"
                    style={{
                        transformOrigin: "center", // <- make it centre
                        transformBox: "fill-box", // <- of the element
                        ...useSpring({
                            loop: true,
                            from: { rotateX: 0 },
                            to: { rotateX: 360 },
                            delay: Math.floor(Math.random() * uBound)
                        })
                    }}
                ></a.path>
            </svg>
        </Grid>
    );
}

export default Icon;