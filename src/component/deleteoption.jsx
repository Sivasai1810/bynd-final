import { useState, useRef, useEffect } from 'react';

function DeleteOptionButton() {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      const response = await fetch('https://your-api.com/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'item-id-here' // Replace with actual item ID
        })
      });

      if (response.ok) {
        alert('Item deleted successfully!');
        setShowMenu(false);
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error occurred while deleting');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative" ref={menuRef}>
        <button 
          className="more-btn px-4 py-2 text-2xl font-bold bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setShowMenu(!showMenu)}
        >
          ⋮
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteOptionButton;