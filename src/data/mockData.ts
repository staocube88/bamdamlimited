import { Project, Service } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Modern Family Home',
    description: 'A beautiful 3-bedroom family home with contemporary design and eco-friendly features.',
    clientId: '1',
    status: 'in-progress',
    startDate: '2024-01-15',
    expectedEndDate: '2024-08-15',
    budget: 450000,
    location: {
      address: '123 Oak Street, Springfield',
      coordinates: { lat: 42.1015, lng: -72.5898 }
    },
    progress: 65,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396119/pexels-photo-1396119.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    videos: [
      'https://example.com/video1.mp4'
    ],
    timeline: [
      {
        id: '1',
        title: 'Foundation Complete',
        description: 'Foundation and basement work has been completed successfully.',
        date: '2024-02-15',
        type: 'milestone',
        images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400']
      },
      {
        id: '2',
        title: 'Framing in Progress',
        description: 'Wall framing and roof structure are currently being installed.',
        date: '2024-03-10',
        type: 'update'
      },
      {
        id: '3',
        title: 'Electrical Systems',
        description: 'Electrical wiring and panel installation completed.',
        date: '2024-04-20',
        type: 'milestone'
      }
    ],
    payments: [
      {
        id: '1',
        amount: 112500,
        status: 'completed',
        date: '2024-01-15',
        description: 'Initial payment - 25%',
        method: 'Bank Transfer'
      },
      {
        id: '2',
        amount: 112500,
        status: 'completed',
        date: '2024-03-01',
        description: 'Progress payment - 25%',
        method: 'Bank Transfer'
      },
      {
        id: '3',
        amount: 112500,
        status: 'pending',
        date: '2024-05-01',
        description: 'Progress payment - 25%',
        method: 'Bank Transfer'
      }
    ],
    comments: [
      {
        id: '1',
        userId: '1',
        userName: 'John Smith',
        userRole: 'client',
        content: 'The progress looks great! When do you expect the roofing to be completed?',
        timestamp: '2024-03-15T10:30:00Z'
      },
      {
        id: '2',
        userId: '2',
        userName: 'Sarah Johnson',
        userRole: 'admin',
        content: 'Thank you! The roofing should be completed by end of next week, weather permitting.',
        timestamp: '2024-03-15T14:45:00Z',
        parentId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Commercial Office Building',
    description: 'A 5-story commercial office building with modern amenities and sustainable features.',
    clientId: '3',
    status: 'planning',
    startDate: '2024-06-01',
    expectedEndDate: '2025-12-01',
    budget: 2500000,
    location: {
      address: '456 Business Ave, Downtown',
      coordinates: { lat: 42.1125, lng: -72.5995 }
    },
    progress: 15,
    images: [
      'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    videos: [],
    timeline: [
      {
        id: '1',
        title: 'Permit Approval',
        description: 'All construction permits have been approved by the city.',
        date: '2024-04-15',
        type: 'milestone'
      }
    ],
    payments: [
      {
        id: '1',
        amount: 500000,
        status: 'completed',
        date: '2024-04-01',
        description: 'Initial payment - 20%',
        method: 'Wire Transfer'
      }
    ],
    comments: []
  }
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Residential Construction',
    description: 'Custom homes and residential buildings designed to your specifications.',
    icon: 'Home',
    features: ['Custom Design', 'Quality Materials', 'Timely Delivery', 'Warranty Included']
  },
  {
    id: '2',
    title: 'Commercial Construction',
    description: 'Office buildings, retail spaces, and commercial developments.',
    icon: 'Building2',
    features: ['Large Scale Projects', 'Modern Design', 'Sustainable Building', 'Project Management']
  },
  {
    id: '3',
    title: 'Renovation & Remodeling',
    description: 'Transform your existing space with our renovation expertise.',
    icon: 'Wrench',
    features: ['Interior Design', 'Structural Changes', 'Modern Upgrades', 'Budget Friendly']
  },
  {
    id: '4',
    title: 'Project Management',
    description: 'Complete project oversight from planning to completion.',
    icon: 'ClipboardList',
    features: ['Timeline Management', 'Budget Control', 'Quality Assurance', 'Regular Updates']
  }
];