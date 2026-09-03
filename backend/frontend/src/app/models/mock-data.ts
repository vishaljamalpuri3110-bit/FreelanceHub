import { Freelancer, Client, Project, Application, Task, Message, Notification } from './index';

export const MOCK_FREELANCERS: Freelancer[] = [
  {
    id: 'f1',
    name: 'Arpita Tiwari',
    email: 'arpita@example.com',
    role: 'freelancer',
    title: 'Senior Angular Developer',
    location: 'Bangalore, India',
    hourlyRate: 45,
    availability: 'Full-time (40hrs/week)',
    about: 'I am a passionate frontend developer with 5+ years of experience in building scalable web applications using Angular, TypeScript, and RxJS.',
    skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML/CSS', 'RxJS', 'Bootstrap'],
    experience: [
      {
        id: 'e1',
        title: 'Frontend Engineer',
        company: 'Tech Solutions Inc.',
        startDate: '2021-01-01',
        description: 'Developed and maintained enterprise-level Angular applications.'
      }
    ],
    education: [
      {
        id: 'ed1',
        degree: 'B.Tech in Computer Science',
        institution: 'Indian Institute of Technology',
        year: '2020'
      }
    ],
    portfolio: [
      {
        id: 'p1',
        title: 'E-commerce Dashboard',
        description: 'A complete admin dashboard built with Angular and Material.',
        imageUrl: 'https://placehold.co/600x400/6366f1/ffffff?text=E-commerce+Dashboard'
      }
    ],
    rating: 4.9,
    completedProjects: 24,
    avatarUrl: 'https://ui-avatars.com/api/?name=Arpita+Tiwari&background=6366f1&color=fff'
  },
  {
    id: 'f2',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    role: 'freelancer',
    title: 'UI/UX Designer',
    location: 'Mumbai, India',
    hourlyRate: 35,
    availability: 'Part-time (20hrs/week)',
    about: 'Creative UI/UX designer specializing in SaaS platforms and mobile apps.',
    skills: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'Adobe XD'],
    experience: [],
    education: [],
    portfolio: [],
    rating: 4.8,
    completedProjects: 15,
    avatarUrl: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=6366f1&color=fff'
  },
  {
    id: 'f3',
    name: 'Priya Patel',
    email: 'priya@example.com',
    role: 'freelancer',
    title: 'Full Stack Developer',
    location: 'Pune, India',
    hourlyRate: 50,
    availability: 'Full-time (40hrs/week)',
    about: 'Full stack developer with Node.js and Angular expertise.',
    skills: ['Angular', 'Node.js', 'Express', 'MongoDB', 'SQL'],
    experience: [],
    education: [],
    portfolio: [],
    rating: 5.0,
    completedProjects: 32,
    avatarUrl: 'https://ui-avatars.com/api/?name=Priya+Patel&background=6366f1&color=fff'
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Amit Verma',
    email: 'amit@example.com',
    role: 'client',
    companyName: 'Innovatech',
    industry: 'Technology',
    companyDescription: 'A fast-growing tech startup building the next generation of productivity tools.',
    postedProjects: 12,
    avatarUrl: 'https://ui-avatars.com/api/?name=Amit+Verma&background=4f46e5&color=fff'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'pr1',
    clientId: 'c1',
    clientName: 'Amit Verma',
    title: 'E-Commerce Website Frontend',
    description: 'Looking for an experienced Angular developer to build the frontend for our new e-commerce platform. The design is ready in Figma.',
    category: 'Web Development',
    requiredSkills: ['Angular', 'TypeScript', 'Bootstrap', 'RxJS'],
    budget: 3000,
    deadline: '2026-12-31',
    experienceLevel: 'Intermediate',
    projectType: 'Fixed Price',
    status: 'open',
    applicantsCount: 5
  },
  {
    id: 'pr2',
    clientId: 'c1',
    clientName: 'Amit Verma',
    title: 'Mobile Fitness Application Design',
    description: 'Need a talented UI/UX designer to create wireframes and high-fidelity prototypes for a fitness tracking app.',
    category: 'Design',
    requiredSkills: ['UI/UX', 'Figma', 'Mobile Design'],
    budget: 1500,
    deadline: '2026-10-15',
    experienceLevel: 'Expert',
    projectType: 'Fixed Price',
    status: 'open',
    applicantsCount: 12
  },
  {
    id: 'pr3',
    clientId: 'c1',
    clientName: 'Amit Verma',
    title: 'Business Analytics Dashboard',
    description: 'We need to build a comprehensive analytics dashboard to visualize sales and user data.',
    category: 'Web Development',
    requiredSkills: ['Angular', 'D3.js', 'TypeScript', 'HTML/CSS'],
    budget: 4500,
    deadline: '2027-01-20',
    experienceLevel: 'Expert',
    projectType: 'Hourly',
    status: 'in-progress',
    applicantsCount: 3,
    progress: 45
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'a1',
    projectId: 'pr1',
    projectTitle: 'E-Commerce Website Frontend',
    freelancerId: 'f1',
    freelancerName: 'Arpita Tiwari',
    clientId: 'c1',
    clientName: 'Amit Verma',
    appliedDate: '2026-08-20',
    budget: 3000,
    status: 'pending'
  },
  {
    id: 'a2',
    projectId: 'pr2',
    projectTitle: 'Mobile Fitness Application Design',
    freelancerId: 'f1',
    freelancerName: 'Arpita Tiwari',
    clientId: 'c1',
    clientName: 'Amit Verma',
    appliedDate: '2026-08-15',
    budget: 1500,
    status: 'rejected'
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    projectId: 'pr3',
    title: 'Setup Angular Project Structure',
    assignedTo: 'f1',
    priority: 'High',
    dueDate: '2026-09-01',
    status: 'Completed'
  },
  {
    id: 't2',
    projectId: 'pr3',
    title: 'Implement Authentication Guards',
    assignedTo: 'f1',
    priority: 'High',
    dueDate: '2026-09-05',
    status: 'In Progress'
  },
  {
    id: 't3',
    projectId: 'pr3',
    title: 'Create Reusable Charts Components',
    assignedTo: 'f1',
    priority: 'Medium',
    dueDate: '2026-09-15',
    status: 'To Do'
  },
  {
    id: 't4',
    projectId: 'pr3',
    title: 'Design Dashboard Layout',
    assignedTo: 'f2',
    priority: 'Medium',
    dueDate: '2026-09-10',
    status: 'Review'
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    projectId: 'pr3',
    senderId: 'c1',
    senderName: 'Amit Verma',
    senderRole: 'client',
    content: 'Hi team, how is the progress on the dashboard layout?',
    timestamp: '2026-08-29T10:00:00Z',
    avatarUrl: 'https://ui-avatars.com/api/?name=Amit+Verma&background=4f46e5&color=fff'
  },
  {
    id: 'm2',
    projectId: 'pr3',
    senderId: 'f2',
    senderName: 'Rahul Sharma',
    senderRole: 'freelancer',
    content: 'I have pushed the latest Figma designs for review.',
    timestamp: '2026-08-29T10:15:00Z',
    avatarUrl: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=6366f1&color=fff'
  },
  {
    id: 'm3',
    projectId: 'pr3',
    senderId: 'f1',
    senderName: 'Arpita Tiwari',
    senderRole: 'freelancer',
    content: 'Looks great! I will start implementing the layout components today.',
    timestamp: '2026-08-29T10:30:00Z',
    avatarUrl: 'https://ui-avatars.com/api/?name=Arpita+Tiwari&background=6366f1&color=fff'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    userId: 'f1',
    title: 'New Project Invitation',
    message: 'Amit Verma has invited you to apply for "Business Analytics Dashboard".',
    type: 'info',
    timestamp: '2026-08-28T09:00:00Z',
    read: false,
    link: '/projects/pr3'
  },
  {
    id: 'n2',
    userId: 'f1',
    title: 'Application Update',
    message: 'Your application for "Mobile Fitness Application Design" was rejected.',
    type: 'warning',
    timestamp: '2026-08-27T14:30:00Z',
    read: true,
    link: '/freelancer/applications'
  }
];
