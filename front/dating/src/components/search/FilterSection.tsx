import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

interface FilterSectionProps {
  onApplyFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onApplyFilters }) => {
  const [genderFilterOpen, setGenderFilterOpen] = useState(true);

  return (
    <Box sx={{ border: "1px solid #ccc", borderRadius: "8px", p: 2, mb: 2 }}>
      <Button
        onClick={() => setGenderFilterOpen(!genderFilterOpen)}
        fullWidth
        variant="contained"
        sx={{ mb: 1 }}
      >
        Gender Filters
      </Button>
      <Collapse in={genderFilterOpen}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox />} label="Only Humans" />
            <FormControlLabel control={<Checkbox />} label="Only Females" />
            {/* Інші фільтри */}
          </Grid>
        </Grid>
      </Collapse>
      <Button
        onClick={onApplyFilters}
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default FilterSection;
