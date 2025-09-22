const API_URL = "http://localhost:4000"; // change if backend runs on another port or server

export async function loginAdmin(email, password) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
}

export async function createTournament(tournamentData) {
  const res = await fetch(`${API_URL}/admin/tournaments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tournamentData),
  });
  return await res.json();
}

export async function getTournaments() {
  const res = await fetch(`${API_URL}/admin/tournaments`);
  return await res.json();
}