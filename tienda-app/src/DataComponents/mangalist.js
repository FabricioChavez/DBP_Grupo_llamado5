import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MangaListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  height: 100vh; /* Ajustar al 100% del viewport */
`;

const MangaItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const MangaImage = styled.img`
  width: 445px;
  height: 500px;
  object-fit: cover;
  border: 4px solid;
  animation: colorAnimation 3s infinite;

  @keyframes colorAnimation {
    0% {
      border-color: rgb(0, 255, 159);
    }
    25% {
      border-color: rgb(0, 184, 255);
    }
    50% {
      border-color: rgb(0, 30, 255);
    }
    75% {
      border-color: rgb(189, 0, 255);
    }
    100% {
      border-color: rgb(214, 0, 255);
    }
  }
`;

const MangaName = styled.h2`
  color: white;
`;

function MangaList(props) {
  const { manga, userdata } = props;
  const [selectedMangaId, setSelectedMangaId] = useState(null);

  const handleMouseEnter = (manga) => {
    setSelectedMangaId(manga.id);
  };

  const handleMouseLeave = () => {
    setSelectedMangaId(null);
  };

  const handleClick = (id) => {
    setSelectedMangaId(id);
  };

  const createMangaGrid = () => {
    const rows = [];
    let currentRow = [];

    manga.forEach((manga) => {
      currentRow.push(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <MangaItem
          key={manga.id}
          onMouseEnter={() => handleMouseEnter(manga)}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={`/MasInfo/${manga.id}`}>
            <MangaImage
              src={manga.link}
              id={manga.id}
              alt={manga.nombre}
              style={{
                border: selectedMangaId === manga.id ? "6px solid red" : "4px solid",
              }}
            />
          </Link>
          <MangaName
            style={{
              transform: selectedMangaId === manga.id ? "scale(1.1)" : "scale(1)",
            }}
          >
            {manga.nombre}
          </MangaName>
        </MangaItem>
        </div>
      );

      if (currentRow.length === 3) {
        rows.push(
          <div key={rows.length} style={{ display: "flex" }}>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    });

    if (currentRow.length > 0) {
      rows.push(
        <div key={rows.length} style={{ display: "flex" }}>
          {currentRow}
        </div>
      );
    }

    return rows;
  };

  return <MangaListContainer>{createMangaGrid()}</MangaListContainer>;
}

export { MangaList };
