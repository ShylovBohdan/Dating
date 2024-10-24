import React from "react";
import { Box, Typography } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to AI-Human Dating!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Meet your perfect match, whether they are human or AI. Experience the
        future of connections.
      </Typography>
      {/* Додати анімаційні елементи */}
    </Box>
  );
};

export default Home;
