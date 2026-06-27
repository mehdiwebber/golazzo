export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { date, status, last } = req.query;
  let url = `https://v3.football.api-sports.io/fixtures?league=1&season=2026`;
  if (date) url += `&date=${date}`;
  if (status) url += `&status=${status}`;
  if (last) url += `&last=${last}`;
  const r = await fetch(url, { headers: { 'x-apisports-key': '6ee41c0587e10a6e7ef4a28c8d0ee899' } });
  const data = await r.json();
  res.json(data);
}
