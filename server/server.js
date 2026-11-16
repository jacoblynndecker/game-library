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
        summary,
        genres.name,
        cover.image_id,
        screenshots.image_id,
        total_rating,
        total_rating_count,
        first_release_date,
        platforms.name,
        platforms.platform_logo.image_id,
        involved_companies.company.name,
        involved_companies.developer,
        involved_companies.publisher;
      where total_rating != null
        & total_rating_count > 50
        & cover != null;
      sort total_rating_count desc;
      limit 20;
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
          description: game.summary ?? "No description available.",
          genre: game.genres?.[0]?.name ?? "Unknown",
          image: game.cover?.image_id
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : null,
          heroImage: game.screenshots?.length
            ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.screenshots[0].image_id}.jpg`
            : null,
          rating: game.total_rating ?? null,
          ratingCount: game.total_rating_count ?? 0,
          released: game.first_release_date
            ? new Date(game.first_release_date * 1000).toISOString()
            : null,
          platforms: (game.platforms ?? []).map((platform) => ({
            platform: {
              id: platform.id,
              name: platform.name,
              icon: platform.platform_logo?.image_id
                ? `https://images.igdb.com/igdb/image/upload/t_logo_med/${platform.platform_logo.image_id}.png`
                : null,
            },
          })),
          developers: (game.involved_companies ?? [])
            .filter((company) => company.developer)
            .map((company) => company.company?.name)
            .filter(Boolean),
          publishers: (game.involved_companies ?? [])
            .filter((company) => company.publisher)
            .map((company) => company.company?.name)
            .filter(Boolean),
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