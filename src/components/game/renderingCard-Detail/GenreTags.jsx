// src/components/GenreTags.jsx
import React from "react";
import { Box, Tooltip, Chip } from "@mui/material";
import { Link } from "react-router";
import {
  GiSwordClash, // Action
  GiSpellBook, // RPG
  GiPistolGun, // Shooter
  GiTreasureMap, // Adventure
  GiChessRook, // Strategy
  GiRaceCar, // Racing
  GiSoccerBall, // Sports
  GiCrossedSwords, // Fighting
  GiJoystick, // Arcade
  GiGamepadCross, // Casual
  GiCarWheel, // Simulation
  GiPerspectiveDiceSixFacesRandom, // Dice
  GiCardAceClubs, // Card
  GiFamilyHouse, // Family
  GiGraduateCap, // Educational
  GiNetworkBars, // Massively Multiplayer
  GiPlatform, // Platformer
  GiUfo, // Science Fiction
} from "react-icons/gi";
import { FaPuzzlePiece, FaCar, FaUsers, FaLightbulb } from "react-icons/fa";

const genreIconMap = {
  Action: GiSwordClash,
  Indie: FaLightbulb,
  Adventure: GiTreasureMap,
  RPG: GiSpellBook,
  Strategy: GiChessRook,
  Shooter: GiPistolGun,
  Casual: GiGamepadCross,
  Simulation: GiCarWheel,
  Puzzle: FaPuzzlePiece,
  Arcade: GiJoystick,
  Platformer: GiPlatform,
  Racing: GiRaceCar,
  Sports: GiSoccerBall,
  Fighting: GiCrossedSwords,
  Family: GiFamilyHouse,
  "Board Games": GiPerspectiveDiceSixFacesRandom,
  Educational: GiGraduateCap,
  Card: GiCardAceClubs,
  "Massively Multiplayer": GiNetworkBars,
  "Science Fiction": GiUfo, // nuova mappatura
};

function GenreTags({ genres, styleGenre, styleIconGenre }) {
  if (!genres?.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.5,
        flexWrap: "wrap",
        my: 1,
        justifyContent: "left",
      }}
    >
      {genres.map(({ name, slug }) => {
        const Icon = genreIconMap[name];
        return (
          <Chip
            key={name}
            label={name}
            size="small"
            variant="outlined"
            sx={styleGenre}
            icon={Icon && <Icon size={15} style={styleIconGenre} />}
            clickable
            component={Link}
            to={`/games/${slug}`}
          />
        );
      })}
    </Box>
  );
}

export default GenreTags;
