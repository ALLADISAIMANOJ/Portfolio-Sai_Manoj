export const profile = {
  name: 'Alladi Sai Manoj',
  initials: 'SM',
  title: 'Software Engineer · AI & Backend',
  location: 'Hyderabad, India',
  timeZone: 'Asia/Kolkata',
  summary: 'I build AI assistants that check their sources and backend systems that recover cleanly when something goes wrong.',
  bio: [
    'I enjoy the hard part of AI: making it dependable. I’ve built document assistants, agents that use tools, and the payment services those tools have to respect.',
    'I care about the moment a system is unsure. Can it show the evidence, ask for a review, or stop before it repeats an action?',
  ],
  experience: '2.5+',
  solved: '500+',
  award: 'Techaviskar Hackathon winner',
  education: {
    school: 'Chaitanya Bharathi Institute of Technology',
    short: 'CBIT',
    degree: 'B.E. in Computer Science and Engineering',
    dates: '2020–2024',
    gpa: '9.5',
  },
  links: {
    linkedin: 'https://linkedin.com/in/sai-manoj-904079251/',
    github: 'https://github.com/ALLADISAIMANOJ',
    leetcode: 'https://leetcode.com/ALLADI_SAI_MANOJ/',
  },
  roles: [
    {
      id: 'amazon', company: 'Amazon', team: 'Amazon Pay', title: 'Software Development Engineer',
      start: 'May 2026', end: 'Present',
      summary: 'Building AI-assisted investigation tools and reliable recovery workflows for payment operations.',
      points: [
        'Built an AI assistant to help engineers gather evidence and investigate payment issues.',
        'Developed a repeatable recovery workflow with a preview step, so engineers can review a proposed action before running it.',
        'Worked on verification loops for engineering agents and on making retries safer in distributed systems.',
      ],
      tags: ['Amazon Bedrock', 'MCP', 'Python', 'AWS CDK', 'Event-driven systems'],
    },
    {
      id: 'thoughtworks', company: 'Thoughtworks', team: 'Backend Engineering', title: 'Software Developer',
      start: 'Aug 2024', end: 'May 2026',
      summary: 'Built backend services and integrations for enterprise applications.',
      points: [
        'Developed Spring Boot and .NET services for reporting and workflow automation.',
        'Connected APIs to a multi-zone frontend and used caching to speed up frequently requested data.',
        'Used developer and reviewer agents to support engineering standards throughout delivery.',
      ],
      tags: ['Java', 'Spring Boot', '.NET', 'Redis', 'Next.js'],
    },
    {
      id: 'smartbridge', company: 'Smartbridge', team: 'Applied AI', title: 'AI Engineer',
      start: 'May 2023', end: 'Jul 2024',
      summary: 'Built a retrieval-augmented assistant for questions about uploaded documents.',
      points: [
        'Built a pipeline to extract, clean and retrieve passages from documents and tables.',
        'Grounded answers in those passages and tuned retrieval to reduce irrelevant context.',
      ],
      tags: ['Python', 'RAG', 'OpenAI', 'Document processing'],
    },
  ],
  toolkit: [
    ['Python', 'Java', 'TypeScript', 'Amazon Bedrock', 'MCP', 'RAG', 'Lambda'],
    ['DynamoDB', 'SQS', 'Spring Boot', '.NET', 'Redis', 'AWS CDK', 'Next.js'],
  ],
};
