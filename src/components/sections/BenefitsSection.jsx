import React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const benefits = [
  {
    icon: <SchoolIcon sx={{ fontSize: 55 }} />,
    title: "Capacitación Especializada",
    description: "Aprende de expertos y líderes de la industria de la belleza.",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 55 }} />,
    title: "Networking Estratégico",
    description:
      "Conecta con empresarios, distribuidores y profesionales del sector.",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 55 }} />,
    title: "Impulsa tu Negocio",
    description: "Descubre nuevas oportunidades para incrementar tus ventas.",
  },
  {
    icon: <LightbulbIcon sx={{ fontSize: 55 }} />,
    title: "Tendencias e Innovación",
    description:
      "Conoce lo último en productos, servicios y tecnología beauty.",
  },
  {
    icon: <StorefrontIcon sx={{ fontSize: 55 }} />,
    title: "Nuevos Proveedores",
    description: "Encuentra aliados comerciales para fortalecer tu negocio.",
  },
  {
    icon: <RocketLaunchIcon sx={{ fontSize: 55 }} />,
    title: "Crecimiento Profesional",
    description: "Lleva tus conocimientos y habilidades al siguiente nivel.",
  },
];

const BenefitsSection = () => {
  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(180deg, #FFD9E2 0%, #FFD9E2 100%)",
      }}
    >
      <Container maxWidth='lg'>
        <Typography
          variant='overline'
          sx={{
            display: "block",
            textAlign: "center",
            letterSpacing: 3,
            color: "#EE6F97",
            mb: 1,
          }}
        >
          BEAUTY BUSINESS MEXICO
        </Typography>

        <Typography
          variant='h3'
          sx={{
            textAlign: "center",
            color: "#3D2B2F",
            fontWeight: 700,
            mb: 2,
          }}
        >
          ¿Qué ganarás al asistir?
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#EE6F97",
            maxWidth: 800,
            mx: "auto",
            mb: 8,
          }}
        >
          Vive una experiencia diseñada para impulsar tu crecimiento
          profesional, expandir tu red de contactos y descubrir las
          oportunidades que están transformando la industria de la belleza.
        </Typography>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(61,43,47,0.08)",
                  borderRadius: "24px",
                  backdropFilter: "blur(10px)",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: "#EE6F97",
                    boxShadow: "0 20px 40px rgba(238,111,151,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#EE6F97",
                    mb: 2,
                  }}
                >
                  {benefit.icon}
                </Box>

                <Typography
                  variant='h6'
                  sx={{
                    color: "#3D2B2F",
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {benefit.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#3D2B2F",
                    width: "fit-content",
                    background: "#FECCDB",
                    lineHeight: 1.8,
                  }}
                >
                  {benefit.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BenefitsSection;
