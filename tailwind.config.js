const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xs: "360px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1366px",
            "3xl": "1440px",
            "4xl": "1600px",
            "5xl": "1920px",
            phone: "360px",
            "phone-2": "640px",
            tablet: "768px",
            "tablet-2": "1024px",
            desktop: "1280px",
            "desktop-2": "1366px",
            "desktop-3": "1440px",
            "desktop-4": "1600px",
            "desktop-5": "1920px",
        },
        extend: {
            keyframes: {
                toastIn: {
                    "0%": { transform: "translateX(50%)", opacity: 0 },
                    "10%, 90%": { transform: "translateX(0)", opacity: 1 },
                    "100%": { transform: "translate(200%)", opacity: 0 },
                },
                toTop: {
                    "0%": {
                        transform: "translateY(100%)",
                        opacity: 0,
                    },
                    "100%": {
                        transform: "translateY(0)",
                        opacity: 1,
                    },
                },
            },
            boxShadow: {
                custom: "rgb(100 100 111 / 50%) 0 7px 100px 0",
            },
            colors: {
                primary: "#0d6efd",
                secondary: "#6c757d",
                success: "#198754",
                info: "#0dcaf0",
                warning: "#ffc107",
                danger: "#dc3545",
                light: "#f8f9fa",
                dark: "#212529",
            },
        },
    },
    plugins: [
        plugin(({ addComponents, addUtilities }) => {
            addComponents({
                a: {
                    color: "#0284c7",
                },
                ".selectBox": {
                    display: "block",
                    width: "100%",
                    padding: "6px 12px",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#495057",
                    backgroundColor: "#fff",
                    backgroundClip: "padding-box",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    outline: "none",
                    transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",

                    "&:focus": {
                        borderColor: "rgb(102 175 233 / 60%)",
                        boxShadow:
                            "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%)",
                    },
                },
                ".selectBox-md": {
                    height: "36px",
                },
                ".selectBox-sm": {
                    height: "30px",
                },
                ".inp": {
                    display: "block",
                    width: "100%",
                    padding: "6px 12px",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#495057",
                    backgroundColor: "#fff",
                    backgroundClip: "padding-box",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    outline: "none",
                    transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",

                    "&:focus": {
                        borderColor: "rgb(102 175 233 / 60%)",
                        boxShadow:
                            "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%)",
                    },
                },
                ".inp-md": {
                    height: "36px",
                },
                ".inp-sm": {
                    height: "30px",
                },
                ".btn": {
                    height: "36px",
                    padding: "0 12px",
                    display: "inline-block",
                    fontWeight: "400",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    verticalAlign: "middle",
                    cursor: "pointer",
                    borderRadius: "4px",
                    borderWidth: "1px",
                    borderType: "solid",
                    transitionProperty:
                        "color, background-color, border-color, text-decoration-color, fill, stroke",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDuration: "150ms",
                },
                ".btn-outline": {
                    border: "none",
                },
                ".btn-primary": {
                    color: "#ffffff",
                    backgroundColor: "#007bff",
                    borderColor: "transparent",
                    "&:hover": {
                        backgroundColor: "#0069d9",
                        borderColor: "#0062cc",
                    },
                    "&:disabled": {
                        backgroundColor: "#6c757d",
                    },
                },
                ".btn-secondary": {
                    color: "#333333",
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e6ea",
                    "&:hover": {
                        backgroundColor: "#e2e6ea",
                        borderColor: "#dae0e5",
                    },
                    "&:disabled": {
                        backgroundColor: "#6c757d",
                        borderColor: "#6c757d",
                    },
                },
                ".btn-md": {
                    height: "36px",
                },
                ".btn-sm": {
                    height: "30px",
                },
                ".active-route": {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: "#DC413A",
                    width: "5px",
                },
                ".calendar-days div span": {
                    position: "absolute",
                },
                ".calendar-days div:hover span": {
                    transition: "width 0.2s ease-in-out, height 0.2s ease-in-out",
                },
                ".calendar-days div span:nth-child(1), .calendar-days div span:nth-child(3)": {
                    width: "2px",
                    height: 0,
                    backgroundColor: "#000",
                },
                ".calendar-days div:hover span:nth-child(1), .calendar-days div:hover span:nth-child(3)":
                    {
                        height: "100%",
                    },
                ".calendar-days div span:nth-child(1)": {
                    bottom: 0,
                    left: 0,
                },
                ".calendar-days div span:nth-child(3)": {
                    top: 0,
                    right: 0,
                },
                ".calendar-days div span:nth-child(2), .calendar-days div span:nth-child(4)": {
                    width: 0,
                    height: "2px",
                    backgroundColor: "#000",
                },
                ".calendar-days div:hover span:nth-child(2), .calendar-days div:hover span:nth-child(4)":
                    {
                        width: "100%",
                    },
                ".calendar-days div span:nth-child(2)": {
                    top: 0,
                    left: 0,
                },
                ".calendar-days div span:nth-child(4)": {
                    bottom: 0,
                    right: 0,
                },
                ".calendar-days div:hover span:nth-child(2)": {
                    transitionDelay: "0.2s",
                },
                ".calendar-days div:hover span:nth-child(3)": {
                    transitionDelay: "0.4s",
                },

                ".calendar-days div:hover span:nth-child(4)": {
                    transitionDelay: "0.6s",
                },
            }),
                addUtilities({
                    ".scrollbar-thin": {
                        "scrollbar-width": "thin",
                        "&::-webkit-scrollbar": {
                            width: "5px",
                            height: "8px",
                            background: "rgba(255,255,255,0.02)",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "rgba(0,0,0,0.3)",
                        },
                    },
                });
        }),
        process.env.NODE_ENV === "production" ? { cssnano: {} } : { cssnano: {} },
    ],
};
