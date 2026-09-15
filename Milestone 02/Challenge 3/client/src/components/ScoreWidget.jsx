import React, { useState, useEffect } from 'react';
import { fetchScore } from '../services/api';
import { Award, TrendingUp } from 'lucide-react';

const ScoreWidget = ({ tasks }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getScore = async () => {
      try {
        const data = await fetchScore();
        setScore(data.value);
      } catch (err) {
        console.error('Error fetching score:', err);
      }
    };

    getScore();
  }, [tasks]);

  const completedTasks = tasks.filter(
    (task) => task.completed
  );

  const importantCompletedTasks = completedTasks.filter(
    (task) => task.important
  );

  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks.length / tasks.length) * 100
        );

  return (
    <div className="score-hero-card">
      <div className="score-hero-left">
        <h2>Your Productivity</h2>

        <div className="score-big">
          {score}
          <span>pts</span>
        </div>

        <p style={{ marginTop: '1rem', opacity: 0.7 }}>
          Keep completing tasks to stay consistent!
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <strong>{completedTasks.length}</strong>
            <span style={{ marginLeft: '5px' }}>
              completed
            </span>
          </div>

          <div>
            <strong>{importantCompletedTasks.length}</strong>
            <span style={{ marginLeft: '5px' }}>
              important
            </span>
          </div>

          <div>
            <strong>{completionPercentage}%</strong>
            <span style={{ marginLeft: '5px' }}>
              completion
            </span>
          </div>
        </div>
      </div>

      <div className="score-hero-right">
        <div
          className="status-badge"
          style={{
            background: '#4ade80',
            color: '#064e3b',
            marginBottom: '1rem'
          }}
        >
          <TrendingUp size={16} />
          {completionPercentage >= 70
            ? 'Great Progress'
            : 'Keep Going'}
        </div>

        <div
          className="logo-icon"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            color: 'white'
          }}
        >
          <Award size={48} />
        </div>
      </div>
    </div>
  );
};

export default ScoreWidget;