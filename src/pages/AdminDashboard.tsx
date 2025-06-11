import React, { useState } from 'react';
import { 
  Users, 
  Building, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Camera, 
  Video, 
  MessageCircle,
  Plus,
  Edit,
  Upload,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { mockProjects } from '../data/mockData';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const stats = {
    totalProjects: mockProjects.length,
    activeProjects: mockProjects.filter(p => p.status === 'in-progress').length,
    totalRevenue: mockProjects.reduce((sum, p) => sum + p.budget, 0),
    averageProgress: Math.round(mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ProjectCard = ({ project }: { project: any }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
          {project.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {project.location.address.split(',')[0]}
          </span>
          <span className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            ${project.budget.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <button 
          onClick={() => setSelectedProject(project)}
          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Manage
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Edit className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const NewProjectModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select client</option>
                  <option>John Smith</option>
                  <option>Sarah Johnson</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Project description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project budget"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected End Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Project address"
              />
            </div>
          </form>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowNewProjectModal(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Project
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your construction projects and track progress.</p>
          </div>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Project</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageProgress}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">All Projects</h2>
              </div>
              <div className="p-6">
                <div className="grid gap-6">
                  {mockProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Project Details */}
          <div className="space-y-6">
            {/* Project Overview */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{selectedProject.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{selectedProject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedProject.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">${selectedProject.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Timeline</span>
                    <span className="font-medium">
                      {Math.ceil((new Date(selectedProject.expectedEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Milestones</span>
                    <span className="font-medium">{selectedProject.timeline.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button 
                  onClick={() => setShowUpdateModal(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Upload className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Upload Progress Update</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Camera className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Add Photos</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Video className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-900">Upload Video</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                  <MessageCircle className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Respond to Comments</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { icon: CheckCircle, text: 'Foundation milestone completed', time: '2 hours ago', color: 'text-green-600' },
                    { icon: Camera, text: 'New photos uploaded', time: '5 hours ago', color: 'text-blue-600' },
                    { icon: MessageCircle, text: 'Client comment received', time: '1 day ago', color: 'text-yellow-600' },
                    { icon: AlertTriangle, text: 'Weather delay reported', time: '2 days ago', color: 'text-red-600' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showNewProjectModal && <NewProjectModal />}
        
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full m-4">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Upload Progress Update</h2>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Update title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe the progress update"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Update</option>
                      <option>Milestone</option>
                      <option>Issue</option>
                      <option>Completion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload photos</p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Upload Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}