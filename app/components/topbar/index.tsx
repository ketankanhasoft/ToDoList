import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from "@mui/material";

// topbar components
export default function Topbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-do List
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
