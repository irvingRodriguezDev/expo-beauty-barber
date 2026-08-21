// src/components/admin/StatCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "#EC4899",
}) => {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #E2E8F0" }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <Box>
          <Typography variant='body2' color='#64748B' fontWeight={500}>
            {title}
          </Typography>
          <Typography
            variant='h4'
            fontWeight='bold'
            sx={{ my: 0.5, color: "#0F172A" }}
          >
            {value}
          </Typography>
          {subtitle && (
            <Typography variant='caption' color='#10B981' fontWeight={600}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}15`,
            color: color,
            p: 2,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
};
