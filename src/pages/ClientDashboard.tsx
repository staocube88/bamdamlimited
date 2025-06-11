import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, MessageCircle, Camera, Video, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { mockProjects } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');

  // Get user's projects (in real app, filter by user ID)
  const userProjects = mockProjects.filter(project => project.clientId === user?.id);
  const activeProject = userProjects[0]; // For demo, show first project

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In real app, submit comment to API
      console.log('New comment:', newComment);
      setNewComment('');
    }
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Track your construction projects and stay updated on progress.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{userProjects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion</p>
                <p className="text-2xl font-bold text-gray-900">{activeProject?.progress || 0}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Days Left</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeProject ? Math.ceil((new Date(activeProject.expectedEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${activeProject?.budget.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        {activeProject && (
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{activeProject.name}</h2>
                  <p className="text-gray-600 mt-1">{activeProject.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activeProject.status)}`}>
                  {activeProject.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'progress', label: 'Progress', icon: Calendar },
                  { id: 'payments', label: 'Payments', icon: DollarSign },
                  { id: 'gallery', label: 'Gallery', icon: Camera },
                  { id: 'comments', label: 'Comments', icon: MessageCircle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{activeProject.location.address}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">
                          {new Date(activeProject.startDate).toLocaleDateString()} - {new Date(activeProject.expectedEndDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">${activeProject.budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                          <span className="text-sm font-medium text-gray-900">{activeProject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${activeProject.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{activeProject.timeline.length}</p>
                          <p className="text-sm text-gray-600">Milestones</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{activeProject.images.length}</p>
                          <p className="text-sm text-gray-600">Photos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline</h3>
                  <div className="space-y-6">
                    {activeProject.timeline.map((event, index) => (
                      <div key={event.id} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.type === 'milestone' ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {event.type === 'milestone' ? (
                              <CheckCircle className={`h-5 w-5 ${event.type === 'milestone' ? 'text-green-600' : 'text-blue-600'}`} />
                            ) : (
                              <Clock className={`h-5 w-5 ${event.type === 'milestone' ? 'text-green-600' : 'text-blue-600'}`} />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                            <span className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          {event.images && event.images.length > 0 && (
                            <div className="mt-3">
                              <img
                                src={event.images[0]}
                                alt="Timeline update"
                                className="h-20 w-32 object-cover rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment History</h3>
                  <div className="space-y-4">
                    {activeProject.payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <DollarSign className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{payment.description}</h4>
                            <p className="text-sm text-gray-600">{payment.method} • {new Date(payment.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${payment.amount.toLocaleString()}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                            {payment.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeProject.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Project progress ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                    {activeProject.videos.length > 0 && (
                      <div className="relative group">
                        <div className="w-full h-48 bg-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                          <Video className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                          <div className="text-white text-center">
                            <Video className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm">Video Update</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Discussion</h3>
                  
                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <div className="flex space-x-4">
                      <img
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff`}
                        alt={user?.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment or question..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                        <div className="mt-3 flex justify-end">
                          <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {activeProject.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-4">
                        <img
                          src={`https://ui-avatars.com/api/?name=${comment.userName}&background=${comment.userRole === 'admin' ? 'ef4444' : '2563eb'}&color=fff`}
                          alt={comment.userName}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{comment.userName}</h4>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  comment.userRole === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {comment.userRole}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {new Date(comment.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}