import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const LEADERBOARD_FILE = path.join(process.cwd(), 'app', 'public', 'leaderboard.json');

interface Player {
  name: string;
  score: number;
  rank: number;
}

async function ensureLeaderboardFile() {
  try {
    await fs.access(LEADERBOARD_FILE);
  } catch (error) {
    console.error('Leaderboard file not found, creating new file:', error);
    await fs.writeFile(LEADERBOARD_FILE, JSON.stringify({ players: [] }, null, 2));
  }
}

export async function GET() {
  try {
    await ensureLeaderboardFile();
    const fileContent = await fs.readFile(LEADERBOARD_FILE, 'utf-8');
    const leaderboardData = JSON.parse(fileContent);
    return NextResponse.json({data: leaderboardData});
  } catch (error) {
    console.error('Error reading leaderboard:', error);
    return NextResponse.json({ error: 'Failed to read leaderboard' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureLeaderboardFile();
    
    let newPlayer;
    try {
      newPlayer = await request.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }
    
    if (!newPlayer || typeof newPlayer.name !== 'string' || typeof newPlayer.score !== 'number') {
      return NextResponse.json({ error: 'Invalid player data' }, { status: 400 });
    }
    
    const fileContent = await fs.readFile(LEADERBOARD_FILE, 'utf-8');
    let leaderboardData: Player[];
    try {
      leaderboardData = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error parsing leaderboard file:', error);
      leaderboardData = [];
    }
    
    if (!Array.isArray(leaderboardData)) {
      leaderboardData = [];
    }
    
    const existingPlayerIndex = leaderboardData.findIndex(player => player.name === newPlayer.name);
    
    if (existingPlayerIndex !== -1) {
      leaderboardData[existingPlayerIndex].score = newPlayer.score;
    } else {
      leaderboardData.push(newPlayer);
    }
    
    leaderboardData.sort((a: Player, b: Player) => b.score - a.score);
    
    leaderboardData = leaderboardData.slice(0, 10);
    
    leaderboardData.forEach((player: Player, index: number) => {
      player.rank = index + 1;
    });
    
    await fs.writeFile(LEADERBOARD_FILE, JSON.stringify(leaderboardData, null, 2));
    
    return NextResponse.json({ message: 'Leaderboard updated successfully' });
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return NextResponse.json({ error: 'Failed to update leaderboard' }, { status: 500 });
  }
}
