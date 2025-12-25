import { Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal.jsx';
import CoinTable from './manageCoins/CoinTable.jsx';
import CreateCoinModal from './manageCoins/CreateCoinModal.jsx';
import EditCoinModal from './manageCoins/EditCoinModal.jsx';
import SubVolatilityModal from './manageCoins/SubVolatilityModal.jsx';
import VolatilityModal from './manageCoins/VolatilityModal.jsx';
import { useNotification } from './NotificationProvider.jsx';

const ManageCoins = () => {
  const { showError, showWarning, showSuccess } = useNotification();
  const [coins, setCoins] = useState([
    { 
      id: 1, 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      price: 45230.50, 
      volatility: 75, 
      iconColor: 'bg-yellow-400', 
      iconLetter: 'B',
      iconImage: null,
      isRunning: false,
      subVolatility: {
        low: { rate: 62.31, range: { min: 1, max: 23 } },
        medium: { rate: 34.46, range: { min: 24, max: 56 } },
        high: { rate: 3.32, range: { min: 57, max: 68 } },
        spike: { rate: 0.01, range: { min: 69, max: 75 } }
      }
    },
    { 
      id: 2, 
      name: 'Ethereum', 
      symbol: 'ETH', 
      price: 3105.20, 
      volatility: 60, 
      iconColor: 'bg-purple-500', 
      iconLetter: 'E',
      iconImage: null,
      isRunning: true,
      baseSigma: 0.008,
      floorPrice: 0.0001,
      subVolatility: {
        low: { rate: 62.31, range: { min: 1, max: 23 } },
        medium: { rate: 34.46, range: { min: 24, max: 56 } },
        high: { rate: 3.32, range: { min: 57, max: 60 } },
        spike: { rate: 0.01, range: { min: 61, max: 60 } }
      }
    },
    { 
      id: 3, 
      name: 'Solana', 
      symbol: 'SOL', 
      price: 104.20, 
      volatility: 80, 
      iconColor: 'bg-primary', 
      iconLetter: 'S',
      iconImage: null,
      isRunning: false,
      baseSigma: 0.008,
      floorPrice: 0.0001,
      subVolatility: {
        low: { rate: 62.31, range: { min: 1, max: 23 } },
        medium: { rate: 34.46, range: { min: 24, max: 56 } },
        high: { rate: 3.32, range: { min: 57, max: 68 } },
        spike: { rate: 0.01, range: { min: 69, max: 80 } }
      }
    },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVolatilityModal, setShowVolatilityModal] = useState(false);
  const [showSubVolatilityModal, setShowSubVolatilityModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [coinToDelete, setCoinToDelete] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    initialPrice: '',
    volatility: 50,
    iconColor: 'bg-primary',
    iconLetter: '',
    iconImage: null,
  });
  
  // Fixed system parameters (constants)
  const BASE_SIGMA = 0.008;
  const FLOOR_PRICE = 0.0001;
  const [subVolatilityData, setSubVolatilityData] = useState({
    low: { rate: 62.31, range: { min: 1, max: 23 } },
    medium: { rate: 34.46, range: { min: 24, max: 56 } },
    high: { rate: 3.32, range: { min: 57, max: 68 } },
    spike: { rate: 0.01, range: { min: 69, max: 75 } },
  });

  const handleCreate = () => {
    const volatility = parseInt(formData.volatility);
    const ranges = calculateSubVolatilityRanges(volatility);
    const newCoin = {
      id: coins.length + 1,
      ...formData,
      price: parseFloat(formData.initialPrice),
      volatility: volatility,
      isRunning: false,
      baseSigma: BASE_SIGMA,
      floorPrice: FLOOR_PRICE,
      subVolatility: {
        low: { rate: 62.31, range: ranges.low },
        medium: { rate: 34.46, range: ranges.medium },
        high: { rate: 3.32, range: ranges.high },
        spike: { rate: 0.01, range: ranges.spike }
      }
    };
    setCoins([...coins, newCoin]);
    setShowCreateModal(false);
        setFormData({ name: '', symbol: '', initialPrice: '', volatility: 50, iconColor: 'bg-primary', iconLetter: '', iconImage: null });
    showSuccess('Coin created successfully!');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          iconImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      iconImage: null,
    });
  };

  const handleEdit = (coin) => {
    setSelectedCoin(coin);
    setFormData({
      name: coin.name,
      symbol: coin.symbol,
      initialPrice: coin.price.toString(),
      volatility: coin.volatility,
          iconColor: coin.iconColor,
          iconLetter: coin.iconLetter,
          iconImage: coin.iconImage || null,
        });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    const volatility = parseInt(formData.volatility);
    const ranges = calculateSubVolatilityRanges(volatility);
    setCoins(coins.map(coin => 
      coin.id === selectedCoin.id 
        ? { 
            ...coin, 
            ...formData, 
            price: parseFloat(formData.initialPrice), 
            volatility: volatility,
            baseSigma: BASE_SIGMA,
            floorPrice: FLOOR_PRICE,
            subVolatility: coin.subVolatility || {
              low: { rate: 62.31, range: ranges.low },
              medium: { rate: 34.46, range: ranges.medium },
              high: { rate: 3.32, range: ranges.high },
              spike: { rate: 0.01, range: ranges.spike }
            }
          }
        : coin
    ));
    setShowEditModal(false);
    setSelectedCoin(null);
  };

  const handleDelete = (coinId) => {
    const coin = coins.find(c => c.id === coinId);
    setCoinToDelete({ id: coinId, name: coin?.name || 'this coin' });
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (coinToDelete) {
      setCoins(coins.filter(coin => coin.id !== coinToDelete.id));
      showSuccess('Coin deleted successfully!');
      setShowConfirmModal(false);
      setCoinToDelete(null);
    }
  };

  const handleSetVolatility = (coin) => {
    setSelectedCoin(coin);
    setFormData({ ...formData, volatility: coin.volatility });
    setShowVolatilityModal(true);
  };

  const handleSetSubVolatility = (coin) => {
    setSelectedCoin(coin);
    if (coin.subVolatility) {
      setSubVolatilityData({
        low: { rate: coin.subVolatility.low.rate, range: coin.subVolatility.low.range },
        medium: { rate: coin.subVolatility.medium.rate, range: coin.subVolatility.medium.range },
        high: { rate: coin.subVolatility.high.rate, range: coin.subVolatility.high.range },
        spike: { rate: coin.subVolatility.spike.rate, range: coin.subVolatility.spike.range },
      });
    } else {
      // Default ranges if not set
      const ranges = calculateSubVolatilityRanges(coin.volatility);
      setSubVolatilityData({
        low: { rate: 62.31, range: ranges.low },
        medium: { rate: 34.46, range: ranges.medium },
        high: { rate: 3.32, range: ranges.high },
        spike: { rate: 0.01, range: ranges.spike },
      });
    }
    setShowSubVolatilityModal(true);
  };

  const handleToggleTrading = (coinId) => {
    setCoins(coins.map(coin => 
      coin.id === coinId 
        ? { ...coin, isRunning: !coin.isRunning }
        : coin
    ));
  };

  const calculateSubVolatilityRanges = (volatility) => {
    // Calculate default ranges based on volatility
    const lowMax = Math.floor(volatility * 0.3); // ~30% of volatility
    const mediumMax = Math.floor(volatility * 0.7); // ~70% of volatility
    const highMax = Math.floor(volatility * 0.85); // ~85% of volatility
    
    return {
      low: { min: 1, max: lowMax },
      medium: { min: lowMax + 1, max: mediumMax },
      high: { min: mediumMax + 1, max: highMax },
      spike: { min: highMax + 1, max: volatility }
    };
  };

  const handleRangeChange = (type, field, value) => {
    const numValue = parseInt(value) || 0;
    const maxVolatility = selectedCoin.volatility;
    
    // Define order of volatility types
    const typeOrder = ['low', 'medium', 'high', 'spike'];
    const currentIndex = typeOrder.indexOf(type);
    
    // Validate range
    if (field === 'min' && numValue < 1) return;
    if (field === 'max' && numValue > maxVolatility) return;
    if (field === 'min' && numValue >= subVolatilityData[type].range.max) return;
    if (field === 'max' && numValue <= subVolatilityData[type].range.min) return;
    
      // Validate against previous range (min must be > previous max)
      if (field === 'min' && currentIndex > 0) {
        const prevType = typeOrder[currentIndex - 1];
        const prevMax = subVolatilityData[prevType].range.max;
        if (numValue <= prevMax) {
          showError(`${type} min must be greater than ${prevType} max (${prevMax})`);
          return;
        }
      }
      
      // Validate against next range (max must be < next min)
      if (field === 'max' && currentIndex < typeOrder.length - 1) {
        const nextType = typeOrder[currentIndex + 1];
        const nextMin = subVolatilityData[nextType].range.min;
        if (numValue >= nextMin) {
          showError(`${type} max must be less than ${nextType} min (${nextMin})`);
          return;
        }
      }
      
      // Validate min cannot be lower than previous max
      if (field === 'min' && currentIndex > 0) {
        const prevType = typeOrder[currentIndex - 1];
        const prevMax = subVolatilityData[prevType].range.max;
        if (numValue <= prevMax) {
          showError(`Range cannot overlap. ${type} min must be greater than ${prevType} max (${prevMax})`);
          return;
        }
      }
      
      // Validate max cannot exceed next min
      if (field === 'max' && currentIndex < typeOrder.length - 1) {
        const nextType = typeOrder[currentIndex + 1];
        const nextMin = subVolatilityData[nextType].range.min;
        if (numValue >= nextMin) {
          showError(`Range cannot overlap. ${type} max must be less than ${nextType} min (${nextMin})`);
          return;
        }
      }
    
    setSubVolatilityData({
      ...subVolatilityData,
      [type]: {
        ...subVolatilityData[type],
        range: {
          ...subVolatilityData[type].range,
          [field]: numValue
        }
      }
    });
  };

  const handleUpdateSubVolatility = () => {
    const totalRate = Object.values(subVolatilityData).reduce((sum, item) => sum + parseFloat(item.rate || 0), 0);
    
    if (totalRate > 100.00) {
      showError(`Total rate cannot exceed 100.00. Current total: ${totalRate.toFixed(2)}%`);
      return;
    }

    // Validate ranges
    const maxVolatility = selectedCoin.volatility;
    const typeOrder = ['low', 'medium', 'high', 'spike'];
    
    for (let i = 0; i < typeOrder.length; i++) {
      const type = typeOrder[i];
      const data = subVolatilityData[type];
      
      // Basic validation
      if (data.range.min < 1 || data.range.max > maxVolatility) {
        showError(`${type} range must be between 1 and ${maxVolatility}`);
        return;
      }
      if (data.range.min >= data.range.max) {
        showError(`${type} range: min must be less than max`);
        return;
      }
      
      // Validate against previous range
      if (i > 0) {
        const prevType = typeOrder[i - 1];
        const prevMax = subVolatilityData[prevType].range.max;
        if (data.range.min <= prevMax) {
          showError(`${type} range cannot overlap with ${prevType}. Min must be greater than ${prevMax}`);
          return;
        }
      }
      
      // Validate against next range
      if (i < typeOrder.length - 1) {
        const nextType = typeOrder[i + 1];
        const nextMin = subVolatilityData[nextType].range.min;
        if (data.range.max >= nextMin) {
          showError(`${type} range cannot overlap with ${nextType}. Max must be less than ${nextMin}`);
          return;
        }
      }
    }
    
    setCoins(coins.map(coin => 
      coin.id === selectedCoin.id 
        ? { 
            ...coin, 
            subVolatility: {
              low: { rate: parseFloat(subVolatilityData.low.rate), range: subVolatilityData.low.range },
              medium: { rate: parseFloat(subVolatilityData.medium.rate), range: subVolatilityData.medium.range },
              high: { rate: parseFloat(subVolatilityData.high.rate), range: subVolatilityData.high.range },
              spike: { rate: parseFloat(subVolatilityData.spike.rate), range: subVolatilityData.spike.range }
            }
          }
        : coin
    ));
    setShowSubVolatilityModal(false);
    setSelectedCoin(null);
    showSuccess('Sub-volatility updated successfully!');
  };

  const handleSubVolatilityChange = (type, value) => {
    const numValue = parseFloat(value) || 0;
    if (numValue < 0 || numValue > 100) return;
    
    setSubVolatilityData({
      ...subVolatilityData,
      [type]: { 
        ...subVolatilityData[type],
        rate: numValue 
      }
    });
  };

  const getTotalRate = () => {
    return Object.values(subVolatilityData).reduce((sum, item) => sum + parseFloat(item.rate || 0), 0);
  };

  const handleUpdateVolatility = () => {
    const volatility = parseInt(formData.volatility);
    const ranges = calculateSubVolatilityRanges(volatility);
    setCoins(coins.map(coin => 
      coin.id === selectedCoin.id 
        ? { 
            ...coin, 
            volatility: volatility,
            // Update ranges if subVolatility exists, otherwise keep default
            subVolatility: coin.subVolatility ? {
              ...coin.subVolatility,
              low: { ...coin.subVolatility.low, range: ranges.low },
              medium: { ...coin.subVolatility.medium, range: ranges.medium },
              high: { ...coin.subVolatility.high, range: ranges.high },
              spike: { ...coin.subVolatility.spike, range: ranges.spike }
            } : {
              low: { rate: 62.31, range: ranges.low },
              medium: { rate: 34.46, range: ranges.medium },
              high: { rate: 3.32, range: ranges.high },
              spike: { rate: 0.01, range: ranges.spike }
            }
          }
        : coin
    ));
    setShowVolatilityModal(false);
    setSelectedCoin(null);
    showSuccess('Volatility updated successfully!');
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Manage Coins</h2>
          <p className="text-muted-text">Create, edit, delete coins and set volatility</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Coin
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
        <input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Coins Table */}
      <CoinTable
        coins={coins}
        searchTerm={searchTerm}
        onSetVolatility={handleSetVolatility}
        onSetSubVolatility={handleSetSubVolatility}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleTrading={handleToggleTrading}
      />

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCoinModal
          formData={formData}
          onFormChange={setFormData}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedCoin && (
        <EditCoinModal
          selectedCoin={selectedCoin}
          formData={formData}
          onFormChange={setFormData}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCoin(null);
          }}
          onUpdate={handleUpdate}
        />
      )}

      {/* Volatility Modal */}
      {showVolatilityModal && selectedCoin && (
        <VolatilityModal
          selectedCoin={selectedCoin}
          formData={formData}
          onFormChange={setFormData}
          onClose={() => {
            setShowVolatilityModal(false);
            setSelectedCoin(null);
          }}
          onUpdate={handleUpdateVolatility}
        />
      )}

      {/* Sub-Volatility Modal */}
      {showSubVolatilityModal && selectedCoin && (
        <SubVolatilityModal
          selectedCoin={selectedCoin}
          subVolatilityData={subVolatilityData}
          onSubVolatilityChange={handleSubVolatilityChange}
          onRangeChange={handleRangeChange}
          getTotalRate={getTotalRate}
          onClose={() => {
            setShowSubVolatilityModal(false);
            setSelectedCoin(null);
          }}
          onUpdate={handleUpdateSubVolatility}
        />
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Delete Coin"
        message={`Are you sure you want to delete ${coinToDelete?.name || 'this coin'}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirmModal(false);
          setCoinToDelete(null);
        }}
      />
    </div>
  );
};

export default ManageCoins;