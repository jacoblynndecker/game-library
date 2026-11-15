// Import dependencies
import express from "express";
import "dotenv/config";

// Initialize Express app
const app = express();

// Store Twitch access token in memory
let accessToken = null;
let tokenExpiration = null;

// Get a Twitch access token, using the cached token when available
async function getIgdbAccessToken() {

  // Reuse the cached token if it hasn't expired
  if (accessToken && tokenExpiration > Date.now() + 60_000) {
    return accessToken;
  }

  // Retrieve Twitch credentials from environment variables
  const clientId = process.env.IGDB_CLIENT_ID;
  const clientSecret = process.env.IGDB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("IGDB credentials are missing");
  }

  // Prepare the OAuth request
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  // Request a new access token from Twitch
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
    const errorDetails = await response.text();

    throw new Error(
      `Twitch authentication failed (${response.status}): ${errorDetails}`
    );
  }

  // Parse and validate the token response
  const data = await response.json();

  if (
    !data.access_token ||
    !Number.isFinite(data.expires_in) ||
    data.expires_in <= 0
  ) {
    throw new Error("Invalid Twitch token response");
  }

  // Cache the token and calculate its expiration time
  accessToken = data.access_token;
  tokenExpiration = Date.now() + data.expires_in * 1000;

  return accessToken;
}

// Fetch games from IGDB and return them to the frontend
app.get("/api/games", async (req, res) => {
  try {

    // Get Twitch credentials and access token
    const clientId = process.env.IGDB_CLIENT_ID;

    const accessToken = await getIgdbAccessToken();

    // Define the IGDB query
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

      // Request game data from IGDB
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

      // Handle unsuccessful IGDB responses
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("IGDB error:", errorDetails);

        return res.status(response.status).json({
          error: "Failed to fetch games from IGDB",
        });
      }

      // Parse the IGDB response
      const data = await response.json();

      // Make sure IGDB returned an array
      if (!Array.isArray(data)) {
        throw new Error("Invalid IGDB response: expected an array");
      }

      // Filter out invalid entries and format game data
      const mappedGames = data
        .filter(
          (game) =>
            game &&
            typeof game === "object" &&
            Number.isInteger(game.id) &&
            typeof game.name === "string"
        )
        .map((game) => ({
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

        // Send the formatted games to the frontend
      res.json(mappedGames);
  } catch (error) {
    // Log unexpected errors on the server
    console.error("Error fetching games:", error.message);

    // Send a generic error response to the frontend
    res.status(500).json({
      error: "Something went wrong while fetching games",
    });
  }
});

// Start the Express server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});