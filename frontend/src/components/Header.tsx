import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      disableRipple
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        textColor="inherit"
        sx={{
          fontSize: "10px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#000",
          },
        }}
      >
        <LinkTab label="Home" href="/" />
        <LinkTab label="New" href="/drafts" />
        <LinkTab label="Past" href="/trash" />
        <LinkTab label="Comments" href="/spam" />
      </Tabs>
    </Box>
  );
}
const Title = () => {
  return (
    <Typography variant="h6" sx={{ pr: 2, py: 1, fontWeight: "700" }}>
      Hacker News
    </Typography>
  );
};
const Header: React.FC = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  if (!isSmUp) {
    return (
      <Grid
        container
        direction="column"
        alignItems="space-between"
        justifyContent="center"
        sx={{ bgcolor: "#ff6600", px: 2 }}
      >
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Title />
          <Button variant="outlined" color="inherit">
            Login
          </Button>
        </Grid>
        <Grid item>
          <NavTabs />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ bgcolor: "#ff6600", px: 2 }}
    >
      <Grid container item xs={10} alignItems="center">
        <Title />
        <NavTabs />
      </Grid>
      <Grid item>
        <Button variant="outlined" color="inherit">
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
