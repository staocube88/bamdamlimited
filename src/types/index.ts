export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'admin';
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string;
  budget: number;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  progress: number;
  images: string[];
  videos: string[];
  timeline: TimelineEvent[];
  payments: Payment[];
  comments: Comment[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'milestone' | 'update' | 'issue' | 'completion';
  images?: string[];
}

export interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
  method: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userRole: 'client' | 'admin';
  content: string;
  timestamp: string;
  parentId?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}