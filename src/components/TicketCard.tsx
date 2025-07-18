import React, { useState } from 'react';
import { Calendar, User, Flag, MessageCircle, Paperclip, Camera, Clock } from 'lucide-react';
import { Ticket, Comment } from '../types';

interface TicketCardProps {
  ticket: Ticket;
  propertyTitle: string;
  onUpdateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, propertyTitle, onUpdateTicket }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [newStatus, setNewStatus] = useState(ticket.status);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: 'Current User',
      content: newComment,
      timestamp: new Date().toISOString(),
      attachments: selectedImage ? [selectedImage.name] : [],
    };

    const updatedComments = [...ticket.comments, comment];
    onUpdateTicket(ticket.id, {
      comments: updatedComments,
      updatedDate: new Date().toISOString(),
    });

    setNewComment('');
    setSelectedImage(null);
  };

  const handleStatusChange = () => {
    if (newStatus !== ticket.status) {
      onUpdateTicket(ticket.id, {
        status: newStatus as any,
        updatedDate: new Date().toISOString(),
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-SG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                <Flag size={12} className="inline mr-1" />
                {ticket.priority}
              </span>
            </div>
            <p className="text-sm text-blue-600 font-medium mb-2">{propertyTitle}</p>
            <p className="text-gray-700 mb-3">{ticket.description}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              onBlur={handleStatusChange}
              className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(newStatus)}`}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span>{ticket.assignee}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{getTimeAgo(ticket.createdDate)}</span>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <MessageCircle size={14} className="mr-1" />
            {ticket.comments.length} comments
          </button>
        </div>

        {isExpanded && (
          <div className="border-t border-gray-200 pt-4">
            {/* Comments */}
            <div className="space-y-4 mb-6">
              {ticket.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{comment.author}</span>
                    </div>
                    <span className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  {comment.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {comment.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          <Paperclip size={12} className="mr-1" />
                          {attachment}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="bg-gray-50 rounded-lg p-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment or update..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-3">
                  <label className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 transition-colors">
                    <Camera size={16} className="mr-1" />
                    <span className="text-sm">Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {selectedImage && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                      {selectedImage.name} selected
                    </span>
                  )}
                </div>
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;