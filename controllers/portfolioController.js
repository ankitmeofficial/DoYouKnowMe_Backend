const checkHealth = (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Ankit Kumar Singh - Portfolio Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};

const getPortfolioOverview = (req, res) => {
  res.status(200).json({
    developer: 'Ankit Kumar Singh',
    role: 'Full Stack Developer (MERN)',
    location: 'Bangalore, Karnataka',
    email: 'ankitmeofficial@gmail.com',
    phone: '+91-6203288175',
    education: {
      degree: 'B.E - CSE (Cyber Security)',
      institution: 'Sambhram Institute of Technology, Bangalore',
      period: '2022 - 2026',
    },
    experience: [
      {
        company: 'Supraja Technologies',
        role: 'Full Stack Developer Intern (MERN Stack)',
        period: 'Sep 2024 - Dec 2024',
        location: 'Bangalore, India',
      },
    ],
    projects: [
      {
        title: 'CampusFolio',
        tagline: 'Placement Drive Student Management Portal',
        period: 'Aug 2025 - June 2026',
      },
      {
        title: 'SkillUp EduPlay',
        tagline: 'Interactive Educational Game with Rewards System',
        period: 'Nov 05, 2024',
      },
    ],
  });
};

module.exports = {
  checkHealth,
  getPortfolioOverview,
};
