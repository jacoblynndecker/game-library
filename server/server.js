import express from "express";
import "dotenv/config";

const app = express();

app.get("/api/games", async (req, res) => {
  try {
    const apiKey = process.env.RAWG_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "RAWG API key is missing",
      });
    }

    const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=10`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch games from RAWG",
      });
    }

    const data = await response.json();

    const mappedGames = (data.results ?? []).map((game) => {
      return {
        id: game.id,
        title: game.name,
        genre: game.genres[0]?.name ?? "Unknown",
        image: game.background_image,
        rating: game.rating,
        released: game.released,
        metacritic: game.metacritic,
        playtime: game.playtime,
        platforms: game.platforms,
      };
    });

    res.json(mappedGames);

  } catch (error) {
    console.error("Error fetching games:", error);

    res.status(500).json({
      error: "Something went wrong while fetching games",
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});