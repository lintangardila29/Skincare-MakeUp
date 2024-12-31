import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: [
                    'Figtree',
                    ...defaultTheme.fontFamily.sans
                ]
            },
            colors: {
                current: "currentColor",
                transparent: "transparent",
                white: "#FFFFFF",
                black: "#121723",
                dark: "#1D2430",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    100: "#C3E4FD",
                    200: "#9AD6FC",
                    300: "#71C9FA",
                    400: "#48BBF8",
                    500: "#4A6CF7",
                    600: "#2C95D2",
                    700: "#206DAB",
                    800: "#134584",
                    900: "#072D5E",
                },
                "bg-green-3": "#22ff991e",
                yellow: "#FBB040",
                "body-color": "#1f2937",
                "body-color-dark": "#d1d5db",
                "gray-light": "#F0F2F9",
                stroke: "#E3E8EF",
                "stroke-dark": "#353943",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                "background-2": "hsl(var(--background-2))",
                foreground: "hsl(var(--foreground))",
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            boxShadow: {
                signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
                one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
                two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
                three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
                sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
                "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
                "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
                submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
                "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
                btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
                "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
                "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
            },
            dropShadow: {
                three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        }
    },

    plugins: [forms, require("tailwindcss-animate")],
};
