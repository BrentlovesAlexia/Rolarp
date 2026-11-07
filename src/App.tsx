import React, { useState } from 'react';
import { UserProfile, WearingItem, Transaction } from './types';
import { Avatar3DView } from './components/Avatar3DView';
import { EditProfileModal } from './components/EditProfileModal';
import { User, ShoppingBag, CreditCard, Box, Check, Search } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'avatar' | 'inventory' | 'trade' | 'robux'>('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [purchaseSuccessMsg, setPurchaseSuccessMsg] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    username: 'matelarps',
    displayName: 'matelarps',
    robux: 55488,
    friends: '1',
    followers: '5.6M',
    following: '0',
    bio: 'yoo zlarp',
    badge: 'pro'
  });

  const [wearingItems, setWearingItems] = useState<WearingItem[]>([
    { id: '1285307', name: 'Sparkle Time Fedora', price: '3,496,767', imgUrl: 'https://www.roblox.com/asset-thumbnail/image?assetId=1285307&width=420&height=420&format=png' },
    { id: '215718515', name: 'Fiery Horns of the Net...', price: '2,119,998', imgUrl: 'https://www.roblox.com/asset-thumbnail/image?assetId=215718515&width=420&height=420&format=png' },
    { id: '398633812', name: 'Checkered Shirt', price: 'Free', imgUrl: 'https://www.roblox.com/asset-thumbnail/image?assetId=398633812&width=420&height=420&format=png' }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'Incoming Robux', details: 'Robux Stipends', amount: 222222 },
    { id: '2', type: 'Incoming Robux', details: 'Sales of Goods', amount: 100000000 }
  ]);

  const [customAssetInput, setCustomAssetInput] = useState('');

  const handleBuyRobux = (amount: number, priceStr: string) => {
    const updatedRobux = profile.robux + amount;
    setProfile({ ...profile, robux: updatedRobux });

    const newTrans: Transaction = {
      id: Date.now().toString(),
      type: 'Incoming Robux',
      details: `Purchased Package (${priceStr})`,
      amount: amount
    };
    setTransactions([newTrans, ...transactions]);
    setPurchaseSuccessMsg(`${amount.toLocaleString()} Robux successfully added into balance!`);
  };

  const handleAddCustomAsset = () => {
    if (!customAssetInput.trim()) return;
    const newItem: WearingItem = {
      id: customAssetInput,
      name: `Custom Item ${customAssetInput}`,
      price: 'Equipped',
      imgUrl: `https://www.roblox.com/asset-thumbnail/image?assetId=${customAssetInput}&width=420&height=420&format=png`
    };
    setWearingItems([...wearingItems, newItem]);
    setCustomAssetInput('');
  };

  return (
    <div className="w-full max-w-6xl h-screen max-h-[900px] bg-[#f2f4f5] flex flex-col overflow-hidden shadow-2xl relative my-auto">
      
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-[#d8d9dc] px-4 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-black tracking-tighter text-black cursor-pointer">ROBLOX</span>
          <nav className="hidden md:flex gap-4 text-sm font-semibold text-gray-500">
            <span onClick={() => setActiveTab('profile')} className="cursor-pointer hover:text-black">Charts</span>
            <span onClick={() => setActiveTab('inventory')} className="cursor-pointer hover:text-black">Marketplace</span>
            <span onClick={() => setActiveTab('avatar')} className="cursor-pointer hover:text-black">Create</span>
            <span onClick={() => setActiveTab('robux')} className="cursor-pointer hover:text-black">Robux</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#e8eaed] rounded-lg px-3 py-1.5 w-48">
            <Search size={14} className="text-gray-500" />
            <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-xs w-full" />
          </div>

          <button
            onClick={() => setActiveTab('robux')}
            className="flex items-center gap-1.5 bg-[#f2f4f5] hover:bg-[#e4e6e8] border border-[#d8d9dc] px-3 py-1 rounded-full text-xs font-bold transition-colors"
          >
            <span className="w-4 h-4 border-2 border-[#191919] rounded-full text-[9px] font-black flex items-center justify-center">R</span>
            <span>{profile.robux.toLocaleString()}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 min-h-0 relative">
        
        {/* Left Sidebar */}
        <aside className="w-52 bg-white border-r border-[#d8d9dc] hidden md:flex flex-col p-2 space-y-1 shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'profile' ? 'bg-[#e8eaed] text-black font-bold' : 'text-gray-700 hover:bg-[#f2f4f5]'}`}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('avatar')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'avatar' ? 'bg-[#e8eaed] text-black font-bold' : 'text-gray-700 hover:bg-[#f2f4f5]'}`}
          >
            <Box size={18} />
            <span>Avatar</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'inventory' ? 'bg-[#e8eaed] text-black font-bold' : 'text-gray-700 hover:bg-[#f2f4f5]'}`}
          >
            <ShoppingBag size={18} />
            <span>Inventory</span>
          </button>
          <button
            onClick={() => setActiveTab('trade')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'trade' ? 'bg-[#e8eaed] text-black font-bold' : 'text-gray-700 hover:bg-[#f2f4f5]'}`}
          >
            <CreditCard size={18} />
            <span>Trade</span>
          </button>
        </aside>

        {/* Dynamic Content Views */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f2f4f5]">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-xl border border-[#d8d9dc] p-6 shadow-sm">
                
                {/* 3D Banner Stage */}
                <div className="w-full h-64 bg-gradient-to-b from-[#e6e8eb] to-[#cbcfd4] rounded-xl overflow-hidden border border-[#d8d9dc] relative mb-6">
                  <Avatar3DView />
                  <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-gray-700 shadow-sm">
                    3D Interactive Orbit 🔄
                  </span>
                </div>

                {/* Profile Header Details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={wearingItems[0]?.imgUrl || 'https://www.roblox.com/asset-thumbnail/image?assetId=1285307&width=420&height=420&format=png'}
                      alt="Avatar Head"
                      className="w-16 h-16 rounded-full border-2 border-[#d8d9dc] object-contain bg-white"
                    />
                    <div>
                      <h1 className="text-2xl font-black text-black flex items-center gap-1.5">
                        {profile.displayName}
                        {profile.badge !== 'none' && (
                          <span className="bg-[#0066ff] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {profile.badge === 'plus' ? '+' : '✓'}
                          </span>
                        )}
                      </h1>
                      <p className="text-xs text-gray-500">@{profile.username}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setActiveTab('avatar')} className="bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors">
                      Edit appearance
                    </button>
                    <button onClick={() => setIsEditModalOpen(true)} className="bg-[#e3e4e6] hover:bg-[#d4d6d9] text-black font-bold text-xs px-4 py-2.5 rounded-lg transition-colors">
                      Edit profile
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <span className="bg-[#f2f4f5] px-3.5 py-1.5 rounded-full text-xs text-gray-600">
                    <strong className="text-black font-bold">{profile.friends}</strong> Friends
                  </span>
                  <span className="bg-[#f2f4f5] px-3.5 py-1.5 rounded-full text-xs text-gray-600">
                    <strong className="text-black font-bold">{profile.followers}</strong> Followers
                  </span>
                  <span className="bg-[#f2f4f5] px-3.5 py-1.5 rounded-full text-xs text-gray-600">
                    <strong className="text-black font-bold">{profile.following}</strong> Following
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-700 bg-[#f9fafb] p-3 rounded-lg border border-gray-100">{profile.bio}</p>
              </div>

              {/* Currently Wearing Grid */}
              <div>
                <h2 className="text-lg font-extrabold mb-3">Currently Wearing</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {wearingItems.map((item) => (
                    <div key={item.id} className="bg-white border border-[#d8d9dc] rounded-xl p-3 flex flex-col hover:border-gray-400 transition-all">
                      <img src={item.imgUrl} alt={item.name} className="w-full h-28 object-contain bg-[#f9fafb] rounded-lg mb-2" />
                      <span className="text-xs font-bold truncate">{item.name}</span>
                      <span className="text-[11px] text-gray-500 mt-0.5">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AVATAR EDITOR TAB */}
          {activeTab === 'avatar' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-xl font-extrabold">Avatar Editor</h1>
              <div className="bg-white border border-[#d8d9dc] rounded-xl p-6 shadow-sm space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Enter Asset ID to Wear</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 215718515"
                      value={customAssetInput}
                      onChange={(e) => setCustomAssetInput(e.target.value)}
                      className="bg-[#f2f4f5] border border-[#d8d9dc] rounded-lg p-2.5 text-sm flex-1 outline-none"
                    />
                    <button onClick={handleAddCustomAsset} className="bg-[#0066ff] text-white font-bold text-xs px-4 rounded-lg">
                      Add & wear
                    </button>
                  </div>
                </div>

                <h2 className="text-sm font-bold text-gray-700 pt-2">Equipped Outfit Items</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {wearingItems.map((item) => (
                    <div key={item.id} className="bg-[#f9fafb] border border-[#d8d9dc] rounded-xl p-3 flex flex-col items-center text-center">
                      <img src={item.imgUrl} alt={item.name} className="w-20 h-20 object-contain mb-2" />
                      <span className="text-xs font-bold truncate w-full">{item.name}</span>
                      <button
                        onClick={() => setWearingItems(wearingItems.filter((i) => i.id !== item.id))}
                        className="mt-2 bg-gray-200 hover:bg-gray-300 text-black text-[10px] font-bold py-1 px-3 rounded-md w-full"
                      >
                        Take off
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INVENTORY TAB */}
          {activeTab === 'inventory' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-xl font-extrabold">My Inventory</h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div className="bg-white border border-[#d8d9dc] rounded-xl p-3 relative flex flex-col">
                  <span className="absolute top-2 left-2 bg-[#00b06f] text-white text-[8px] font-black px-1.5 py-0.5 rounded">LIMITED U</span>
                  <img src="https://www.roblox.com/asset-thumbnail/image?assetId=138932947&width=420&height=420&format=png" className="w-full h-28 object-contain bg-[#f9fafb] rounded-lg mb-2" />
                  <span className="text-xs font-bold truncate">Dominus Astra</span>
                  <span className="text-[11px] font-bold text-[#00b06f] mt-1">R$ 150M+</span>
                </div>
                <div className="bg-white border border-[#d8d9dc] rounded-xl p-3 relative flex flex-col">
                  <span className="absolute top-2 left-2 bg-[#00b06f] text-white text-[8px] font-black px-1.5 py-0.5 rounded">LIMITED U</span>
                  <img src="https://www.roblox.com/asset-thumbnail/image?assetId=21070012&width=420&height=420&format=png" className="w-full h-28 object-contain bg-[#f9fafb] rounded-lg mb-2" />
                  <span className="text-xs font-bold truncate">Dominus Empyreus</span>
                  <span className="text-[11px] font-bold text-[#00b06f] mt-1">R$ 618M+</span>
                </div>
              </div>
            </div>
          )}

          {/* TRADE / TRANSACTIONS TAB */}
          {activeTab === 'trade' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-xl font-extrabold">My Transactions</h1>
              <div className="bg-white border border-[#d8d9dc] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f9fafb] border-b border-[#d8d9dc] text-gray-500 font-bold uppercase">
                    <tr>
                      <th className="p-3">Type</th>
                      <th className="p-3">Details</th>
                      <th className="p-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d8d9dc]">
                    {transactions.map((t) => (
                      <tr key={t.id}>
                        <td className="p-3 font-bold text-[#00b06f]">{t.type}</td>
                        <td className="p-3 text-gray-700">{t.details}</td>
                        <td className="p-3 font-bold text-[#00b06f]">+ {t.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* BUY ROBUX SHOP TAB */}
          {activeTab === 'robux' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-xl font-extrabold">Buy Robux</h1>
              <p className="text-xs text-gray-500">Select a Robux tier package to credit your simulated balance.</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { amount: 400, price: '$4.99' },
                  { amount: 800, price: '$9.99' },
                  { amount: 1700, price: '$19.99' },
                  { amount: 4500, price: '$49.99' }
                ].map((tier) => (
                  <div key={tier.amount} className="bg-white border border-[#d8d9dc] rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                    <div className="text-2xl font-black flex items-center gap-1 my-2">
                      <span className="w-5 h-5 border-2 border-black rounded-full text-[10px] font-black flex items-center justify-center">R</span>
                      <span>{tier.amount.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => handleBuyRobux(tier.amount, tier.price)}
                      className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs py-2.5 rounded-xl transition-colors mt-3"
                    >
                      {tier.price}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden h-14 bg-white border-t border-[#d8d9dc] flex items-center justify-around z-30 shrink-0">
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center text-[10px] ${activeTab === 'profile' ? 'text-[#0066ff] font-bold' : 'text-gray-500'}`}>
          <User size={18} />
          <span>Profile</span>
        </button>
        <button onClick={() => setActiveTab('avatar')} className={`flex flex-col items-center text-[10px] ${activeTab === 'avatar' ? 'text-[#0066ff] font-bold' : 'text-gray-500'}`}>
          <Box size={18} />
          <span>Avatar</span>
        </button>
        <button onClick={() => setActiveTab('inventory')} className={`flex flex-col items-center text-[10px] ${activeTab === 'inventory' ? 'text-[#0066ff] font-bold' : 'text-gray-500'}`}>
          <ShoppingBag size={18} />
          <span>Inventory</span>
        </button>
        <button onClick={() => setActiveTab('trade')} className={`flex flex-col items-center text-[10px] ${activeTab === 'trade' ? 'text-[#0066ff] font-bold' : 'text-gray-500'}`}>
          <CreditCard size={18} />
          <span>Trade</span>
        </button>
      </nav>

      {/* Edit Profile Modal Component */}
      <EditProfileModal
        profile={profile}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(updated) => setProfile(updated)}
      />

      {/* Purchase Success Modal */}
      {purchaseSuccessMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 bg-green-100 text-[#00b06f] rounded-full flex items-center justify-center mx-auto mb-3">
              <Check size={24} />
            </div>
            <h3 className="text-lg font-extrabold text-black mb-2">Purchase Complete</h3>
            <p className="text-xs text-gray-600 mb-5">{purchaseSuccessMsg}</p>
            <button
              onClick={() => setPurchaseSuccessMsg(null)}
              className="w-full bg-[#0066ff] text-white font-bold py-2.5 rounded-xl text-xs"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
