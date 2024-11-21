// theme.ts
import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#24CCB9", // Teal color for the active button
    },
    background: {
      default: "#1A1A1A", // Dark background
      paper: "#2d2d2d", // Slightly lighter for buttons
    },
    divider: "#FFFFFF33",
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "12px",
          backgroundColor: "black",
          color: "white",
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { component: "strong" },
          style: {
            font: "inherit",
            color: "#24ccb9",
          },
        },
        {
          props: { variant: "h1" },
          style: ({ theme }) => ({
            fontSize: "24px",
            fontWeight: "500",
            lineHeight: "36px",
            textAlign: "left",
            color: theme.palette.primary.main,
          }),
        },
        {
          props: { variant: "h2" },
          style: ({ theme }) => ({
            fontSize: "18px",
            fontWeight: "500",
            lineHeight: "32px",
            textAlign: "left",
            color: theme.palette.primary.main,
          }),
        },
      ],
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          backgroundColor: "#2D2D2D",
          borderRadius: "10px",
          color: "white",
          "& .MuiSelect-select": {
            padding: "12px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "12px",
          minWidth: 0,
          fontWeight: "500",
          lineHeight: "16px",
          borderRadius: "8px", // Rounded corners
          padding: "4px 8px",
          textTransform: "none", // Prevents automatic uppercase
          background: "rgba(255, 255, 255, 0.1)",
          color: "rgba(255, 255, 255, 0.6)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly lighter on hover
          },
          "&.Mui-selected, &.active": {
            color: theme.palette.primary.main,
          },
        }),
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#45b7ac", // Darker teal on hover for active button
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: "8px", // Space between buttons
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: "24px", // Rounded corners
          padding: "10px 20px",
          color: "white",
          backgroundColor: "#2d2d2d",
          "&.Mui-selected": {
            backgroundColor: "#4fd1c5", // Teal for selected state
            color: "black",
            "&:hover": {
              backgroundColor: "#45b7ac", // Darker teal on hover for selected
            },
          },
          "&:hover": {
            backgroundColor: "#3a3a3a", // Slightly lighter on hover
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
