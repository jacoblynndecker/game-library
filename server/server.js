import express from "express";
import "dotenv/config";

const app = express();

async function getIgdbAccessToken() {
  const clientId = process.env.IGDB_CLIENT_ID;
  const clientSecret = process.env.IGDB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("IGDB credentials are missing");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  const response = await fetch(
    "https://id.twitch.tv/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Twitch authentication failed: ${response.status}`
    );
  }

  const data = await response.json();

  return data.access_token;
}

app.get("/api/games", async (req, res) => {
  try {
    const clientId = process.env.IGDB_CLIENT_ID;

    const accessToken = await getIgdbAccessToken();

    const query = `
      fields
        name,
        genres.name,
        cover.image_id,
        total_rating,
        first_release_date,
        platforms.name;
      where total_rating != null & cover != null;
      sort total_rating desc;
      limit 10;
    `;

        const response = await fetch(
          "https://api.igdb.com/v4/games",
          {
            method: "POST",
            headers: {
              "Client-ID": clientId,
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",

            },
            body: query,
          }
        );

        if (!response.ok) {
          const errorDetails = await response.text();
          console.error("IGDB error:", errorDetails);

          return res.status(response.status).json({
            error: "Failed to fetch games from IGDB",
          });
        }

        const data = await response.json();

        const mappedGames = data.map((game) => ({
          id: game.id,
          title: game.name,
          genre: game.genres?.[0]?.name ?? "Unknown",
          image: game.cover?.image_id
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : null,
          rating: game.total_rating ?? null,
          released: game.first_release_date
            ? new Date(game.first_release_date * 1000).toISOString()
            : null,
          platforms: (game.platforms ?? []).map((platform) => ({
            platform,
          })),
        }));

        res.json(mappedGames);
  } catch (error) {
    console.log("Error fetching games:", error);

    res.status(500).json({
      error: "Something went wrong while fetching games",
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});