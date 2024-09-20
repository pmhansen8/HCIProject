import React, { useState, useEffect } from 'react';
import Navbar from "../components/NavBar";
import { database } from '../config';  // Adjust the import according to your setup
import { Container, Table } from 'react-bootstrap';

export default function LeaderBoard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const snapshot = await database.ref("My-Profile").orderByChild("highscore").limitToLast(10).once("value");
                const data = snapshot.val();
                const leaderboardData = [];

                for (let userId in data) {
                    leaderboardData.push({
                        userId,
                        highscore: data[userId].highscore,
                    });
                }

                leaderboardData.sort((a, b) => b.highscore - a.highscore); // Sort by highscore in descending order
                setLeaderboard(leaderboardData);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div style={{ background: "linear-gradient(to bottom, black, gray)", color: 'white', minHeight: '100vh' }}>
            <Navbar />
            <Container style={{ padding: '2rem' }}>
                <h1 className="text-center">Leaderboard</h1>
                <Table striped bordered hover variant="dark" style={{ color: 'white'}}>
                    <thead>
                    <tr>
                        <th>Rank</th>

                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={entry.userId}>
                            <td>{index + 1}</td>
                            <td>{entry.highscore}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}
