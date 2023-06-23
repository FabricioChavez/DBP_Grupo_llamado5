import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MangaListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
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
  width: 300px;
  height: 400px;
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
  const { manga , userdata} = props;
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

  return (
    <MangaListContainer>
      {manga.map((manga, index) => (
        <MangaItem
          key={manga.id}
          style={{
            gridRow: index > 2 ? "2" : "1",
            gridColumn: (index % 3) + 1,
          }}
          onMouseEnter={() => handleMouseEnter(manga)}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={`/MasInfo` }>
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
      ))}
    </MangaListContainer>
  );
}

export { MangaList };
