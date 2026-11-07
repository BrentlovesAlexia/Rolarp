import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X } from 'lucide-react';

interface EditModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: UserProfile) => void;
}

export const EditProfileModal: React.FC<EditModalProps> = ({ profile, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-[#191919]">Edit — Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-[#f2f4f5] border border-[#d8d9dc] rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#0066ff]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full bg-[#f2f4f5] border border-[#d8d9dc] rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#0066ff]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Robux</label>
            <input
              type="number"
              value={formData.robux}
              onChange={(e) => setFormData({ ...formData, robux: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#f2f4f5] border border-[#d8d9dc] rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#0066ff]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Friends</label>
              <input
                type="text"
                value={formData.friends}
                onChange={(e) => setFormData({ ...formData, friends: e.target.value })}
                className="w-full bg-[#f2f4f5] border border-[#d8d9dc] rounded-lg p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Followers</label>
              <input
                type="text"
                value={formData.followers}
                onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                className="w-full bg-[#f2f4f5] border border-[#d8d9dc] rounded-lg p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Following</label>
              <input
                type="text"
                value={formData.following}
                onChange={(e) => setFormData({ ...formData, following: e.target.value })}
                className="w-full bg-[#f2f4f5] border border-[#d8d9dc] rounded-lg p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Bio</label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-[#f2f4f5] border border-[#d8d9dc] rounded-lg p-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Badges</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, badge: 'none' })}
                className={`p-2 rounded-lg text-xs font-bold border ${formData.badge === 'none' ? 'bg-[#191919] text-white' : 'bg-[#f2f4f5] border-[#d8d9dc]'}`}
              >
                No badge
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, badge: 'plus' })}
                className={`p-2 rounded-lg text-xs font-bold border ${formData.badge === 'plus' ? 'bg-[#0066ff] text-white' : 'bg-[#f2f4f5] border-[#d8d9dc]'}`}
              >
                Plus
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, badge: 'pro' })}
                className={`p-2 rounded-lg text-xs font-bold border ${formData.badge === 'pro' ? 'bg-[#0066ff] text-white' : 'bg-[#f2f4f5] border-[#d8d9dc]'}`}
              >
                Pro
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-3 rounded-xl transition-colors mt-2"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};
